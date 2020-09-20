import NavigationButton from './NavigationButton.js';

const btnHome = document.getElementById('button-home');
const btnBack = document.getElementById('button-back');
const btnNext = document.getElementById('button-next');
const gallery = [`sobre-mi.html`, `retratos.html`, `paisajes.html`]


const selector = new NavigationButton({ gallery });

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

// CARGA DE IMAGENES

const initURL = 'https://elloplur.sirv.com/';
const URL = '../images/images.json';
let data;
let response;

function imgPage(data, pages, img) {
    let imgPosition = img || null;
    let result;
    switch(window.location.pathname) {
        case `/gallery/` + pages[0]:
            result = data.imgSobreMi
            break;
        case `/gallery/` + pages[1]:
            result = data.imgRetrato
            break;
        case `/gallery/` + pages[2]:
            result = data.imgPaisajes
            break;
    }
    if(imgPosition) {
        return result[imgPosition];
    }
    return result;

}

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
            'src': `${initURL}${imgPage(data, gallery, img)}`
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
        let maxImg = Object.keys(imgPage(data, gallery)) //sacando array de datos
        renderImage(maxImg) // renderizamos las imagenes
        
    } catch(error) {
        console.error(`Sucedio un error: ${error}`);
    }
}

getImage(URL);