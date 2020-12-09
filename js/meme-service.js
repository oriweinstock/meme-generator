'use strict'

// GLOBALS / CONSTS ...........................................................
const DEFAULT_FONT = 'impact';
const DEFAULT_SIZE = 40;

var gCanvasWidth = 500;
var gCanvasHeight = 500;

var gUndoLine;

function onServiceInit() {
    console.log('Meme Service Loaded.');
    controllerInit();
    galleryInit();
}

var gCurrMeme = {
    imgId: 3,
    selectedLineIdx: -1,

    lines: [
        {
            txt: 'Hello Meme',
            font: 'impact',
            pos: { x: 100, y: 200, xEnd: 200 },
            size: 40,
            align: 'center',
            strokeWidth: 3,
            strokeColor: '#000000',
            fillColor: '#FFFFFF'
        },
        {
            txt: 'Second LINE!!',
            font: 'impact',
            pos: { x: 200, y: 400, xEnd: 270 },
            size: 50,
            align: 'center',
            strokeWidth: 3,
            strokeColor: '#000000',
            fillColor: '#FFAAFF'
        }
    ]
};

function setSelectedLine(idx) { gCurrMeme.selectedLineIdx = idx; }
function getSelectedLine() { return selectedLineIdx; }

function setMemeLine(txt) {
    gCurrMeme.lines[_getCurrLineIdx()].txt = txt;
}

function getLineEnd(value) {
    console.log(value)
    return 100;
}

function addLine(newLine) {
    gCurrMeme.lines.push(newLine);
    _setCurrLineIdx(gCurrMeme.lines.length - 1);
}

function deleteLine() {
    if (_getCurrLineIdx() === -1) return;
    gUndoLine = gCurrMeme.lines.splice(_getCurrLineIdx(), 1)[0];
    _setCurrLineIdx(-1);
}

function undoDelete() {
    if (gUndoLine) {
        gCurrMeme.lines.push(gUndoLine);
        gUndoLine = null;
    }
}
function setMemeImage(imgId) {
    gCurrMeme.imgId = imgId;
}

function setLineFont(fontName) {
    gCurrMeme.lines[_getCurrLineIdx()].font = fontName;
}

function moveLine(diffX, diffY) {
    let pos = gCurrMeme.lines[_getCurrLineIdx()].pos;

    if (pos.x + diffX < 0 || pos.x + pos.xEnd + diffX > gCanvasWidth) return;
    if (pos.y -40 + diffY < 0 || pos.y + diffY > gCanvasHeight) return;
    pos.x += diffX;
    pos.y += diffY;
    // _validatePosition();
}

function changeFontSize(diff) {
    console.log(diff)
    gCurrMeme.lines[_getCurrLineIdx()].size += diff;
}

function _validatePosition() {
    let pos = gCurrMeme.lines[_getCurrLineIdx].pos;
}

var _getCurrLineIdx = () => gCurrMeme.selectedLineIdx;
var _setCurrLineIdx = (idx) => gCurrMeme.selectedLineIdx = idx;