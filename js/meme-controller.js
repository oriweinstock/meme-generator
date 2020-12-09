'use strict'

// GLOBALS ....................................................................
var gCanvas;
var gCtx;
var gLineIdx = -1;
var gIsLineHighLighted;

// INIT / GENERAL .............................................................
function controllerInit() {
    console.log('Meme Controller Loaded.');
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gIsLineHighLighted = false;
    _addResizeListener();
    _resizeCanvas();
    _clearInputs();
    renderCanvas();
}

function onGalleryClick() {
    document.querySelector('.image-gallery').classList.toggle('hidden');
    document.querySelector('.meme-edit').classList.toggle('hidden');
}

function onAboutClick() {
    document.querySelector('.modal').classList.toggle('hidden');
}

// TEXT EDIT/STYLE ............................................................
function onTextChange(txt) {
    if (gLineIdx === -1) {
        alert('please select a line 1st. Will be Fixed :)');
        return;
    }
    setMemeLineText(txt);
    renderCanvas();
}

function onFontSelect(fontName) {
    console.log(fontName);
    setLineFont(fontName);
    renderCanvas();
}

function onFontSize(diff) {
    changeFontSize(+diff)
    renderCanvas();
}

function onColorChange(value) {
    console.log(value);
    setLineColor(value);
    renderCanvas();
}

// LINE FUNCS .................................................................
function onMoveLine(diffX, diffY) {
    if (gLineIdx === -1) return;

    moveLine(diffX, diffY);
    renderCanvas();
}

function onAddLine() {
    var newLine = {
        txt: 'enter text...',
        font: DEFAULT_FONT,
        pos: { x: 100, y: 250, xEnd: 250 },
        size: DEFAULT_SIZE,
        align: 'center',
        strokeWidth: 3,
        strokeColor: '#000000',
        fillColor: '#FFFFFF'
    };

    addLine(newLine);

    renderCanvas();
    _renderCurrLineInputs();
}

function onDeleteLine() {
    if (gLineIdx < 0) return;
    deleteLine(gLineIdx);
    gLineIdx = -1;
    renderCanvas();
    _renderCurrLineInputs();
}

function onUndoDelete() {
    undoDelete();
    renderCanvas();
}

// CONTROLS ...................................................................
function _renderCurrLineInputs() {

    document.querySelector('#currLine').value = (gLineIdx > -1) ?
        gLineIdx : '';
    document.querySelector('#lineText').value = (gLineIdx > -1) ?
        gCurrMeme.lines[gLineIdx].txt : '';

    // TODO - grey out undo if no undo
}

function _clearInputs() {
    // TODO: qsALL => forEach
    document.querySelector('#lineText').value = '';
    document.querySelector('#currLine').value = '';
}

function onDownload(elLink) {
    const data = gCanvas.toDataURL('image/jpeg');
    elLink.href = data;
    elLink.download = 'meme.jpg';
}