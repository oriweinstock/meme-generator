'use strict'

/*  Version 0.8
    ------------

    Almost a fully functional version, 1/3-responsive...
    Line needed to be selected in order to manipulate it.
    Don't forget to read the about section :-)

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
    -------------
    - Inline editing with a shiny blinking cursor
    - Brand new editing panel with custom color picker
    - Emoji panel for even more fun
    - Improved design with much more depth
    - Saved memes gallery with the same renderCanvas function. yaaaay
    - Gallery filter 1st stage
    - ... and many more fixes and clean ups

    Version 1.0RC
    --------------
    - Inline edit upgrade. Enter/Escape support (Escape undo edit)
    - Gallery filter by tag
    - Mobile Menu, Content max-width, Hiding buttons for better layout, CSS 138 fixes
    - known issue #1: increase font size can restrict keyboard movement if passes canvas borders. 1 hour to deliver. we'll see.
    - known issue #2: selecting 'current' meme from meme gallery acts weird. 45 minutes to deliver :-)
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
    gCurrMeme = gMemes[3];
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