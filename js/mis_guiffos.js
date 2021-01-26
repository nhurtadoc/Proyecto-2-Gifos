let apiKey='K1Cs7M3aHOiT5TPYph5YQMjvZEbaRLGL' ;


let arrayGuifos = [];

let div_guiffos = document.querySelector('#list-guiffos');

function viewGifs(){
    arrayGuifos = localStorage.getItem('my_Gifos');
    if (arrayGuifos === null) {
        arrayGuifos = [];
    }else{
        arrayGuifos = JSON.parse(arrayGuifos)
        arrayGuifos.forEach(async element => {
            const result = await getGifs(element)
            let img = '<img src="' + result.data.images.downsized.url + '">';
            div_guiffos.innerHTML = div_guiffos.innerHTML + img;
        });
    }
}
document.addEventListener('DOMcontentLoaded', viewGifs())

async function getGifs(idGifs){
    const getGifs = 'https://api.giphy.com/v1/gifs/'+ idGifs + '?api_key=' + apiKey;
    return new Promise((resolve)=>{
        fetch(getGifs)
        .then(response =>resolve(response.json()))
        .catch(error=>resolve(false));
    }) 
}


