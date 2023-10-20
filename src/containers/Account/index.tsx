import './style.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Account = () => {
  const location = useLocation();
  const isLoginActivated = location.pathname === '/account/login';
  const loginActiveClass = isLoginActivated? 'tab-item-active' : '';
  const registerActiveClass = !isLoginActivated? 'tab-item-active': '';

  return (
    <div className="page account-page">
      <div className="tab">
        <div className={`tab-item tab-item-left ${loginActiveClass}`}>
          <Link to='/account/login'>Log In</Link>
        </div>
        <div className={`tab-item tab-item-right ${registerActiveClass}`}>
          <Link to='/account/register'>Register</Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Account;