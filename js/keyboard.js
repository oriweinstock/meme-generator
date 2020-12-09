'use strict'

const KEY_SPEED = 4;

function handleKeyboard(ev) {
    switch (ev.key) {
        case 'ArrowDown':
            ev.preventDefault();
            onMoveLine(0, 1 * KEY_SPEED);
            break;
        case 'ArrowUp':
            ev.preventDefault();
            onMoveLine(0, -1 * KEY_SPEED);
            break;
        case 'ArrowLeft':
            ev.preventDefault();
            onMoveLine(-1 * KEY_SPEED, 0);
            break;
        case 'ArrowRight':
            ev.preventDefault();
            onMoveLine(1 * KEY_SPEED, 0);
            break;
        case 'Escape':
            document.querySelector('.modal').classList.add('hidden');
            break;
    }
}