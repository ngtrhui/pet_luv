import { Link } from 'react-router-dom';
import { Carousel } from '../components';
import CategoryList from '../components/HomePage/CategoryList';
import { BiSupport } from 'react-icons/bi';
import ServiceCardList from '../components/common/ServiceCardList';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getServices } from '../redux/thunks/serviceThunk';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const HomePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.services.loading);
  const services = useSelector((state) => state.services.services);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    dispatch(getServices({ pageIndex: 1, pageSize: 10 }));

    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div>
      <Carousel />

      <CategoryList />

      <section className='flex w-full px-6 justify-between items-center gap-2 lg:flex-row md:flex-col mb-16'>
        <Link className='lg:w-[45%] md:w-full hover:opacity-90'>
          <img
            src='./spa-banner.webp'
            alt='Pet Hotel'
            className='rounded-lg object-cover'
          />
        </Link>
        <Link className='lg:w-[45%] md:w-full hover:opacity-90'>
          <img
            src='./hotel-banner.webp'
            alt='Pet Hotel'
            className='rounded-lg object-cover'
          />
        </Link>
      </section>

      <section>
        <h1 className='uppercase text-primary text-3xl text-center font-bold mb-4'>
          Dịch vụ nổi bật tại PetLuv
        </h1>
        <div className='m-8'>
          {loading ? (
            <div className='flex justify-center items-center w-full'>
              <img
                src='./loading-cat.gif'
                alt='loading...'
                className='w-1/4 sm:w-1/3'
              />
            </div>
          ) : (
            <ServiceCardList serviceList={services} />
          )}
        </div>
      </section>

      <LazyLoadImage
        src='./grooming-banner.webp'
        alt='grooming banner'
        className='mb-16 px-32 hover:cursor-pointer'
        height='auto'
        width='100%'
      />

      <section>
        <h1 className='uppercase text-primary text-3xl text-center font-bold mb-4'>
          Dịch vụ gợi ý cho bạn
        </h1>
        <div className='m-8'>
          {loading ? (
            <div className='flex justify-center items-center w-full'>
              <img
                src='./loading-cat.gif'
                alt='loading...'
                className='w-1/4 sm:w-1/3'
              />
            </div>
          ) : (
            <ServiceCardList serviceList={services} />
          )}
        </div>
      </section>

      <section className='relative'>
        <div className='bg-secondary w-1/2 m-auto px-12 py-4 my-8 rounded-lg flex justify-between items-center'>
          <div className='w-1/2'>
            <h2 className='uppercase text-tertiary-light text-4xl mb-8'>
              Đặt lịch ngay hôm nay
            </h2>
            <Link
              to={'/dat-lich'}
              className='bg-primary text-black p-4 rounded-full px-8 hover:bg-primary-dark'
            >
              Đặt ngay!
            </Link>
          </div>
          <img src='cool-dog.png' alt='dog' className='w-1/2' />
        </div>
        <img
          src='./a-half-of-cat-head.png'
          className='absolute left-0 bottom-0 translate-y-8 w-[20rem]'
        />

        <img
          src='./cute-dog-in-right.png'
          className='absolute right-0 bottom-0 translate-y-8 w-[16rem]'
        />
      </section>

      <section className='flex items-center justify-center gap-8 bg-primary text-secondary text-3xl py-10'>
        <BiSupport size={'6rem'} className='text-primary-dark' />
        <h2>
          Hotline hỗ trợ 24/7 của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc
          của bạn |{' '}
          <span className='text-white hover:text-gray-200 hover:cursor-pointer'>
            0916380593
          </span>
        </h2>
      </section>
    </div>
  );
};

export default HomePage;
