'use strict'

var gImgs;
var gEmojis;

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
        },
        {
            id: 13,
            keywords: ['funny']
        },
        {
            id: 14,
            keywords: ['funny']
        },
        {
            id: 15,
            keywords: ['funny']
        },
        {
            id: 16,
            keywords: ['funny']
        },
        {
            id: 17,
            keywords: ['funny']
        },
        {
            id: 18,
            keywords: ['funny']
        }
    ];
}

function getImagesToDisplay() {
    return gImgs;
}

// STICKERS ...................................................................

gEmojis = [['😬', '😎', '😅', '😂', '😜', '😵'], ['👍', '👎', '🤟', '💪', '👏', '🖕'], ['🌈', '🔥', '💥', '💡', '🎉', '❤️']];

function getEmojisToDisplay(lineIdx) {
    return gEmojis[lineIdx];
}

function getEmojisLineslength() {
    return gEmojis.length;
}