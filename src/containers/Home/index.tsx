import 'swiper/css';
import './style.scss';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useRequest from '../../hooks/useRequest';

import { message } from '../../utils/message';

const localLocation = localStorage.getItem('location');
const locationHistory = localLocation  ? JSON.parse(localLocation) : null;

// default request data
const defaultRequestedData = {
  url: '/home.json',
  method: 'POST',
  data: {
    latitude: locationHistory ? locationHistory.latitude:37.7304167,
    longitude: locationHistory ? locationHistory.longitude:-122.384425,
  }
}

const Home = () => {
  const [requestData, setRequestData] = useState(defaultRequestedData);
  const {request} = useRequest(requestData);


  useEffect(() => {
    request().then((data) => {
      console.log(data);
    }).catch(e => {
      message(e?.message); // default timeout is 1500s
    })
  }, [requestData, request])

  useEffect(() => {
    if (navigator.geolocation && !localLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        localStorage.setItem('location', JSON.stringify({
          latitude, longitude 
        }));
        // console.log(latitude, longitude);
        setRequestData({
          ...defaultRequestedData,
          data: { latitude, longitude }
        })
      }, (error) => {
        console.log(error);
      }, { timeout: 3000 })
    }
  }, []);

  const [page, setPage] = useState(1);
  return (
    <div className='page home-page'>
      <div className='banner'>
        <h3 className='location'>
          <span className='iconfont'>&#xe67c;</span>
          Organic Fruits (Seattle)
        </h3>
        <div className='search'>
          <span className='iconfont'>
            &#xe64e;
          </span>
          Search for what you want
        </div>
        <div className='swiper-area'>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(e: any) => setPage(e.activeIndex + 1)}
          >
            <SwiperSlide>
              <div className='swiper-item'>
                <img className='swiper-item-img' src={require('../../images/tomato.png')} alt='carousel' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-item'>
                <img className='swiper-item-img' src={require('../../images/lemon.png')} alt='carousel' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-item'>
                <img className='swiper-item-img' src={require('../../images/salad.png')} alt='轮carousel' />
              </div>
            </SwiperSlide>
          </Swiper>
          <div className='pagination'>{page}/2</div>
        </div>
      </div>
    </div>
  )
}

export default Home;