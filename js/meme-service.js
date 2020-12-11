'use strict'

/*  Version 0.8
    ------------

    Almost a fully functional version, 1/3-responsive...
    Line needed to be selected in order to manipulate it.
    Don't forget to read the about section :-)
    C'ya!

    Version 0.9
    ------------
    - Drag & Drop for lines
    - Click on line works much better
    - A line is always selected. also on startup.
    - Major clean up / refactor
    - Controls design upgrade
    - Fixed layout problems on different widths

    Version 1.0a
    -------------
    - Welcome TOUCH-HANDLER :-)
    - CSS animations
    - Font load (almost) for Safari w/o Impact
    - 
*/

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

var gCanvasWidth = 500;
var gCanvasHeight = 500;

var gUndoLine;
var gLineIdx = 0;   // meme.selectedLineIdx is useless. no reason to store it within the object, it is just for editing 1 meme

// INIT .......................................................................
function onServiceInit() {
    console.log('Meme Service Loaded.');
    controllerInit();
    galleryInit();
    canvasInit();
}

// CREATE .....................................................................
var gCurrMeme = {
    imgId: 6,
    // selectedLineIdx: 0, // USELESS !! 

    lines: [
        {
            txt: '2nd sprint | DAY #2',
            font: 'impact',
            pos: { x: 30, y: 70, width: 310, height: 420 },
            size: 50,
            strokeWidth: 2,
            strokeColor: '#000000',
            fillColor: '#FFFFFF'
        },
        {
            txt: 'MOBILE...',
            font: 'impact',
            pos: { x: 94, y: 410, width: 190, height: 490 },
            size: 70,
            strokeWidth: 2,
            strokeColor: '#000000',
            fillColor: 'yellow'
        }
    ]
};

function addLine(newLine) {
    gCurrMeme.lines.push(newLine);
    setCurrLineIdx(gCurrMeme.lines.length - 1);
}

// READ .......................................................................
function getCurrLineIdx() {
    return gLineIdx;
}

function getCurrLinePos() {
    return gCurrMeme.lines[gLineIdx].pos;
}

function getCurrLineTxt() {
    return gCurrMeme.lines[gLineIdx].txt;
}

function getColorsToDisplay() {
    return COLORS;
}

function getCanvasSize() {
    return gCanvasWidth;
}

// UPDATE ....................................................................
function moveLine(diffX, diffY, mousePos) {
    let pos = gCurrMeme.lines[gLineIdx].pos;

    if (mousePos) {
        pos.x = mousePos.x;
        pos.y = mousePos.y;
        return;
    }

    if (pos.x + diffX < 0 || pos.x + pos.width + diffX > gCanvasWidth) return;
    if (pos.y - pos.height + diffY < 0 || pos.y + diffY > gCanvasHeight) return;
    pos.x += diffX;
    pos.y += diffY;
}

function setCurrLineIdx(idx) {
    gLineIdx = idx;
}

function setMemeLineText(txt) {
    gCurrMeme.lines[gLineIdx].txt = txt;
}

function setLineArea(lineIdx, dimensions) {
    gCurrMeme.lines[lineIdx].pos.width = dimensions.width;
    gCurrMeme.lines[lineIdx].pos.height = dimensions.height;
}

function setMemeImage(imgId) {
    gCurrMeme.imgId = imgId;
}

function setLineFont(fontName) {
    gCurrMeme.lines[gLineIdx].font = fontName;
}

function setLineColor(color) {
    gCurrMeme.lines[gLineIdx].fillColor = color;
}

function setFontSize(diff) {
    if (gCurrMeme.lines[gLineIdx].size + diff * FONT_SIZE_JUMPS > MAX_FONT_SIZE ||
        gCurrMeme.lines[gLineIdx].size + diff * FONT_SIZE_JUMPS < MIN_FONT_SIZE) return;
    
    gCurrMeme.lines[gLineIdx].size += diff * FONT_SIZE_JUMPS;
}

// DELETE .....................................................................
function deleteLine() {
    if (gLineIdx === -1) return;
    gUndoLine = gCurrMeme.lines.splice(gLineIdx, 1)[0];
    setCurrLineIdx(0);
}

function undoDelete() {
    if (gUndoLine) {
        gCurrMeme.lines.push(gUndoLine);
        gUndoLine = null;
    }
}