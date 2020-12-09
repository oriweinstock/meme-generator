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

function renderCanvas() {
    var img = new Image();
    img.src = `img/${gCurrMeme.imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        // renderCanvasLine(gCurrMeme.lines[0]);
        renderCanvasLines();
    }
}

var renderCanvasLines = () => {
    gCurrMeme.lines.forEach(line => renderCanvasLine(line));
}
function renderCanvasLine(line) {
    gCtx.lineWidth = line.strokeWidth;
    gCtx.fillStyle = line.fillColor;
    gCtx.strokeStyle = line.strokeColor;
    // gCtx.font = 'normal 900 60px impact';
    gCtx.font = `normal 900 ${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function onImageClick(img) {
    // console.log('img selected:', img.dataset.imgId)
    setMemeImage(+img.dataset.imgId);
    renderCanvas(gCurrMeme);
}

function onTextChange(txt) {
    setMemeLine(gLineIdx, txt);
    renderCanvas();
}

function onFontSelect(fontName) {
    console.log(fontName);
    setLineFont(gLineIdx, fontName);
    renderCanvas();
}

function onFontSize(diff) {
    changeFontSize(gLineIdx, +diff)
    renderCanvas();
}

function onMoveLine(diffX, diffY) {
    moveLine(gLineIdx, diffX, diffY);
    renderCanvas();
}
function _clearInputs() {
    // TODO: qsALL => forEach
    var elInput = document.querySelector('#lineText');
    elInput.value = '';
}

function onCanvasClick(ev) {
    var { offsetX, offsetY } = ev;

    var clickedLine = gCurrMeme.lines.findIndex((line) => {
        return offsetX >= line.pos.x && offsetX <= line.pos.x + line.pos.xEnd
            && offsetY <= line.pos.y && offsetY >= line.pos.y - line.size
    });
    if (clickedLine > -1) gLineIdx = clickedLine;
    _renderCurrLineLabel();
}

function _renderCurrLineLabel() {
    document.querySelector('#currLine').value = gLineIdx;
}

function highLightLine(line = gLineIdx) {
    gCtx.beginPath();
    gCtx.rect(50, 50, 150, 150);
    gCtx.stroke();
}