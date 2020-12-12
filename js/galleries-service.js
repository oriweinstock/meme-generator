'use strict'

var gImgs;
var gFilterBy = '';

function galleryInit() {
    console.log('Gallery service loaded');
    createImages();
    galleryControllerInit();
}

function createImages() {
    gImgs = getImagesFromDatabase();
}

function getImagesToDisplay() {
    if (!gFilterBy) return gImgs;
    var imgs = gImgs.filter(img => {
        return (img.keywords.includes(gFilterBy));
    });
    return imgs;
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}