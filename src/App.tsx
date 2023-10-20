import 'normalize.css';
import './styles/base.css';
import './styles/border.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';

import Guide from './containers/Guide';
import Login from './containers/Account/login';
import Register from './containers/Account/register';
import Account from './containers/Account';

// json-style router
const Router = createHashRouter([{
  path: '/',
  element: <Guide />
}, {
  path: '/account',
  element: <Account />,
  children: [{
    path: '/account/login',
    element: <Login />
  }, {
    path: '/account/register',
    element: <Register />
  }]
}, {
  path: '/login',
  element: <Login />
}, {
  path: '/register',
  element: <Register />
}])

const App = () => {
  return (
    <RouterProvider router={Router} />
  )
}

export default App;