'use strict'

// GLOBALS ....................................................................
var gCanvas;
var gCtx;
var gIsLineHighLighted;

// INIT / GENERAL .............................................................
function controllerInit() {
    console.log('Meme Controller Loaded.');
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gIsLineHighLighted = false;
    renderCanvas();
    renderColorPicker();
    addTouchListeners();
}

// TOP-NAV ....................................................................
function onGalleryClick() {
    document.querySelector('.image-gallery').classList.toggle('hidden-up');
    document.querySelector('.meme-edit').classList.toggle('hidden');
}

function onAboutClick() {
    document.querySelector('.modal').classList.toggle('hidden-left');
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

// DELETE .....................................................................
function onDeleteLine() {
    deleteLine();
    renderCanvas();
}

function onUndoDelete() {
    undoDelete();
    renderCanvas();
}

// ACTIONS ....................................................................
function onDownload(elLink) {
    const data = gCanvas.toDataURL('image/jpeg');
    elLink.href = data;
    elLink.download = 'meme.jpg';
}