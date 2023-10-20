import './style.scss';
import { useEffect, useState } from 'react';
import useRequest from '../../utils/useRequest';

// 1. define the return value of the interface
type ResponseType = {
  name: String;
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passWord, setPassWord] = useState('');

  // 2. use <T> pass the type to the function/hook (useRequest)
  // 5. the type of recieved data is "ResponseType | null" (T | null)
  const {data, error, loaded, request,cancel} = useRequest<ResponseType>('/a.json','GET', {});

  function handleSubmitBtnClick() {
    request();
    // cancel();
  }

  // avoid repeated rendering
  useEffect(() => {
    if(data) {alert("success");}
    if(error) {alert('failure');}
  }, [data, error])

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
    </div>
  )
}

export default Login;