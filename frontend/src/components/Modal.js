import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {createPortal} from 'react-dom';

const Modal = forwardRef(({children}, ref) => {
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setShow(true),
        close: () => setShow(false),
    }));

    if (!show) {
        return null;
    }
    return createPortal(
        <div className="modal-backdrop" onClick={() => setShow(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
})

export default Modal;