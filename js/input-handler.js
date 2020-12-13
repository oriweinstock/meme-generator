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
            stopInlineEdit(true);   // true -> undo edit. TBD.
            break;
        case 'z':
            if (ev.ctrlKey) onUndoDelete();
            break;
        case 'Enter':
            stopInlineEdit();
            break;
        case 'Backspace':
            if (gIsInlineEdit) {
                prevent = false;
                break;
            }
            onDeleteLine();
            break;
        default:
            prevent = false;
            break;
    }
    if (prevent) ev.preventDefault();
}

function addTouchListeners() {

    // CONVERT TO MOUSE
    gCanvas.addEventListener('touchstart', ev => {
        var touch = ev.touches[0];
        var mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        gCanvas.dispatchEvent(mouseEvent)
    }, false);

    gCanvas.addEventListener('touchend', ev => {
        var mouseEvent = new MouseEvent('mouseup', {});
        gCanvas.dispatchEvent(mouseEvent)
    })

    gCanvas.addEventListener('touchmove', ev => {
        var touch = ev.touches[0];
        var mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        gCanvas.dispatchEvent(mouseEvent)
    }, false);

    // PREVENT DEFAULTS
    document.body.addEventListener('touchstart', ev => {
        if (ev.target == gCanvas) {
            ev.preventDefault();
        }
        if (ev.touches.length > 1) {
            ev.preventDefault();
        }
    }, { passive: false });
    document.body.addEventListener('touchend', ev => {
        if (ev.target == gCanvas) {
            ev.preventDefault();
        }
    }, { passive: false });
    document.body.addEventListener('touchmove', ev => {
        if (ev.target == gCanvas) {
            ev.preventDefault();
        }
    }, { passive: false });
}