import { useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import './style.scss';

const Guide = () => {
  // handle the animation logic
  const ref = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    ref.current.style.opacity = '1';
  }, [])

  // handle the click/navigation logic
  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate('./account/login');
  };

  return (
    <div ref={ref} className="page guide-page">
      <img
        alt="a green box with carrots"
        className="main-pic"
        src={require('../../images/halg_logo_icon_@2x.png')}
      />
      <p className='title'>Happy Shopping</p>
      <img
        alt="a text saying the shop is amazing"
        className="sub-pic"
        src={require('../../images/farm.png')}
      />
      <div className="iconfont arrow-icon"
      onClick={handleIconClick}
      >&#xe60c;</div>
    </div>
  )
}

export default Guide;