import { forwardRef, useImperativeHandle, useState } from 'react';
import './style.scss';

// useEffect(() => {
//   if(showModal) {
//     const timer = setTimeout(() => {
//       setShowModal(false);
//     }, 1500);
//     return () => {
//       clearTimeout(timer);
//     }
//   }
// }, [showModal])

// modal -  TS type
export type ModalInterfaceType = {
  showMessage: (message: string) => void
}

const Modal = forwardRef<ModalInterfaceType>((props, ref)=> {
  const [ showModal, setShowModal] = useState(false);
  const [ message, setMessage] = useState('');

  useImperativeHandle(ref, () => {
    return {
      showMessage(message: string) {
        setMessage(message);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 1500)
      }
    }
  }, [])

  return showModal ? (
    <div className="modal">
      <div className="modal-text">{message}</div>
    </div>
  ): null;
}
);
export default Modal;