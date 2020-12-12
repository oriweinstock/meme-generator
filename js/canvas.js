'use strict'

// Handle line selection/drag
var gMouseDown = false;
var gBeforeDragPosition;
var gDragOffsetX;
var gIsNoneSelected = true;

// Handle inline editing
var gIsInlineEdit = false;
var gIsCursorBlink = true;
var gBlinkTimer;
const BLINK_TIME = 400;

function canvasInit() {
    console.log('Canvas module loaded')
    _addResizeListener();
    _resizeCanvas();
}

// MOUSE ......................................................................
function onCanvasMouseDown(ev) {
    gMouseDown = true;
    clearInterval(gBlinkTimer);
    let mousePos = _getCorrectOffsets(ev);

    let clickedLine = _getClickedLineByPos(mousePos);
    if (clickedLine === -1) {
        gIsNoneSelected = true;
        gMouseDown = false;
        renderCanvas();
        return;
    }
    gIsNoneSelected = false;
    setCurrLineIdx(clickedLine);

    gDragOffsetX = _getDragOffsetX(mousePos.x);
    mousePos.x += gDragOffsetX;
    gBeforeDragPosition = mousePos;

    renderCanvas();
}

function onCanvasMouseMove(ev) {
    if (!gMouseDown) return;
    let mousePos = _getCorrectOffsets(ev);
    mousePos.x = mousePos.x + gDragOffsetX;

    moveLine(null, null, mousePos);
    gIsInlineEdit = false;
    renderCanvas();
}

function onCanvasMouseUp(ev) {
    gMouseDown = false;
    gIsInlineEdit = false;
    gBeforeDragPosition = null;
    ev.stopPropagation();
    renderCanvas();
}

function onCanvasDblClick(ev) { // inline editing
    console.log('mouse dbl clicked');
    gIsInlineEdit = true;
    gBlinkTimer = setInterval(() => {
        gIsCursorBlink = !gIsCursorBlink;
        renderCanvas();
    }, BLINK_TIME);
    setInlineEditFocus();
}

function onBodyMouseUp(ev) {    // avoid non-ending drags
    gMouseDown = false;
    if (gBeforeDragPosition) moveLine(null, null, gBeforeDragPosition);
    gBeforeDragPosition = null;
    ev.stopPropagation();
}


// INLINE EDIT ................................................................
function setInlineEditFocus() {
    var txt = getCurrLineTxt();
    document.querySelector('[name="inlineText"]').value = txt;
    var elInlineTxt = document.querySelector('[name="inlineText"]');
    elInlineTxt.focus();
    elInlineTxt.scrollLeft = elInlineTxt.scrollWidth;
}

// DRAW .......................................................................
function highLightCurrLine() {
    if (gIsNoneSelected) return;
    let line = getCurrLineIdx();
    let pos = gCurrMeme.lines[line].pos;

    gCtx.beginPath();
    if (gIsInlineEdit) {
        // draw single underline
        let lineWidth = (pos.width > 70) ? pos.width : 70;
        gCtx.beginPath();
        gCtx.strokeStyle = 'black';
        gCtx.moveTo(pos.x - 10, pos.y + 10);
        gCtx.lineTo(pos.x + lineWidth, pos.y + 10);
        gCtx.closePath();
        gCtx.stroke();
        // draw cursor
        gCtx.beginPath();
        gCtx.strokeStyle = 'white';
        gCtx.moveTo(pos.x + pos.width, pos.y + 20);
        gCtx.lineTo(pos.x + pos.width, pos.y - pos.height);
        gCtx.closePath();
        if (!gIsCursorBlink) gCtx.stroke();
    } else {
        gCtx.rect(pos.x - 10, pos.y + 10, pos.width + 15, (-1 * pos.height) - 10);
        gCtx.stroke();
    }
}

// MEMES GALLERY
function renderMiniCanvases(memes) {
    var strHtmls = memes.map((meme, index) => {
        return `<div class="saved-meme">
                <canvas class="rounder-corner" onclick="onSavedMemeClick(${index})"
                id="saved-meme${index}" width="500" height="500">
                </canvas>
                </div>`
    });
    document.querySelector('.memes-gallery').innerHTML = strHtmls.join('');
    memes.forEach((meme, index) => {
        gMiniCanvases[index] = document.querySelector(`#saved-meme${index}`);
        gMiniCtxs[index] = gMiniCanvases[index].getContext('2d');
    
        gMiniCanvases[index].style.width = '200px';
        gMiniCanvases[index].style.height = '200px';
        renderCanvas(gMiniCanvases[index], gMiniCtxs[index], meme);
    })
}

function onSavedMemeClick(index) {
    setCurrMeme(index);
    renderCanvas();
    onMyMemesClick();
}

// MAIN CANVAS
function renderCanvas(canvas = gCanvas, ctx = gCtx, meme = gCurrMeme) {
    var img = new Image();
    img.src = `img/${meme.imgId}.jpg`
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        meme.lines.forEach((line, index) => {
            ctx.lineWidth = line.strokeWidth;
            ctx.fillStyle = line.fillColor;
            ctx.strokeStyle = line.strokeColor;
            ctx.font = `normal 400 ${line.size}px ${line.font}`;
            ctx.fillText(line.txt, line.pos.x, line.pos.y);
            ctx.strokeText(line.txt, line.pos.x, line.pos.y);

            setLineArea(index, {
                width: gCtx.measureText(line.txt).width,
                height: line.size
            });
        });
        highLightCurrLine();
    }
}

function renderCanvasLine(line, index) {
    gCtx.lineWidth = line.strokeWidth;
    gCtx.fillStyle = line.fillColor;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.font = `normal 400 ${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);

    // set current meme line dimensions to capture correct pixels
    setLineArea(index, {
        width: gCtx.measureText(line.txt).width,
        height: line.size
    });
}

// UTILS ......................................................................
function _addResizeListener() {
    addEventListener('resize', () => {
        _resizeCanvas();
        renderCanvas();
    })
}

function _resizeCanvas() {
    let windowWidth = window.innerWidth;
    let canvasSize;

    // numbers based on 'px' media queries
    if (windowWidth > 720) canvasSize = windowWidth / 2;
    else if (windowWidth > 500) canvasSize = windowWidth / 1.2;
    else canvasSize = windowWidth / 1.04;

    gCanvas.style.width = canvasSize + 'px';
    gCanvas.style.height = canvasSize + 'px';
}

function _getClickedLineByPos(clickPos) {
    return gCurrMeme.lines.findIndex((line) => {
        return clickPos.x >= line.pos.x && clickPos.x <= line.pos.x + line.pos.width
            && clickPos.y <= line.pos.y && clickPos.y >= line.pos.y - line.pos.height
    });
}

function _getCorrectOffsets(ev) {
    let { offsetX, offsetY } = ev;
    offsetX *= _getCanvasRatio();
    offsetY *= _getCanvasRatio();
    return { x: offsetX, y: offsetY }
}

function _getDragOffsetX(posX) {
    let linePos = getCurrLinePos();
    return linePos.x - posX;
}

function _getCanvasRatio() {
    return 500 / parseInt(gCanvas.style.width); // 500 is fixed for now. TBD
}