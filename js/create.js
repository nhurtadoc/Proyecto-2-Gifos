let apiKey='K1Cs7M3aHOiT5TPYph5YQMjvZEbaRLGL' ;
let record;
let gif_blob;

window.onload = function(){
    document.getElementById('close').style.display = 'none';
    document.getElementById('video').style.display = 'none';
    document.getElementById('record').style.display = 'none';
    document.getElementById('stop').style.display = 'none';
    document.getElementById('repeat').style.display = 'none';
    document.getElementById('upload').style.display = 'none';
    document.getElementById('initial-timer').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('video-uploader').style.display = 'none';
    document.getElementById('end').style.display = 'none';
}

function getStreamAndRecord () {
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
    height: { max: 480 }
    }
    })
    .then(function(stream) {
    video.srcObject = stream;
    document.getElementById('close').style.display = 'block';
    document.getElementById("property").innerHTML = "Un Chequeo Antes de Empezar";
    document.getElementById('alert').style.display = 'none';
    document.getElementById('video').style.display = 'block';
    document.getElementById('cancel').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('record').style.display = 'block';
    document.getElementById('stop').style.display = 'none';
    document.getElementById('repeat').style.display = 'none';
    document.getElementById('upload').style.display = 'none';
    document.getElementById('initial-timer').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('video-uploader').style.display = 'none';
    document.getElementById('end').style.display = 'none';
    video.play()
    record = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    });
}).catch(function(e){
    alert ('No es posible generar video, intenta mas tarde');
    
})}


    
function backToHome() {
    location.href='index.html';
}

function startRecording() {
    record.startRecording();
    document.getElementById("property").innerHTML = "Capturando Tu Guifo";
    document.getElementById('cancel').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('record').style.display = 'none';
    document.getElementById('stop').style.display = 'block';
    document.getElementById('repeat').style.display = 'none';
    document.getElementById('upload').style.display = 'none';
    document.getElementById('initial-timer').style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('video-uploader').style.display = 'none';
    document.getElementById('end').style.display = 'none';
}

function stopRecording() {
    record.stopRecording(function() {
        gif_blob = record.getBlob();
        console.log (gif_blob);
        document.getElementById("property").innerHTML = "Vista Previa";
        document.getElementById('close').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('start').style.display = 'none';
        document.getElementById('record').style.display = 'none';
        document.getElementById('stop').style.display = 'none';
        document.getElementById('repeat').style.display = 'block';
        document.getElementById('upload').style.display = 'block';
        document.getElementById('initial-timer').style.display = 'none';
        document.getElementById('timer').style.display = 'block';
        document.getElementById('loader').style.display = 'none';
        document.getElementById('video-uploader').style.display = 'none';
        document.getElementById('end').style.display = 'none';
        const video = document.querySelector("#video");
        video.pause();
        video.currentTime = 0;
        var canvas = document.getElementById("canvas");
  
        canvas.getContext('2d').drawImage(video, 0, 0);
    });
    
}

function uploadGuiffo() {
    document.getElementById("property").innerHTML = "Subiendo Guifo";
    document.getElementById('close').style.display = 'block';
    document.getElementById('cancel').style.display = 'block';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('video').style.display = 'none';
    document.getElementById('initial-timer').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('repeat').style.display = 'none';
    document.getElementById('upload').style.display = 'none';
    document.getElementById('end').style.display = 'none';
    let form = new FormData();
    form.append('file', gif_blob, 'myGif.gif');    
    form.append('api_key', apiKey);
    let data = {
        method: 'POST',
        body: form,
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
    };
    const url = 'http://upload.giphy.com/v1/gifs';
    fetch(url, data)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
           // localStorage.setItem('myGif', result.data.id);
            if (localStorage.getItem('my_Gifos')){
              let data = JSON.parse(localStorage.getItem('my_Gifos'));
              data.push(result.data.id);
              localStorage.setItem('my_Gifos', JSON.stringify(data));  
            }else{
                let data = [];
              data.push(result.data.id);
              localStorage.setItem('my_Gifos', JSON.stringify(data));  
            }
            setTimeout(function() {
                document.getElementById("property").innerHTML = "Guifo Subido Con Exito";
                document.getElementById('loader').style.display = 'none'; 
                document.getElementById('video-uploader').style.display = 'block';
                document.getElementById('cancel').style.display = 'none';
                document.getElementById('end').style.display = 'block';
                }, 1000);
        });

}






    
