'use strict'

function galleriesControllerInit() {
    console.log('Gallery controller loaded');
    renderImagesGallery();
    renderKeywords();
    renderSavedMemes(getSavedMemes());
}

function renderImagesGallery() {
    var imgs = getImagesToDisplay();
    var strHtmls = imgs.map(img => {
        return `
        <img class="rounder-corner pointer shadow" src="img/${img.id}.jpg"
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

function onFilterClick(filterBy) {
    setFilter(filterBy);
    renderImagesGallery();
}

function onSavedMemeClick(index) {
    setCurrMeme(index);
    onMyMemesClick();
    renderCanvas();
}

function renderKeywords() { // change this.dataset
    var keywords = getKeywords();
    var strHtmls = keywords.map(keyword => {
        var txtClass = (keyword.word === 'ALL') ? 'keyword-all shadow' : 'text-shadow';
        return `<a class="keyword ${txtClass} flex align-center pointer fast-transition" 
                style="font-size: ${getKeywordCount(keyword)}px"
                onclick="onFilterClick('${keyword.word}')" ref="#">
                    <li>${keyword.word}</li></a>`
    });
    document.querySelector('.keywords').innerHTML = strHtmls.join('');
}