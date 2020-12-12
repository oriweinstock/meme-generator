'use strict'

var gImgs;
var gEmojis;
var gFilterBy = '';

function galleryInit() {
    console.log('Gallery service loaded');
    createImages();
    galleryControllerInit();
}

function createImages() {
    gImgs = [
        {
            id: 1,
            keywords: ['politics', 'funny', 'actors']
        },
        {
            id: 2,
            keywords: ['dogs', 'cute', 'love']
        },
        {
            id: 3,
            keywords: ['baby', 'dogs', 'sleepy', 'cute']
        },
        {
            id: 4,
            keywords: ['cats', 'sleepy', 'computers']
        },
        {
            id: 5,
            keywords: ['baby', 'politic']
        },
        {
            id: 6,
            keywords: ['funny', 'sleepy', 'high']
        },
        {
            id: 7,
            keywords: ['baby', 'funny', 'high']
        },
        {
            id: 8,
            keywords: ['funny', 'high', 'actors']
        },
        {
            id: 9,
            keywords: ['funny', 'baby', 'high']
        },
        {
            id: 10,
            keywords: ['funny', 'politics']
        },
        {
            id: 11,
            keywords: ['cute', 'love']
        },
        {
            id: 12,
            keywords: ['funny', 'actors', 'awe']
        },
        {
            id: 13,
            keywords: ['funny', 'actors']
        },
        {
            id: 14,
            keywords: ['actors', 'awe']
        },
        {
            id: 15,
            keywords: ['politics', 'actors']
        },
        {
            id: 16,
            keywords: ['funny', 'actors']
        },
        {
            id: 17,
            keywords: ['politics']
        },
        {
            id: 18,
            keywords: ['funny', 'awe']
        }
    ];
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
// STICKERS ...................................................................

gEmojis = [['😬', '😎', '😅', '😂', '😜', '😵'], ['👍', '👎', '🤟', '💪', '👏', '🖕'], ['🌈', '🔥', '💥', '💡', '🎉', '❤️']];

function getEmojisToDisplay(lineIdx) {
    return gEmojis[lineIdx];
}

function getEmojisLineslength() {
    return gEmojis.length;
}