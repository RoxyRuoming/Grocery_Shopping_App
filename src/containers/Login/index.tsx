import './style.scss';
import { useRef, useState } from 'react';
import useRequest from '../../utils/useRequest';
import Modal, {ModalInterfaceType} from '../../components/Modal';

// 1. define the return value of the interface
type ResponseType = {
  name: String;
}

const Login = () => {
  const modalRef = useRef<ModalInterfaceType>(null!);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passWord, setPassWord] = useState('');

  const {request} = useRequest<ResponseType>('/a.json','GET', {});

  function handleSubmitBtnClick() {
    if(!phoneNumber) {
      modalRef.current?.showMessage("phone number should not be empty!")
      return;
    } 
    if (!passWord) {
      modalRef.current?.showMessage("password should not be empty!")
      return;
    }

    request().then((data) => {
      console.log(data)
    }).catch((e:any) => {
      modalRef.current?.showMessage(e?.message || 'unknown error');
    });
  }

  return (
    <div className="page login-page">
      <div className="tab">
        <div className='tab-item tab-item-left'>Log In</div>
        <div className='tab-item tab-item-right'>Register</div>
      </div>
      <div className="form">
        <div className='form-item'>
          <div className='form-item-title'>Phone</div>
          <input value={phoneNumber} className='form-item-content' 
          placeholder='Please input your phone number' 
          onChange={(e) => {setPhoneNumber(e.target.value)}}/>
        </div>
        <div className='form-item'>
          <div className='form-item-title'>Password</div>
          <input value={passWord} type="password" className='form-item-content' 
          placeholder='please input your password' 
          onChange={(e) => {setPassWord(e.target.value)}}/>
        </div>
      </div>
      <div className="submit" onClick={handleSubmitBtnClick}>
        Log In
      </div>
      <p className="notice">
        *Pravacy Policy
      </p>
     <Modal ref={modalRef}/>
    </div>
  )
}

export default Login;