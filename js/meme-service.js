'use strict'

// GLOBALS / CONSTS ...........................................................
const DEFAULT_FONT = 'impact';
const DEFAULT_SIZE = 40;
const MIN_FONT_SIZE = 16;
const MAX_FONT_SIZE = 140;
const FONT_SIZE_JUMPS = 4;
const COLORS = [
    '#ffffff',
    '#ffe600',
    '#bdaef3',
    '#cbffc6',
    '#ff0000',
    '#fc9191',
    '#bfffff',
    '#96ff89'
];

var gMemes = [];
var gCurrMeme;
var gKeywords;
var gEmojis;

var gCanvasBaseWidth = 500;
var gCanvasBaseHeight = 500;

var gUndoLine;
var gCurrLineIdx = 0;   // meme.selectedLineIdx is useless. no reason to store it within the object, it is just for editing 1 meme

// INIT .......................................................................
function onServiceInit() {
    console.log('Meme service loaded');
    _createMemes();
    setCurrMeme(4);
    setCurrLineIdx(0);

    gKeywords = getKeywordsFromDatabase();
    gEmojis = getEmojisFromDatabase();
    controllerInit();
    galleriesInit();
    canvasInit();
}

// CREATE .....................................................................
function _createMemes() {
    // let memes = loadFromStorage(STORAGE_KEY); // TBD
    let memes = '';
    if (!memes || !memes.length) {
        memes = [];
        memes = getMemesFromDatabase();
    }
    gMemes = memes;
}

function addLine(newLine) {
    gCurrMeme.lines.push(newLine);
    setCurrLineIdx(gCurrMeme.lines.length - 1);
}

// READ .......................................................................
function getCurrLineIdx() {
    return gCurrLineIdx;
}

function getCurrLinePos() {
    return gCurrMeme.lines[gCurrLineIdx].pos;
}

function getCurrLineTxt() {
    return gCurrMeme.lines[gCurrLineIdx].txt;
}

function getColorsToDisplay() {
    return COLORS;
}

function getCanvasSize() {
    return gCanvasBaseWidth;
}

function getSavedMemes() {
    return gMemes;
}

function getKeywords() {
    return gKeywords;
}

function getKeywordCount(keyword) {
    return keyword.count;
}
function getEmojisToDisplay(lineIdx) {
    return gEmojis[lineIdx];
}

function getEmojisLineslength() {
    return gEmojis.length;
}

// UPDATE ....................................................................
function setCurrMeme(index) {
    gCurrMeme = gMemes[index];
}

function moveLine(diffX, diffY, mousePos) {
    let pos = gCurrMeme.lines[gCurrLineIdx].pos;

    if (mousePos) {
        pos.x = mousePos.x;
        pos.y = mousePos.y;
        return;
    }
    // Keyboard movement
    if (pos.x + diffX < 0 || pos.x + pos.width + diffX > gCanvasBaseWidth) return;
    if (pos.y - pos.height + diffY < 0 || pos.y + diffY > gCanvasBaseHeight) return;
    pos.x += diffX;
    pos.y += diffY;
}

function setCurrLineIdx(idx) {
    gCurrLineIdx = idx;
}

function setMemeLineText(txt) {
    if (txt.length === 0) {
        txt = '...';
        setInlineCursorToStart();
    }
    gCurrMeme.lines[gCurrLineIdx].txt = txt;
}

function setLineArea(lineIdx, dimensions) { // put ctx line co-ordinates in model
    console.log(lineIdx)
    gCurrMeme.lines[lineIdx].pos.width = dimensions.width;
    gCurrMeme.lines[lineIdx].pos.height = dimensions.height;
}

function setMemeImage(imgId) {
    gCurrMeme.imgId = imgId;
}

function setLineFont(fontName) {
    gCurrMeme.lines[gCurrLineIdx].font = fontName;
}

function setLineColor(color) {
    gCurrMeme.lines[gCurrLineIdx].fillColor = color;
}

function setFontSize(diff) {
    let size = gCurrMeme.lines[gCurrLineIdx].size;

    if (size + diff * FONT_SIZE_JUMPS > MAX_FONT_SIZE ||
        size + diff * FONT_SIZE_JUMPS < MIN_FONT_SIZE) return;
    
    gCurrMeme.lines[gCurrLineIdx].size += diff * FONT_SIZE_JUMPS;
}

// DELETE .....................................................................
function clearLines() {
    gCurrMeme.lines = [{
        txt: 'Enter something...',
        font: 'impact',
        pos: { x: 100, y: 50, width: 310, height: 420 },
        size: 40,
        strokeWidth: 3,
        strokeColor: '#000000',
        fillColor: '#FFFFFF'
    }];
    setCurrLineIdx(0);
}

function deleteLine() {
    if (gCurrLineIdx === -1) return;
    gUndoLine = gCurrMeme.lines.splice(gCurrLineIdx, 1)[0];
    setCurrLineIdx(0);
}

function undoDelete() {
    if (gUndoLine) {
        gCurrMeme.lines.push(gUndoLine);
        gUndoLine = null;
    }
}

// STORAGE SERVICE ............................................................
// To be developed ............................................................