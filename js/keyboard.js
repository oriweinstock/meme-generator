'use strict'

const KEY_SPEED = 4;

function handleKeyboard(ev) {
    let prevent = true;

    switch (ev.key) {
        case 'ArrowDown':
            onMoveLine(0, 1 * KEY_SPEED);
            break;
        case 'ArrowUp':
            onMoveLine(0, -1 * KEY_SPEED);
            break;
        case 'ArrowLeft':
            onMoveLine(-1 * KEY_SPEED, 0);
            break;
        case 'ArrowRight':
            onMoveLine(1 * KEY_SPEED, 0);
            break;
        case '+':
            onFontSize(1);
            break;
        case '-':
            onFontSize(-1);
            break;
        case 'Escape':
            document.querySelector('.modal').classList.add('hidden');
            break;
        case 'z':
            if (ev.ctrlKey) onUndoDelete();
        default:
            prevent = false;
            break;
    }

    if (prevent) ev.preventDefault();
}