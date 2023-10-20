import { useRef, useState } from 'react';
import useRequest from '../../utils/useRequest';
import Modal, { ModalInterfaceType } from '../../components/Modal';

type ResponseType = {
  success: boolean;
  data: boolean;
}

const Register = () => {
  const modalRef = useRef<ModalInterfaceType>(null!);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const { request } = useRequest<ResponseType>();

  function handleSubmitBtnClick() {
    if (!userName) {
      modalRef.current.showMessage('username should not be empty!');
      return;
    }
    if (!phoneNumber) {
      modalRef.current.showMessage('phone number should not be empty!');
      return;
    }
    if (!password) {
      modalRef.current.showMessage('password should not be empty!');
      return;
    }
    if (password.length < 6) {
      modalRef.current.showMessage('password should be at least 6 digits! ');
      return;
    }
    if (password !== checkPassword) {
      modalRef.current.showMessage('passwords inconsistency! ');
      return;
    }
    request({
      url: '/register.json',
      method: 'POST',
      data: {
        user: userName,
        phone: phoneNumber,
        password: password,
      }
    }).then((data) => {
      data && console.log(data);
    }).catch((e: any) => {
      modalRef.current?.showMessage(e?.message || 'unknown error');
    });
  }

  return (
    <>
      <div className="form">
        <div className='form-item'>
          <div className='form-item-title'>Username</div>
          <input
            value={userName}
            className='form-item-content'
            placeholder='please input your username'
            onChange={(e) => { setUserName(e.target.value) }}
          />
        </div>
        <div className='form-item'>
          <div className='form-item-title'>Phone Number</div>
          <input
            value={phoneNumber}
            className='form-item-content'
            placeholder='please input your phone number'
            onChange={(e) => { setPhoneNumber(e.target.value) }}
          />
        </div>
        <div className='form-item'>
          <div className='form-item-title'>Password</div>
          <input
            value={password}
            type="password"
            className='form-item-content'
            placeholder='please input your password'
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
        <div className='form-item'>
          <div className='form-item-title'>Comfirm Password</div>
          <input
            value={checkPassword}
            type="password"
            className='form-item-content'
            placeholder='please comfirm your password'
            onChange={(e) => { setCheckPassword(e.target.value) }}
          />
        </div>
      </div>
      <div className="submit" onClick={handleSubmitBtnClick}>
        Register
      </div>
      <Modal ref={modalRef} />
    </>
  )
}

export default Register;