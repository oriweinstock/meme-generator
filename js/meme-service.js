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
            pos: {x: 100, y:200},
            size: 20,
            align: 'center',
            color: '#FFFFFF'
        }
    ]
};

function setMemeLine(meme, lineIdx = 0, txt) { 
    meme.lines[lineIdx].txt = txt;
}

