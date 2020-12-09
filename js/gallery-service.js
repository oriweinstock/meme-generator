'use strict'

var gImgs;

function galleryInit() {
    console.log('Gallery service loaded');
    createImages();
    galleryControllerInit();
}

function createImages() {
    gImgs = [
        {
            id: 1,
            keywords: ['funny']
        },
        {
            id: 2,
            keywords: ['funny']
        },
        {
            id: 3,
            keywords: ['funny']
        },
        {
            id: 4,
            keywords: ['funny']
        },
        {
            id: 5,
            keywords: ['funny']
        },
        {
            id: 6,
            keywords: ['funny']
        },
        {
            id: 7,
            keywords: ['funny']
        },
        {
            id: 8,
            keywords: ['funny']
        },
        {
            id: 9,
            keywords: ['funny']
        },
        {
            id: 10,
            keywords: ['funny']
        },
        {
            id: 11,
            keywords: ['funny']
        },
        {
            id: 12,
            keywords: ['funny']
        }
    ];
}

function getImagesToDisplay() {
    return gImgs;
}