'use strict'

function galleryControllerInit() {
    console.log('Gallery controller loaded');
    renderGallery();
}

// GALLERY ....................................................................
function renderGallery() {
    var imgs = getImagesToDisplay();
    var strHtmls = imgs.map(img => {
        return `
        <img src="img/${img.id}.jpg" alt="image-${img.id}"
        data-img-id="${img.id}" onclick="onImageClick(this)">`;
    });
    console.log(strHtmls)
    document.querySelector('.image-gallery').innerHTML = strHtmls.join('');
}

function onImageClick(img) {
    setMemeImage(+img.dataset.imgId);
    renderCanvas(gCurrMeme);
    onGalleryClick();
}
