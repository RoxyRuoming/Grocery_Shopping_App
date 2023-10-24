import type { LoginResponseType } from './types';
import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import { message } from '../../utils/message';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { request } = useRequest<LoginResponseType>({ manual: true });

  function handleSubmitBtnClick() {
    if (!phoneNumber) {
      message('phone number should not be empty!');
      return;
    }
    if (!password) {
      message('password should not be empty!');
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
      const { data: { token } } = data;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
    }).catch((e: any) => {
      message(e?.message || 'unknown error');
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
    </>
  )
}

export default Login;