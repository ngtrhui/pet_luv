import PropTypes from 'prop-types';

const CatPawsBackground = ({ size }) => {
  return (
    <div>
      <img
        src='cat-paw.png'
        className={`absolute left-[-6rem] bottom-[-2rem] -rotate-45 ${
          size === 'small' ? 'w-12' : size === 'medium' ? 'w-36' : 'w-48'
        } z-0`}
      />

      <img
        src='cat-paw.png'
        className={`absolute left-[4rem] top-[-6rem] rotate-[-20deg] ${
          size === 'small' ? 'w-12' : size === 'medium' ? 'w-36' : 'w-48'
        } z-0`}
      />

      <img
        src='cat-paw.png'
        className={`absolute left-[22rem] top-[-3rem] rotate-[-30deg] ${
          size === 'small' ? 'w-12' : size === 'medium' ? 'w-36' : 'w-48'
        } z-0`}
      />

      <img
        src='cat-paw.png'
        className={`absolute right-[16rem] top-[-10rem] rotate-[-40deg] ${
          size === 'small' ? 'w-12' : size === 'medium' ? 'w-36' : 'w-48'
        } z-0`}
      />

      <img
        src='cat-paw.png'
        className={`absolute right-[20rem] bottom-[-2rem] rotate-[-40deg] ${
          size === 'small' ? 'w-12' : size === 'medium' ? 'w-36' : 'w-48'
        } z-0`}
      />

      <img
        src='cat-paw.png'
        className={`absolute right-[-5rem] bottom-[6rem] rotate-[-40deg] ${
          size === 'small' ? 'w-12' : size === 'medium' ? 'w-36' : 'w-48'
        } z-0`}
      />
    </div>
  );
};

CatPawsBackground.propTypes = {
  size: PropTypes.string,
};

export default CatPawsBackground;
