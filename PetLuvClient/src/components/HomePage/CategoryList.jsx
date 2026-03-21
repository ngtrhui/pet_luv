import Category from './Category';
import { useSpring, animated } from '@react-spring/web';
import { fadeInConfig } from '../../configs/animationConfigurations';
import CatPawsBackground from '../common/CatPawsBackground';

const categoryList = [
  {
    categoryName: 'Dịch vụ spa',
    categoryDesc:
      'Chúng tối biết cách làm thế nào để thú cưng của bạn trở nên đẳng cấp và cá tính hơn. Với dịch vụ cắt tỉa lông thú cưng chúng tôi sẽ giúp các bé trở thành phiên bản hoàn hảo nhất...',
    categoryIcon: (
      <img src='/grooming-icon.png' alt='dich-vu' className='mb-6 w-20' />
    ),
    categoryPath: 'dich-vu-spa',
  },
  {
    categoryName: 'Dịch vụ khách sạn',
    categoryDesc:
      'Mọi hành động ở PET LUV đều bắt đầu từ sứ mệnh Trao Gửi Yêu Thương. Mọi thú cưng mới khi đến với chúng tôi đều được quan tâm đặc biệt bởi đội ngũ Nhân viên nhiều kinh nghiệm...',
    categoryIcon: (
      <img src='/hotel-icon.png' alt='dich-vu' className='mb-6 w-20' />
    ),
    categoryPath: 'khach-san-thu-cung',
  },
  {
    categoryName: 'Thức ăn chó, mèo',
    categoryDesc:
      'Cùng với hơn 3.000 khách hàng đã luôn tin tưởng, đồng hành, chúng tôi luôn đặt ra những mục tiêu và thử thách mới. PET LUV cung cấp các sản phẩm, phụ kiện rất đa dạng...',
    categoryIcon: (
      <img src='/shop-icon.png' alt='dich-vu' className='mb-6 w-20' />
    ),
    categoryPath: 'thuc-an-cho-meo',
  },
];

const CategoryList = () => {
  const fadeIn = useSpring(fadeInConfig());

  return (
    <animated.div style={fadeIn} className='px-32 mb-12'>
      <h1 className='uppercase text-primary text-3xl text-center font-bold mb-6 z-50'>
        Dịch vụ của PetLuv
      </h1>
      <div className='flex justify-between items-center gap-4 relative'>
        {categoryList.map((item, index) => (
          <Category
            key={`category-${index}`}
            categoryName={item.categoryName}
            categoryDesc={item.categoryDesc}
            categoryIcon={item.categoryIcon}
            categoryPath={item.categoryPath}
          />
        ))}

        <CatPawsBackground />
      </div>
    </animated.div>
  );
};

export default CategoryList;
