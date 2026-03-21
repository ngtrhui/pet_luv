import PropTypes from 'prop-types';

const BigSizeIcon = ({ icon, content, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='w-4/5 mx-auto my-8 p-6 ring-2 rounded-lg 
        flex justify-start items-center gap-2
        ring-primary-light bg-tertiary-light text-secondary 
        cursor-pointer hover:bg-secondary-light hover:ring-4'
    >
      {icon}
      <h1 className='lg:text-lg md:text-sm font-cute tracking-wide'>
        {content}
      </h1>
    </div>
  );
};

BigSizeIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BigSizeIcon;
