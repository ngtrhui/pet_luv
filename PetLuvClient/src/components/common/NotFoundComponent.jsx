import PropTypes from 'prop-types';

const NotFoundComponent = ({ name }) => {
  return (
    <div className='w-full py-4 flex justify-center items-center my-8'>
      <h1 className='text-2xl text-primary font-cute tracking-wider '>
        Không tìm thấy {name} nào!!!
      </h1>
    </div>
  );
};

NotFoundComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NotFoundComponent;
