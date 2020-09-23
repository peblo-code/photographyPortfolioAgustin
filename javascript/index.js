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

const initURL = 'https://agustinlezcanophotos.sirv.com/';
const URL = '../images/images.json';
let data;
let response;

function imgPage(data, pages, img) { //funcion que detecta que imagen colocar dependiendo de la imagen
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
    let counter = 0;
    maxImg.forEach(img => {
        counter += 1;
        let $section = document.getElementById('post-list')
        let $a = document.createElement('a');
        let $figure = document.createElement('figure');
        let $image = document.createElement('img');
        
        $section.appendChild($figure);
        $figure.appendChild($a);
        $a.appendChild($image);

        const attrA = {
            'href': `#${img}`
        }
        
        const attrImage = {
            'src': `${initURL}${imgPage(data, gallery, img)}`,
            'href': `#${img}`
        }

        if(screen.width <= 425 && counter % 2 == 0) { // responsive mobile
            $figure.style.marginTop = '5em';
        }

        const attrFigure = {
            'class': 'post-image'
        }
        setElementAttribute($a, attrA);
        setElementAttribute($figure, attrFigure);
        setElementAttribute($image, attrImage);
        //document.body.appendChild($figure);
    });
}

function makeModal(maxImg) {
    maxImg.forEach(img => {
        const $divModal = document.createElement('div');
        const $divImagen = document.createElement('div');
        const $imgImagen = document.createElement('img'); 
        const $aCerrar = document.createElement('a');
        $aCerrar.innerHTML = 'X';

        document.body.appendChild($divModal);
        $divModal.appendChild($divImagen);
        $divModal.appendChild($aCerrar);
        $divImagen.appendChild($imgImagen);

        const attrDivModal = {
            'class': 'modal',
            'id': img
        }

        const attrDivImagen = {
            'class': 'imagen'
        }

        const attrImgImagen = {
            'src': `${initURL}${imgPage(data, gallery, img)}`
        }

        const attrACerrar = {
            'class': 'cerrar',
            'href': '#'
        }

        setElementAttribute($divModal, attrDivModal);
        setElementAttribute($divImagen, attrDivImagen);
        setElementAttribute($imgImagen, attrImgImagen);
        setElementAttribute($aCerrar, attrACerrar);
    })
}

async function getImage(URL) {
    try {
        response = await fetch(URL); //respuesta
        data = await response.json(); //datos
        let maxImg = Object.keys(imgPage(data, gallery)) //sacando array de datos
        renderImage(maxImg.reverse()) // renderizamos las imagenes
        makeModal(maxImg);
        
    } catch(error) {
        console.error(`Sucedio un error: ${error}`);
    }
}

getImage(URL);
