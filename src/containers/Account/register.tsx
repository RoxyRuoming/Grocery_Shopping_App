import { useRef, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';
import { Navigate, useNavigate } from 'react-router-dom';


type ResponseType = {
  success: boolean;
  data: boolean;
}

const Register = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const navigate = useNavigate();

  const { request } = useRequest<ResponseType>();

  function handleSubmitBtnClick() {
    if (!userName) {
      message('username should not be empty!');
      return;
    }
    if (!phoneNumber) {
      message('phone number should not be empty!');
      return;
    }
    if (!password) {
      message('password should not be empty!');
      return;
    }
    if (password.length < 6) {
      message('password should be at least 6 digits! ');
      return;
    }
    if (password !== checkPassword) {
      message('passwords inconsistency! ');
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
      if(data?.success) {
        // console.log(data); this is a way to debug
        navigate('/account/login');
      }
    }).catch((e: any) => {
      message(e?.message || 'unknown error');
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
    </>
  )
}

export default Register;