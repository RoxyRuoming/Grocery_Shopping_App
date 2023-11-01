import 'swiper/css';
import './style.scss';
import type { ResponseType } from './types';
import { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Banner from './components/Banner';
import Categories from './components/Categories';
import Card from './components/Card';

const localLocation = localStorage.getItem('location');
const locationHistory = localLocation ? JSON.parse(localLocation): null;

const defaultRequestData = {
  url: '/home.json',
  method: 'POST',
  data: {
    latitude: locationHistory ? locationHistory.latitude : 37.7304167,
    longitude: locationHistory ? locationHistory.longitude: -122.384425,
  }
}

const Home = () => {
  const [ requestData, setRequestData ] = useState(defaultRequestData);
  const { data } = useRequest<ResponseType>(requestData);

  // get the latitude and longitude
  useEffect(() => {
    if(navigator.geolocation && !locationHistory) {
      console.log('get location');
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        localStorage.setItem('location', JSON.stringify({
          latitude, longitude
        }));
        setRequestData({
          ...defaultRequestData,
          data: { latitude, longitude } 
        });
      }, (error) => {
        console.log(error);
      }, {timeout: 500})
    }
  }, []);
  
  let location, banners, categories, freshes = undefined;
  const dataResult = data?.data;
  if (dataResult) {
    location = dataResult.location;
    banners = dataResult.banners;
    categories = dataResult.categories;
    freshes = dataResult.freshes;
  }

  return (
    <div className='page home-page'>
      <Banner location={location} banners={banners} />
      <Categories categories={categories}/>
      <Card title='New!' list={freshes}/>
      <div className='bottom'>
        - I have a bottom line -
      </div>
      <div className='docker'>
        <div className='docker-item docker-item-active'>
          <p className='iconfont docker-item-icon'>&#xe600;</p>
          <p className='docker-item-title'>Home</p>
        </div>
        <div className='docker-item'>
          <p className='iconfont docker-item-icon'>&#xe60d;</p>
          <p className='docker-item-title'>Classification</p>
        </div>
        <div className='docker-item'>
          <p className='iconfont docker-item-icon'>&#xe6af;</p>
          <p className='docker-item-title'>Cart</p>
        </div>
        <div className='docker-item'>
          <p className='iconfont docker-item-icon'>&#xe660;</p>
          <p className='docker-item-title'>Mine</p>
        </div>
      </div>
    </div>
  )
}

export default Home;