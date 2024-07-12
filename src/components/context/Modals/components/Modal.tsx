import React from 'react'
import { useModalContext } from '../ModalProvider'

import '../styles/modals.scss';

const Modal = ({ modal }) => {
    const { removeModal } = useModalContext()

    return (
        <article
            className='modal'
            onClick={() => removeModal(modal?.id)}>
            <div
                className='modal__container'
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => e.stopPropagation()}>
                <div className='modal__container-header'>
                    <h2>{modal?.title}</h2>
                    <button onClick={() => removeModal(modal?.id)} >X</button>
                </div>
                {modal?.element}
            </div>
        </article>
    )
}

export default Modal