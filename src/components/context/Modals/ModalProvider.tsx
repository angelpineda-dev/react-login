/* React */
import { createContext, useContext, useState } from 'react';
/* Libraries */
import { v4 as uuid } from 'uuid';
/* Components */
import ModalContainer from './ModalContainer';
import { IModal } from './interfaces/Modal';

interface IShowModal { 
    element: JSX.Element;
    title?: string
}

interface IModalContext {
    showModal: (value:IShowModal) => void;
    removeModal: (id: string) => void;
}

const ModalContext = createContext({} as IModalContext)

export const ModalProvider = ({children}) => {
    const [modals, setModals] = useState<IModal[]>([])

    /**
     * showModal
     * appends a modal to DOM
     * @param {JSX.Element} element
     */
    function showModal({element, title = ''}) {
        let newModal = {id: uuid(), element, title};

        setModals([
            ...modals,
            newModal
        ])
    }

    /**
     * removeModal
     * removes a modal from the DOM
     * @param {string} id
     */
    function removeModal(id:string) {
        
        let newModalArray = modals.filter(modal => modal?.id !== id);

        setModals(newModalArray)
    }

  return (
    <ModalContext.Provider value={{
        showModal, 
        removeModal
        }}>
        {children}
        <ModalContainer 
            modals={modals}
        />
    </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext);