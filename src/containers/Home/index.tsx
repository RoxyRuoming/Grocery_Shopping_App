import 'swiper/css';
import './style.scss';
import type { ResponseType } from './types';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useRequest from '../../hooks/useRequest';

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

  const [ page, setPage ] = useState(1);
  return (
    <div className='page home-page'>
      <div className='banner'>
        <h3 className='location'>
          <span className='iconfont'>&#xe67c;</span>
          {data?.data.location.address || ''}
        </h3>
        <div className='search'>
          <span className='iconfont'>
            &#xe64e;
          </span>
          Please input what you want to search for
        </div>
        <div className='swiper-area'>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            // dangerous "any" ? onSlideChange={(e) => setPage(e.activeIndex + 1)}
            onSlideChange={(e: any) => setPage(e.activeIndex + 1)}
          >
            {
              (data?.data.banners || []).map(item => {
                return (
                  <SwiperSlide key={item.id}>
                    <div className='swiper-item'>
                      <img className='swiper-item-img' src={item.url} alt='swiper'/>
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
          <div className='pagination'>{page}/{data?.data.banners.length || 0}</div>
        </div>
      </div>
      <div className='category'>
        {
          (data?.data.categories || []).map((item) => {
            return (
              <div className='category-item' key={item.id}>
                <img
                  className='category-item-img'
                  alt={item.name}
                  src={item.imgUrl}
                />
                <p className='category-item-desc'>{item.name}</p>
              </div>
            )
          })
        }
      </div>
      <div className='card'>
        <h3 className='card-title'>
          <img
            alt='new products'
            className='card-title-img'
            src='http://statics.dell-lee.com/shopping/hot.png'
          />
          New!
          <div className='card-title-more'>More<span className='iconfont'>&#xe613;</span></div>
        </h3>
        <div className='card-content'>
          {
            (data?.data.freshes || []).map((item) => {
              return (
                <div className='card-content-item' key={item.id}>
                  <img
                    alt={item.name}
                    className='card-content-item-img'
                    src={item.imgUrl}
                  />
                  <p className='card-content-item-desc'>{item.name}</p>
                  <div className='card-content-item-price'>
                    <span className='card-content-item-yen'>&yen;</span>
                    {item.price}
                    <div className='iconfont'>&#xe7e0;</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
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