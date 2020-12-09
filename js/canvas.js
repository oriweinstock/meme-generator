'use strict'

function canvasInit() {
    console.log('Canvas module loaded.')
    _addResizeListener();
    _resizeCanvas();
}
// CANVAS FUNCS ...............................................................
function onCanvasClick(ev) {
    var { offsetX, offsetY } = ev;
    offsetX *= _getCanvasRatio();
    offsetY *= _getCanvasRatio();

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

const renderCanvasLines = () => gCurrMeme.lines.forEach(line => renderCanvasLine(line));

function renderCanvasLine(line) {
    gCtx.lineWidth = line.strokeWidth;
    gCtx.fillStyle = line.fillColor;
    gCtx.strokeStyle = line.strokeColor;
    // gCtx.font = 'normal 900 60px impact';
    gCtx.font = `normal 900 ${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
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

function _addResizeListener() {
    addEventListener('resize', () => {
        _resizeCanvas();
        renderCanvas();
    })
}

function _resizeCanvas() {
    let windowWidth = window.innerWidth;
    let canvasSize = (windowWidth > 720) ? windowWidth / 2 + 'px' : windowWidth - 140 + 'px';
    gCanvas.style.width = canvasSize;
    gCanvas.style.height = canvasSize;
}

const _getCanvasRatio = () => 500 / parseInt(gCanvas.style.width);
