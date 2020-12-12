'use strict'

function galleryControllerInit() {
    console.log('Gallery controller loaded');
    renderImagesGallery();
    renderKeywords();
    renderSavedMemes(getSavedMemes());
}

function renderImagesGallery() {
    var imgs = getImagesToDisplay();
    var strHtmls = imgs.map(img => {
        return `
        <img class="rounder-corner shadow" src="img/${img.id}.jpg"
        alt="image-${img.id}" data-img-id="${img.id}" 
        onclick="onImageClick(this)">`;
    });
    document.querySelector('.image-gallery').innerHTML = strHtmls.join('');
}

function onImageClick(img) {
    setMemeImage(+img.dataset.imgId);
    renderCanvas();
    onGalleryClick();
}

function onFilterClick(dataset) {
    setFilter(dataset.tag);
    renderImagesGallery();
}

function onSavedMemeClick(index) {
    setCurrMeme(index);
    onMyMemesClick();
    renderCanvas();
}

function renderKeywords() { // change this.dataset
    var words = getKeywords();
    var strHtmls = words.map(word => {
        return `<a class="keyword" data-tag="${word}"
                onclick="onFilterClick(this.dataset)" ref="#">
                    <li>${word}</li>`
    });
    document.querySelector('.keywords').innerHTML = strHtmls.join('');
}