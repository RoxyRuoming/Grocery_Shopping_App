import { useRef, useState } from 'react';
import useRequest from '../../utils/useRequest';
import Modal, { ModalInterfaceType } from '../../components/Modal';

type ResponseType = {
  sussess: boolean;
  data: {
    token: string;
  }
}

const Login = () => {
  const modalRef = useRef<ModalInterfaceType>(null!);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const { request } = useRequest<ResponseType>();

  function handleSubmitBtnClick() {
    if (!phoneNumber) {
      modalRef.current.showMessage('phone number should not be empty!');
      return;
    }
    if (!password) {
      modalRef.current.showMessage('password should not be empty!');
      return;
    }
    request({
      url: '/login.json',
      method: 'POST',
      data: {
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
      </div>
      <div className="submit" onClick={handleSubmitBtnClick}>
        Log In
      </div>
      <p className="notice">
        *Privacy Policy
      </p>
      <Modal ref={modalRef} />
    </>
  )
}

export default Login;