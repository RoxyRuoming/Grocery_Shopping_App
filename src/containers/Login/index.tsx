import axios from 'axios';
import { useState } from 'react';
import './style.scss';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passWord, setPassWord] = useState('');

  // concepts related with sending requests
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  function handleSubmitBtnClick() {
    axios.get('/a.json').then((response) => {
      setLoaded(true);
      setData(response.data);
    }).catch((error) => {
      console.log(error);
      setLoaded(true);
      setError(error.message)
    })
  }

  if(loaded) {
    if(data) {
      setLoaded(false);
      alert('success to load');
    } else {
      alert('fail to load');
    }
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
    </div>
  )
}

export default Login;