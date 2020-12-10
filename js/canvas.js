'use strict'

var gMouseDown = false;

function canvasInit() {
    console.log('Canvas module loaded.')
    _addResizeListener();
    _resizeCanvas();
    _renderCurrLineInputs();
}

// MOUSE ......................................................................
function onCanvasMouseDown(ev) {
    gMouseDown = true;
    let mousePos = _getCorrectOffsets(ev);
    let clickedLine = _getClickedLineByPos(mousePos);
    if (clickedLine === -1) return;

    setCurrLineIdx(clickedLine);
    _renderCurrLineInputs();
    highLightLine(clickedLine);
}
function onCanvasMouseMove(ev) {
    if (!gMouseDown) return;
    let mousePos = _getCorrectOffsets(ev);
    moveLine(null, null, mousePos);
    renderCanvas();
}
function onCanvasMouseUp(ev) {
    gMouseDown = false;
}

// DRAW .......................................................................
function renderCanvas() {
    var img = new Image();
    img.src = `img/${gCurrMeme.imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderCanvasLines();
    }
}

const renderCanvasLines = () => gCurrMeme.lines.forEach((line, index) => renderCanvasLine(line, index));

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

function highLightLine(line = 0) {
    if (line === -1 || gIsLineHighLighted) {
        gIsLineHighLighted = false;
        renderCanvas();
        return;
    }
    let pos = gCurrMeme.lines[line].pos;

    gCtx.beginPath();
    gCtx.rect(pos.x - 10, pos.y + 10, pos.width + 15, (-1 * pos.height) - 10);
    gIsLineHighLighted = true;
    gCtx.stroke();
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

const _getClickedLineByPos = (clickPos) => {
    return gCurrMeme.lines.findIndex((line) => {
        return clickPos.x >= line.pos.x && clickPos.x <= line.pos.x + line.pos.width
            && clickPos.y <= line.pos.y && clickPos.y >= line.pos.y - line.pos.height
    });
}
const _getCanvasRatio = () => 500 / parseInt(gCanvas.style.width);

const _getCorrectOffsets = (ev) => {
    var { offsetX, offsetY } = ev;
    offsetX *= _getCanvasRatio();
    offsetY *= _getCanvasRatio();
    return {x: offsetX, y: offsetY}
}