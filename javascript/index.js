import NavigationButton from './NavigationButton.js';

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