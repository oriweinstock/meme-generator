'use strict'

/*  Version 0.8
    ------------

    Almost a fully functional version, 1/3-responsive...
    Line needed to be selected in order to manipulate it.
    Don't forget to read the about section :-)
    C'ya!

*/
// GLOBALS / CONSTS ...........................................................
const DEFAULT_FONT = 'impact';
const DEFAULT_SIZE = 40;

var gCanvasWidth = 500;
var gCanvasHeight = 500;

var gUndoLine;

// INIT .......................................................................
function onServiceInit() {
    console.log('Meme Service Loaded.');
    controllerInit();
    galleryInit();
}

var gCurrMeme = {
    imgId: 5,
    selectedLineIdx: -1,

    lines: [
        {
            txt: '2nd Sprint. 1st Day',
            font: 'impact',
            pos: { x: 100, y: 50, xEnd: 310 },
            size: 40,
            align: 'center',
            strokeWidth: 3,
            strokeColor: '#000000',
            fillColor: '#FFFFFF'
        },
        {
            txt: 'SUCCESS',
            font: 'impact',
            pos: { x: 250, y: 450, xEnd: 190 },
            size: 50,
            align: 'center',
            strokeWidth: 3,
            strokeColor: '#000000',
            fillColor: 'yellow'
        }
    ]
};

function setSelectedLine(idx) { gCurrMeme.selectedLineIdx = idx; }
function getSelectedLine() { return selectedLineIdx; }

function setMemeLineText(txt) {
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

function changeFontSize(diff) {
    console.log(diff)
    gCurrMeme.lines[_getCurrLineIdx()].size += diff;
}

function _validatePosition() {
    let pos = gCurrMeme.lines[_getCurrLineIdx].pos;
}

// LINE FUNCS .................................................................
var _getCurrLineIdx = () => gCurrMeme.selectedLineIdx;
var _setCurrLineIdx = (idx) => gCurrMeme.selectedLineIdx = idx;

function moveLine(diffX, diffY) {
    let pos = gCurrMeme.lines[_getCurrLineIdx()].pos;

    if (pos.x + diffX < 0 || pos.x + pos.xEnd + diffX > gCanvasWidth) return;
    if (pos.y -40 + diffY < 0 || pos.y + diffY > gCanvasHeight) return;
    pos.x += diffX;
    pos.y += diffY;
}