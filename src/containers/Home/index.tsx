import 'swiper/css';
import './style.scss';
import { useState } from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';

const Home = () => {
  const [ page, setPage ] = useState(1);
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
            onSlideChange={(e:any) => setPage(e.activeIndex + 1)}
          >
            <SwiperSlide>
              <div className='swiper-item'>
                <img className='swiper-item-img' src={require('../../images/tomato.png')} alt='carousel'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-item'>
                <img className='swiper-item-img' src={require('../../images/lemon.png')} alt='carousel'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-item'>
                <img className='swiper-item-img' src={require('../../images/salad.png')} alt='轮carousel'/>
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