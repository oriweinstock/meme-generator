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
    
    Version 1.0b
    ------------
    - Inline editing with a shiny blinking cursor
    - Brand new editing panel with custom color picker
    - Emoji panel for even more fun
    - Improved design with much more depth
    - Saved memes gallery with the same renderCanvas function. yaaaay
    - Gallery filter 1st stage
    - ... and many more fixes and clean ups
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

const STORAGE_KEY = 'memes';
var gMemes = [];
var gCurrMeme;
var gKeywords = ['funny', 'cute', 'politics', 'dogs', 'baby'];

const gEmojis = [['😬', '😎', '😅', '😂', '😜', '😵'], ['👍', '👎', '🤟', '💪', '👏', '🖕'], ['🌈', '🔥', '💥', '💡', '🎉', '❤️']];

var gCanvasBaseWidth = 500;
var gCanvasBaseHeight = 500;

var gUndoLine;
var gLineIdx = 0;   // meme.selectedLineIdx is useless. no reason to store it within the object, it is just for editing 1 meme

// INIT .......................................................................
function onServiceInit() {
    console.log('Meme service loaded');
    _createMemes();
    controllerInit();
    galleryInit();
    canvasInit();
}

// CREATE .....................................................................
function _createMemes() {
    let memes = loadFromStorage(STORAGE_KEY);
    if (!memes || !memes.length) {
        memes = [];
        memes = getMemesFromDatabase();
    }

    gMemes = memes;
    gCurrMeme = gMemes[2];
}

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
    return gCanvasBaseWidth;
}

function getSavedMemes() {
    return gMemes;
}

function getKeywords() {
    return gKeywords;
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
    let pos = gCurrMeme.lines[gLineIdx].pos;

    if (mousePos) {
        pos.x = mousePos.x;
        pos.y = mousePos.y;
        return;
    }

    if (pos.x + diffX < 0 || pos.x + pos.width + diffX > gCanvasBaseWidth) return;
    if (pos.y - pos.height + diffY < 0 || pos.y + diffY > gCanvasBaseHeight) return;
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

// STORAGE SERVICE ............................................................
function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}