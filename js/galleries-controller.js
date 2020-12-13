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
    document.body.classList.remove('open-gallery');
    document.querySelector('.image-gallery').classList.add('hidden-up');
    document.querySelector('.keywords').classList.toggle('hidden-top');

    // onGalleryClick();
}

function onFilterClick(filterBy) {
    setFilter(filterBy);
    incFilterCount(filterBy);
    renderKeywords();
    renderImagesGallery();
}

function onSavedMemeClick(index) {
    document.body.classList.remove('open-memes');
    document.querySelector('.memes-gallery').classList.add('hidden-up');

    setCurrMeme(index);
    renderCanvas();
}

function renderKeywords() { // change this.dataset
    var keywords = getKeywordsFromDatabase();
    var strHtmls = keywords.map(keyword => {
        var txtClass = (keyword.word === 'ALL') ? 'keyword-all shadow' : 'text-shadow';
        return `<a class="keyword ${txtClass} flex align-center pointer fast-transition" 
                style="font-size: ${Object.values(keyword)}px"
                onclick="onFilterClick('${Object.keys(keyword)}')" ref="#">
                    <li>${Object.keys(keyword)}</li></a>`
    });
    strHtmls.push(`<a class="keyword-all shadow flex align-center pointer fast-transition"
                    onclick="onFilterClick('ALL')" ref="#">
                        <li>ALL</li></a>`);
    document.querySelector('.keywords').innerHTML = strHtmls.join('');
}