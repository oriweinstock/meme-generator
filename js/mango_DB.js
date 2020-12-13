'use strict'

console.log('Fake database loaded')
const dbMemes = [
    {
        imgId: 5,
        lines: [
            {
                txt: '2nd sprint. 1st Day',
                font: 'impact',
                pos: { x: 100, y: 50, width: 310, height: 420 },
                size: 40,
                strokeWidth: 3,
                strokeColor: '#000000',
                fillColor: '#FFFFFF'
            },
            {
                txt: 'SUCCESS',
                font: 'impact',
                pos: { x: 250, y: 450, width: 190, height: 490 },
                size: 50,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: 'yellow'
            }
        ]
    },
    {
        imgId: 6,
        lines: [
            {
                txt: '2nd Sprint | DAY #2',
                font: 'impact',
                pos: { x: 30, y: 70, width: 310, height: 420 },
                size: 50,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: '#FFFFFF'
            },
            {
                txt: 'MOBILE...',
                font: 'impact',
                pos: { x: 94, y: 410, width: 190, height: 490 },
                size: 70,
                strokeWidth: 2,
                strokeColor: '#000000',
                fillColor: 'yellow'
            }
        ]
    },
    {
        "imgId": 18, "lines": [{ "txt": "2ND SPRINT | DAY #3", "font": "impact", "pos": { "x": 109.79797979797979, "y": 63.63636363636364, "width": 373.1499938964844, "height": 46 }, "size": 46, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "#FFFFFF" }, { "txt": "FEATURES...", "font": "impact", "pos": { "x": 21.7777777777778, "y": 402.020202020202, "width": 357.01666259765625, "height": 82 }, "size": 82, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "yellow" }, { "txt": "EVERYWHERE...", "font": "impact", "pos": { "x": 133.19191919191923, "y": 483.8383838383839, "width": 350.8833312988281, "height": 62 }, "size": 62, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "#cbffc6" }, { "txt": "💥", "pos": { "x": 350.5757575757576, "y": 332.32323232323233, "width": 60, "height": 60 }, "size": 60 }, { "txt": "🎉", "pos": { "x": 415.3838383838384, "y": 376.7676767676768, "width": 60, "height": 60 }, "size": 60 }, { "txt": "💥", "pos": { "x": 311.3737373737374, "y": 346.4646464646465, "width": 36, "height": 36 }, "size": 36 }, { "txt": "💥", "pos": { "x": 428, "y": 321, "width": 44, "height": 44 }, "size": 44 }]
    },
    {
        "imgId": 15, "lines": [{ "txt": "2ND SPRINT | FINAL", "font": "impact", "pos": { "x": 16.53955283168756, "y": 74.15730337078652, "width": 367.9931640625, "height": 50 }, "size": 50, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "#FFFFFF" }, { "txt": "WATCH,", "font": "impact", "pos": { "x": 28.519350811485623, "y": 405.6179775280899, "width": 250.9248046875, "height": 82 }, "size": 82, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "yellow" }, { "txt": "and LEARN", "font": "impact", "pos": { "x": 163.52899784360466, "y": 475.28089887640454, "width": 254.599609375, "height": 62 }, "size": 62, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "#ff0000" }, { "txt": "💥", "pos": { "x": 416.8678924072183, "y": 79.77528089887642, "width": 60, "height": 60 }, "size": 60 }, { "txt": "💥", "pos": { "x": 400.13778231755765, "y": 92.13483146067416, "width": 36, "height": 36 }, "size": 36 }, { "txt": "💥", "pos": { "x": 421.2584269662921, "y": 102.24719101123597, "width": 44, "height": 44 }, "size": 44 }, { "txt": "🔥", "pos": { "x": 390.4494382022472, "y": 73.03370786516854, "width": 60, "height": 60 }, "size": 60 }, { "txt": "🔥", "pos": { "x": 425.2584269662921, "y": 79.86516853932585, "width": 36, "height": 36 }, "size": 36 }, { "txt": "💡", "pos": { "x": 425.7078651685394, "y": 467.4157303370787, "width": 48, "height": 48 }, "size": 48 }]
    },
    {
        "imgId": 13,
        "lines": [
            { "txt": "WELCOME TO", "font": "impact", "pos": { "x": 36.443298969072146, "y": 396.9072164948454, "width": 291.529296875, "height": 58 }, "size": 58, "strokeWidth": 2, "strokeColor": "#000000", "fillColor": "#ffffff" }, { "txt": "iMEME 2000", "font": "impact", "pos": { "x": 39.38144329896906, "y": 484.5360824742268, "width": 366.71484375, "height": 76 }, "size": 76, "strokeWidth": 3, "strokeColor": "#000000", "fillColor": "#ff0000" }, { "txt": "iMEME 2000", "font": "impact", "pos": { "x": 36.72164948453607, "y": 479.3814432989691, "width": 366.71484375, "height": 76 }, "size": 76, "strokeWidth": 3, "strokeColor": "#000000", "fillColor": "#ffe600" }, { "txt": "💥", "pos": { "x": 402.5154639175258, "y": 417.5257731958763, "width": 60, "height": 60 }, "size": 60 }, { "txt": "💥", "pos": { "x": 383.25773195876286, "y": 439.4329896907217, "width": 48, "height": 48 }, "size": 48 }, { "txt": "💥", "pos": { "x": 355.68041237113397, "y": 451.03092783505156, "width": 32, "height": 32 }, "size": 32 }, { "txt": "💥", "pos": { "x": 448.5463917525773, "y": 409.79381443298973, "width": 84, "height": 84 }, "size": 84 }]
    }
];

const dbImgs = [
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

const dbKeywords = [
    { 'funny' : 22 },
    { 'cute' : 18 },
    { 'politics' : 19 },
    { 'dogs' : 12 },
    { 'baby' : 26 },
];

const dbEmojis = [
    ['😬', '😎', '😅', '😂', '😜', '😵'],
    ['👍', '👎', '🤟', '💪', '👏', '🖕'],
    ['🌈', '🔥', '💥', '💡', '🎉', '❤️']
];

function getMemesFromDatabase() {
    return dbMemes;
}

function getImagesFromDatabase() {
    return dbImgs;
}

function getKeywordsFromDatabase() {
    return dbKeywords;
}

function getEmojisFromDatabase() {
    return dbEmojis;
}