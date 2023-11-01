import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BannersType, LocationType } from '../types';
import { useNavigate } from 'react-router-dom';

type BannerPropsType = {
    location: LocationType | undefined;
    banners: BannersType | undefined;
}

const Banner = (props: BannerPropsType) => {
    const [page, setPage] = useState(1);
    const { location, banners } = props
    const navigate = useNavigate();

    function handleLocationClick() {
        navigate('/nearby')
    }

    return (
        <div className='banner'>
            <h3 className='location' onClick={handleLocationClick}>
                <span className='iconfont'>&#xe650;</span>
                {location?.address || ''}
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
                        (banners || []).map(item => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <div className='swiper-item'>
                                        <img className='swiper-item-img' src={item.imgUrl} alt='swiper' />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <div className='pagination'>{page}/{banners?.length || 0}</div>
            </div>
        </div>
    )

}

export default Banner;