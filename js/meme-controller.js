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
    addTouchListeners();
}

function onGalleryClick() {
    document.querySelector('.image-gallery').classList.toggle('hidden-up');
    document.querySelector('.meme-edit').classList.toggle('hidden');
}

function onAboutClick() {
    document.querySelector('.modal').classList.toggle('hidden-left');
}

// TEXT EDIT/STYLE ............................................................
function onTextChange(txt) {
    let lineIdx = getCurrLineIdx();
    if (lineIdx === -1) {
        alert('please select a line 1st. Will be Fixed :)');
        return;
    }
    setMemeLineText(txt);
    renderCanvas();
}

function onFontSelect(fontName) {
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
    let lineIdx = getCurrLineIdx();
    if (lineIdx === -1) return;
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
    let lineIdx = getCurrLineIdx();
    if (lineIdx < 0) return;
    deleteLine(lineIdx);
    setCurrLineIdx(0);
    renderCanvas();
    _renderCurrLineInputs();
}

function onUndoDelete() {
    undoDelete();
    renderCanvas();
}

// CONTROLS ...................................................................
function _renderCurrLineInputs() {
    let lineIdx = getCurrLineIdx();
    document.querySelector('#currLine').value = (lineIdx > -1) ?
        lineIdx : '';
    document.querySelector('#lineText').value = (lineIdx > -1) ?
        gCurrMeme.lines[lineIdx].txt : '';

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