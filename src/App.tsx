import 'normalize.css';
import './styles/base.css';
import './styles/border.css';

import { HashRouter, Routes, Route } from 'react-router-dom';

import Guide from './containers/Guide';
import Login from './containers/Login';


const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Guide />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </HashRouter>
  )
}

      export default App;