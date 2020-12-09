'use strict'

function onServiceInit() {
    console.log('Meme Service Loaded.');
    onControllerInit();
}

var gCurrMeme = {
    imgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Hello Meme',
            font: 'impact',
            pos: {x: 100, y:200, xEnd: 300},
            size: 40,
            align: 'center',
            strokeWidth: 3,
            strokeColor: '#000000',
            fillColor: '#FFFFFF'
        },
        {
            txt: 'Second LINE!!',
            font: 'impact',
            pos: {x: 200, y:400, xEnd: 400},
            size: 50,
            align: 'center',
            strokeWidth: 3,
            strokeColor: '#000000',
            fillColor: '#FFAAFF'
        }
    ]
};

function setMemeLine(lineIdx = 0, txt) { 
    gCurrMeme.lines[lineIdx].txt = txt;
}

function getLineEnd(value) {
    console.log(value)
    return 100;
}
function setMemeImage(imgId) {
    gCurrMeme.imgId = imgId;
}

function setLineFont(lineIdx, fontName) {
    gCurrMeme.lines[lineIdx].font = fontName;
}

function moveLine(lineIdx, diffX, diffY) {
    gCurrMeme.lines[lineIdx].pos.x += diffX;
    gCurrMeme.lines[lineIdx].pos.y += diffY;
}

function changeFontSize(lineIdx = 0, diff) {
    console.log(diff)
    gCurrMeme.lines[lineIdx].size += diff;
}