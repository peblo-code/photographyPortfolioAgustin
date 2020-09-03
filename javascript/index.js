import NavigationButton from './NavigationButton.js';

const btnHome = document.getElementById('button-home');
const btnBack = document.getElementById('button-back');
const btnNext = document.getElementById('button-next');


const selector = new NavigationButton({
    gallery: [`sobre-mi.html`, `retratos.html`, `paisajes.html`],
});

// selector.another();

btnBack.onclick = function() {
    selector.back();
}
btnNext.onclick = function() { 
    selector.another();
}
btnHome.onclick = function() {
    selector.home();
}

// carga y renderizado de imagenes

const initURL = '../images'
const URL = '../images/images.json'
let data;
let response;

function setElementAttribute(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function renderImage(maxImg) {
    maxImg.forEach(img => {
        let $section = document.getElementById('post-list')
        let $figure = document.createElement('figure');
        let $image = document.createElement('img');
        $section.appendChild($figure);
        $figure.appendChild($image);
        
        const attrImage = {
            'src': `${initURL}${data.imgSobreMi[img]}`
        }

         const attrFigure = {
            'class': 'post-image'
        }
        setElementAttribute($figure, attrFigure)
        setElementAttribute($image, attrImage)
        //document.body.appendChild($figure);
    });
}

async function getImage(URL) {
    try {
        response = await fetch(URL); //respuesta
        data = await response.json(); //datos
        let maxImg = Object.keys(data.imgSobreMi) //sacando array de datos
        renderImage(maxImg) // renderizamos las imagenes
        
    } catch(error) {
        console.error(`Sucedio un error: ${error}`);
    }
}

getImage(URL);