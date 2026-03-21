import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FaRegEdit } from 'react-icons/fa';

const ImageGallery = ({ imageUrls, onAddButtonClicked, addButtonContent }) => {
  const [selectedImage, setSelectedImage] = useState(imageUrls[0] || '');

  useEffect(() => {
    Array.isArray(imageUrls) &&
      imageUrls.length !== 0 &&
      setSelectedImage(imageUrls[0]);
  }, [imageUrls]);

  const handleChangeImage = (e) => {
    setSelectedImage(e.target.src);
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full h-96 rounded-lg overflow-hidden shadow-lg'>
        <img
          src={selectedImage || '/no-image.png'}
          alt={selectedImage || '/no-image.png'}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='mt-4 grid grid-cols-3 gap-2'>
        {imageUrls.map((url, index) => (
          <button
            key={index}
            name={url}
            onClick={handleChangeImage}
            className='focus:outline-none'
          >
            <img
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className={`w-full h-24 object-cover rounded ${
                selectedImage === url ? 'ring-4 ring-primary' : ''
              }`}
            />
          </button>
        ))}
        {onAddButtonClicked && (
          <button
            key={'add-btn'}
            className='flex flex-col items-center justify-center gap-2 border-[3px] bg-tertiary-light border-primary rounded-2xl hover:bg-primary hover:text-white hover:border-secondary'
            onClick={onAddButtonClicked}
          >
            <FaRegEdit size={'2rem'} />
            <p className='text-[0.8rem] font-semibold'>
              {addButtonContent || 'Cập nhật danh sách ảnh'}
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddButtonClicked: PropTypes.arrayOf(PropTypes.func),
  addButtonContent: PropTypes.arrayOf(PropTypes.string),
};

export default ImageGallery;
