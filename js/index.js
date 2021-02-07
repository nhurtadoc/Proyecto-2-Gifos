apiKey='K1Cs7M3aHOiT5TPYph5YQMjvZEbaRLGL' ;
async function searching() {
    let valor = document.getElementById("search").value;
    if (valor !=''){
        document.getElementById('list-images').innerHTML ='';
        let result= await getSearchResults (valor);
        console.log (result);
        for (let i = 0; i < result.data.length; i++) {
            let img = '<img src="' + result.data[i].images.downsized.url + '">';
            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = img;

            document.getElementById('list-images').append (htmlObject);

            document.getElementById('search-trendings').placeholder = document.getElementById('search').value;
        }
    }
}
function getSearchResults(search) {   
    const found = fetch('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey)
    .then((response) => {
    return response.json()})
    .then(data => {return data})
    .catch((error) => {return error});
    return found 
} 

function create() {
    location.href='create.html'
}

function themes(){
    let list = document.getElementById("dropdown-content");
    if (list.style.display=='none') {
        list.style.display = 'block'
    }else{
        list.style.display = 'none'
    }
}

function dark() {
    document.body.style.backgroundColor = 'rgb(17, 0, 56)'
    localStorage.setItem('theme', 'rgb(17, 0, 56)');
    let buttons= document.getElementsByTagName ('button');
    for (let i=0 ; i < buttons.length; i++) {
        let button = buttons [i];
        button.classList.add('buttonPink')
    }
}

function white(){
    document.body.style.backgroundColor = '#FFF3F8'
    localStorage.setItem('theme', '#FFF3F8')
    let buttons= document.getElementsByTagName ('button');
    for (let i=0 ; i < buttons.length; i++) {
        let button = buttons [i];
        button.classList.remove('buttonPink')
    }
}

window.onload = function (){
    const theme = localStorage.getItem('theme');
    if (theme != 'rgb(17, 0, 56)') {
        white();
    }else {
        dark();
    }
    trendings();

}

document.querySelector('#search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searching();
    }
});


function getTrendings() { 
const found = fetch('https://api.giphy.com/v1/gifs/trending?' + 'api_key=' + apiKey)
    .then((response) => {
    return response.json()})
    .then(data => {return data})
    .catch((error) => {return error});
    return found 

}

async function trendings() {
    
    document.getElementById('trendings').innerHTML ='';
    let result= await getTrendings ();
    console.log (result);
    for (let i = 0; i < result.data.length; i++) {
        let img = '<img src="' + result.data[i].images.downsized.url + '">';
        var htmlObject = document.createElement('div');
        htmlObject.classList.add ('img-hashtag');
        htmlObject.innerHTML = img;
        let stringTitle = result.data[i].title.split(' ');
        let hashtag = '';

        for(let j = 0; j < stringTitle.length; j++ ){
            hashtag = hashtag + '#' + stringTitle [j] + ' ';
        }

        var htmlObject2 = document.createElement('div');
        htmlObject2.classList.add ('hashtag');
        htmlObject2.innerHTML ='<div class="hashtag">' + hashtag + '</div>';

        htmlObject.innerHTML =  htmlObject.innerHTML + htmlObject2.innerHTML;

        document.getElementById('trendings').append (htmlObject);       
        
    }
    
}
