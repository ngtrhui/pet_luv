import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { MdDelete } from 'react-icons/md';

const ActionImage = ({ src, alt = 'Image', onDelete, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='relative w-48 h-48 rounded-lg shadow-lg cursor-pointer hover:scale-125 hover:z-50'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        className='w-full h-full object-cover transition-all rounded-lg'
      />

      {isHovered && (
        <div className='absolute top-2 right-2 flex space-x-2'>
          <IconButton onClick={() => onDelete(index)} color='error'>
            <MdDelete size={20} color='error' />
          </IconButton>
        </div>
      )}
    </div>
  );
};

ActionImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number,
};

export default ActionImage;
