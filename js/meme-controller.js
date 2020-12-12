'use strict'

// GLOBALS ....................................................................
var gCanvas;
var gCtx;
var gIsLineHighLighted;

var gMiniCanvases = [];
var gMiniCtxs = [];
const EMOJI_SIZE = 60;

// INIT / GENERAL .............................................................
function controllerInit() {
    console.log('Meme controller loaded');
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gIsLineHighLighted = false;
    renderCanvas();
    renderEmojiLines();
    renderColorPicker();
    addTouchListeners();
}

// TOP-NAV ....................................................................
function onGalleryClick() {
    document.querySelector('.image-gallery').classList.toggle('hidden-up');
    document.querySelector('.keywords').classList.toggle('hidden-tp');
    document.querySelector('.memes-gallery').classList.add('hidden-up');

}

function onAboutClick() {
    document.querySelector('.modal').classList.toggle('hidden-left');
}

function onMyMemesClick(isToRender = true) {
    document.querySelector('.memes-gallery').classList.toggle('hidden-up');
    document.querySelector('.image-gallery').classList.add('hidden-up');
}

// UPDATE .....................................................................
function onTextChange(txt) {
    setMemeLineText(txt);
    renderCanvas();
}

function onFontSelect(fontName) {
    setLineFont(fontName);
    renderCanvas();
}

function onFontSize(diff, ev) {
    setFontSize(+diff)
    renderCanvas();
}

function onColorChange(value) {
    setLineColor(value);
    renderCanvas();
}

function onColorPickerClick() {
    document.querySelector('.color-picker').classList.toggle('folded-up');
}

function onColorClick(data) {
    setLineColor(data.color);
    renderCanvas();
}

function onMoveLine(diffX, diffY) {
    moveLine(diffX, diffY);
    renderCanvas();
}

function renderColorPicker() {
    var colors = getColorsToDisplay();
    var strHtmls = colors.map(color => {
        return `<div class="color round-corner" data-color="${color}"
        onclick="onColorClick(this.dataset)" 
        style="background-color: ${color}"></div>`
    });
    document.querySelector('.color-picker').innerHTML = strHtmls.join('');
}

// CREATE .....................................................................
function onAddLine() {
    var newLine = {
        txt: 'enter text...',
        font: DEFAULT_FONT,
        pos: { x: 100, y: 250 },
        size: DEFAULT_SIZE,
        strokeWidth: 3,
        strokeColor: '#000000',
        fillColor: '#FFFFFF'
    };

    addLine(newLine);
    renderCanvas();
}

// EMOJIS .....................................................................
// Tried 2d map. 1st try was a fail :-)
function renderEmojiLines() {
    renderEmojiLine(0);
    renderEmojiLine(1);
    renderEmojiLine(2);
}

function renderEmojiLine(lineIdx = 0) {
    var emojis = getEmojisToDisplay(lineIdx);
    var strHtmls = emojis.map(emoji => {
        return `
        <div onclick="onEmojiClick(this.innerText)" class="emoji">${emoji}</div>`;
    });
    document.querySelector(`.emoji${lineIdx}`).innerHTML = strHtmls.join('');
}

function onEmojiClick(emoji) {
    var newLine = {
        txt: emoji,
        pos: _getRandomPosOnCanvas(),
        size: EMOJI_SIZE
    }
    addLine(newLine);
    renderCanvas();
}

function _getRandomPosOnCanvas() {
    var canvasSize = getCanvasSize();
    let x = Math.floor(Math.random() * (canvasSize - EMOJI_SIZE));
    let y = Math.floor(Math.random() * (canvasSize - EMOJI_SIZE));
    return { x, y };
}

// DELETE .....................................................................
function onDeleteLine() {
    deleteLine();
    renderCanvas();
}

function onUndoDelete() {
    undoDelete();
    renderCanvas();
}

// BOTTOM BUTTONS .............................................................
function onDownload(elLink) {
    const data = gCanvas.toDataURL('image/jpeg');
    elLink.href = data;
    elLink.download = 'meme.jpg';
}

function onSave() {
    console.log(JSON.stringify(gCurrMeme));
}