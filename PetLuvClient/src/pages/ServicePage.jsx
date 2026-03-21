import ServiceCategoryList from '../components/ServicePage/ServiceCategoryList';

const ServicePage = () => {
  return (
    <div>
      <img
        src='./services-banner.jpg'
        alt='services-banner'
        className='w-full'
      />
      <div>
        <h1 className='text-3xl font-semibold text-center text-primary mb-2 mt-8'>
          Dịch vụ
        </h1>
        <img
          src='./cute_separator.png'
          alt='cute_separator'
          className='mx-auto'
        />
      </div>

      <ServiceCategoryList />

      <img
        src='./dog-cat-bird.png'
        alt='cute-things'
        className='w-2/3 m-auto'
      />
    </div>
  );
};

export default ServicePage;
