
import Modal from './components/Modal';
import { IModal } from './interfaces/Modal';

interface Props{
    modals: IModal[]
}

const ModalContainer = ({ modals }:Props) => {
    return (
        <>
            {modals?.map(modal => <Modal key={modal?.id} modal={modal} />
            )}
        </>
    )
}

export default ModalContainer