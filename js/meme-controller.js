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

// CANVAS FUNCS ...............................................................
function onCanvasClick(ev) {
    var { offsetX, offsetY } = ev;

    var clickedLine = gCurrMeme.lines.findIndex((line) => {
        return offsetX >= line.pos.x && offsetX <= line.pos.x + line.pos.xEnd
            && offsetY <= line.pos.y && offsetY >= line.pos.y - line.size
    });
    gLineIdx = clickedLine;
    setSelectedLine(gLineIdx);
    _renderCurrLineInputs();
    highLightLine();
}

function renderCanvas() {
    var img = new Image();
    img.src = `img/${gCurrMeme.imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderCanvasLines();
    }
}

var renderCanvasLines = () => gCurrMeme.lines.forEach(line => renderCanvasLine(line));

function renderCanvasLine(line) {
    gCtx.lineWidth = line.strokeWidth;
    gCtx.fillStyle = line.fillColor;
    gCtx.strokeStyle = line.strokeColor;
    // gCtx.font = 'normal 900 60px impact';
    gCtx.font = `normal 900 ${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function resizeCanvas() {
    let elContainer = document.querySelector('.meme-image');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
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

// LINE FUNCS .................................................................
function onMoveLine(diffX, diffY) {
    if (gLineIdx === -1) return;

    moveLine(diffX, diffY);
    renderCanvas();
}

function highLightLine(line = gLineIdx) {
    if (line === -1 || gIsLineHighLighted) {
        gIsLineHighLighted = false;
        renderCanvas();
        return;
    }
    let pos = gCurrMeme.lines[line].pos;

    gCtx.beginPath();
    gCtx.rect(pos.x, pos.y, pos.xEnd, -40);
    gIsLineHighLighted = true;
    gCtx.stroke();
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


function _addResizeListener() {
    addEventListener('resize', () => {
        if (window.innerWidth < 600) {
            gCanvas.style.width = '350px';
            gCanvas.style.height = '350px';
        } else {
            gCanvas.style.width = '500px';
            gCanvas.style.height = '500px';
        }
        renderCanvas();
    })
}