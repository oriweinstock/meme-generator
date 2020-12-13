'use strict'

var gImgs;
var gFilterBy = '';

function galleriesInit() {
    console.log('Gallery service loaded');
    _createImages();
    galleriesControllerInit();
}

function _createImages() {
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
    console.log('setting filter to', filterBy)
    gFilterBy = (filterBy === 'ALL') ? '' : filterBy;
}

function incFilterCount(filter) {
    console.log('TBD');
}