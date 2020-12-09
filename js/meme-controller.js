'use strict'

var gCanvas;
var gCtx;
var gLineIdx = 0;

function onControllerInit() {
    console.log('Meme Controller Loaded.');
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    _clearInputs();
    renderCanvas(gCurrMeme);
}

function renderCanvas(meme) {
    var img = new Image();
    img.src = `img/${meme.imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderCanvasLine(meme.lines[0]);
    }
}

function renderCanvasLine(line) {
    gCtx.lineWidth = 4;
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = 'black';
    gCtx.font = 'normal 900 60px impact';
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function onTextChange(txt) {
    setMemeLine(gCurrMeme, gLineIdx, txt);
    renderCanvas(gCurrMeme);
}

function _clearInputs() {
    // TODO: qsALL => forEach
    var elInput = document.querySelector('#lineText');
    elInput.value = '';
}