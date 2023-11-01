import './style.scss';
import useRequest from '../../hooks/useRequest';
import { ResponseType } from './types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const localLocation = localStorage.getItem('location');
const locationHistory = localLocation ? JSON.parse(localLocation): null;

const defaultRequestData = {
  url: '/nearby.json',
  method: 'POST',
  data: {
    latitude: locationHistory ? locationHistory.latitude : 37.7304167,
    longitude: locationHistory ? locationHistory.longitude: -122.384425,
  }
}

const Nearby = () => {
  const { data } = useRequest<ResponseType>(defaultRequestData);
  const navigate = useNavigate();

  const [ keyword, setKeyword ] = useState('');

  const list = (data?.data || []).filter(
    item => { return item.name.indexOf(keyword) > -1 }
  );

  function handleItemClick(latitude: string, longitude: string) {
    localStorage.setItem('location', JSON.stringify({
      latitude, longitude
    }));
    navigate('/home');
  }

  return (
    <div className="page nearby-page">
      <div className='title'>
        <div className='iconfont title-icon'>&#xe601;</div>Shop Transfer
      </div>
      <div className='search'>
        <div className='search-icon iconfont'>&#xe64e;</div>
        <input
          className='search-input'
          placeholder='please input the address'
          value={keyword}
          onChange={(e)=>{ setKeyword(e.target.value)}}
        />
      </div>
      <div className='subtitle'>transfer shop</div>
       <ul className='list'>
        {
          list.map(item => {
            return (
              <li
                className='list-item'
                key={item.id}
                onClick= {() => { handleItemClick(item.latitude, item.longitude)}}
              >
                <div className='list-item-left'>
                  <div className='list-item-title'>{item.name}</div>
                  <p className='list-item-desc'>Tel: {item.phone}</p>
                  <p className='list-item-desc'>{item.adderss}</p>
                </div>
                <div className='list-item-right'>
                  <span className='iconfont list-item-distance'>&#xe650;</span>{item.distance}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Nearby;