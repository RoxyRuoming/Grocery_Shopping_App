import { useEffect, useRef } from 'react';
import './styles/app.css';

const App = () => {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    ref.current.style.opacity = '1';
  }, [])

  return (
    <div ref={ref} className="page guide-page">
      <img
        alt="欢乐购"
        className="main-pic"
        src={require('./images/halg_logo_icon_@2x.png')}
      />
      <p className='title'>欢乐购</p>
      <img
        alt="欢乐购"
        className="sub-pic"
        src={require('./images/slogn_word_icon_@2x.png')}
      />
      <div className="iconfont arrow-icon">&#xe60c;</div>
    </div>
  )
}

export default App;