'use strict'

const EMOJI_SIZE = 60;

function galleryControllerInit() {
    console.log('Gallery controller loaded');
    renderGallery();
    renderEmojiLines();
}

function renderGallery() {
    var imgs = getImagesToDisplay();
    var strHtmls = imgs.map(img => {
        return `
        <img class="rounder-corner shadow" src="img/${img.id}.jpg"
        alt="image-${img.id}" data-img-id="${img.id}" 
        onclick="onImageClick(this)">`;
    });
    document.querySelector('.image-gallery').innerHTML = strHtmls.join('');
}

function onImageClick(img) {
    setMemeImage(+img.dataset.imgId);
    renderCanvas();
    onGalleryClick();
}

function onTagClick(dataset) {
    setFilter(dataset.tag);
    renderGallery();
}

// Tried 2d map. 1st try was a fail :-)
function renderEmojiLines() {
    renderEmojiLine(0);
    renderEmojiLine(1);
    renderEmojiLine(2);
}

function renderEmojiLine(lineIdx = 0) {
    var emojis = getEmojisToDisplay(lineIdx);
    var strHtmls = emojis.map(emoji => {
        return `
        <div onclick="onEmojiClick(this.innerText)" class="emoji">${emoji}</div>
        `;
    });
    document.querySelector(`.emoji${lineIdx}`).innerHTML = strHtmls.join('');
}

function onEmojiClick(emoji) {
    var newLine = {
        txt: emoji,
        pos: _getRandomPosOnCanvas(),
        size: EMOJI_SIZE
    }
    addLine(newLine);
    renderCanvas();
}

function _getRandomPosOnCanvas() {
    var canvasSize = getCanvasSize();
    let x = Math.floor(Math.random() * (canvasSize - EMOJI_SIZE));
    let y = Math.floor(Math.random() * (canvasSize - EMOJI_SIZE));
    return { x, y };
}