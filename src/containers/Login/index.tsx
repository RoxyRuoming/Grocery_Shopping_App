import './style.css';

const Login = () => {
  return (
    <div className="page login-page">
      <div className="tab">
        <div className='tab-item tab-item-left'>Log In</div>
        <div className='tab-item tab-item-right'>Register</div>
      </div>
      <div className="form">
        <div className='form-item'>
          <div className='form-item-title'>Phone</div>
          <input className='form-item-content' placeholder='Please input your phone number'/>
        </div>
        <div className='form-item'>
          <div className='form-item-title'>Password</div>
          <input type="password" className='form-item-content' placeholder='please input your password'/>
        </div>
      </div>
      <div className="submit">
        Log In
      </div>
      <p className="notice">
        *Pravacy Policy
      </p>
    </div>
  )
}

export default Login;