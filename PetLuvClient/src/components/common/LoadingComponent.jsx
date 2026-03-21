const LoadingComponent = () => {
  return (
    <div className='flex justify-center items-center w-full my-6'>
      <img
        src='/loading-cat.gif'
        alt='Loading...'
        className='lg:w-1/2 md:w-1/3'
      />
    </div>
  );
};

export default LoadingComponent;
