import { useSpring, animated } from '@react-spring/web';
import { fadeInConfig } from '../../configs/animationConfigurations';
import { Link } from 'react-router-dom';

const categoryList = [
  {
    categoryName: 'Dịch vụ spa',
    categoryIcon: (
      <img
        src='/dog-grooming.jpg'
        alt='dich-vu'
        className='mb-6 w-full h-full object-cover mx-auto'
      />
    ),
    categoryPath: '/dich-vu-spa',
  },
  {
    categoryName: 'Dịch vụ khách sạn',
    categoryIcon: (
      <img
        src='/cat-hotel.jpg'
        alt='dich-vu'
        className='mb-6 w-full h-full object-cover mx-auto'
      />
    ),
    categoryPath: '/khach-san-thu-cung',
  },
  {
    categoryName: 'Dịch vụ dắt chó đi dạo',
    categoryIcon: (
      <img
        src='/dog-walking.png'
        alt='dich-vu'
        className='mb-6 w-full h-full object-cover mx-auto'
      />
    ),
    categoryPath: '/dat-cho-di-dao',
  },
];

const ServiceCategoryList = () => {
  const fadeIn = useSpring(fadeInConfig());

  return (
    <div>
      <animated.div style={fadeIn} className='px-32 mb-12 mt-8'>
        <div className='flex justify-between items-center gap-4 relative'>
          {categoryList.map((item, index) => (
            <Link
              to={item.categoryPath}
              key={`service-category-${index}`}
              className='bg-primary-light px-6 py-8 rounded-lg'
            >
              <div className='w-72 h-72 mx-auto'>{item.categoryIcon}</div>
              <h1 className='text-2xl font-semibold text-secondary text-center mt-4'>
                {item.categoryName}
              </h1>
            </Link>
          ))}
        </div>
      </animated.div>
    </div>
  );
};

export default ServiceCategoryList;
