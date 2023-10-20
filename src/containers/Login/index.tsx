import './style.scss';
import { useEffect, useState } from 'react';
import useRequest from '../../utils/useRequest';
import Modal from '../../components/Modal';

// 1. define the return value of the interface
type ResponseType = {
  name: String;
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passWord, setPassWord] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const {request} = useRequest<ResponseType>('/a.json','GET', {});

  function handleSubmitBtnClick() {
    request().then((data) => {
      console.log(data)
    }).catch((e:any) => {
      setShowModal(true);
      setMessage(e?.message || "unknown error");
    });
  }

  useEffect(() => {
    if (showModal){
      const timer = setTimeout(()=> {
        setShowModal(false);
      },1500)
      return () => {
        clearTimeout(timer);
      }
    }
  }, [showModal])

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
      { showModal ? <Modal>{message}</Modal> : null }

      
    </div>
  )
}

export default Login;