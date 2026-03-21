import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = () => {
  return (
    <div className='md:h-[32rem] md:w-full'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={'fade'}
        loop={true}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className='max-h-full'
      >
        <SwiperSlide>
          <img alt='slider' src='./slider-1.webp' className='min-w-full' />
        </SwiperSlide>
        <SwiperSlide>
          <img alt='slider' src='./slider-2.webp' className='min-w-full' />
        </SwiperSlide>
        <SwiperSlide>
          <img alt='slider' src='./slider-3.webp' className='min-w-full' />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
