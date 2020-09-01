function NavigationButton(config) {
    this.initialUrl = `/gallery/`;
    this.gallery = config.gallery;
    this.maxUrl = this.gallery.length;
    this.actualPath = window.location.pathname;
    this.pageNumber = this.checkPageNumber();
    this.homePath = `../index.html`;
}

NavigationButton.prototype.checkPageNumber = function() {
    switch(this.actualPath) {
        case this.galleryUrl(0):
            return 0
        case this.galleryUrl(1):
            return 1
        case this.galleryUrl(2):
            return 2
    }
}

NavigationButton.prototype.galleryUrl = function (Number) {
    return `${this.initialUrl}${this.gallery[Number]}`
}

NavigationButton.prototype.redireccionar = function(nextPage) {
    
    if(nextPage){
        if(this.actualPath == this.galleryUrl(2)) {
            this.pageNumber = 0;
        } else {
            this.pageNumber++;
        }
    } else {
        if(this.actualPath == this.galleryUrl(0)) {
            this.pageNumber = (this.maxUrl - 1);
        } else {
            this.pageNumber--;
        }
    }
    
    window.location = this.galleryUrl(this.pageNumber);
} 

NavigationButton.prototype.another = function() {
    this.redireccionar(true);
}

NavigationButton.prototype.back = function() {
    this.redireccionar(false);
}

NavigationButton.prototype.home = function() {
    window.location = this.homePath;
}

export default NavigationButton;