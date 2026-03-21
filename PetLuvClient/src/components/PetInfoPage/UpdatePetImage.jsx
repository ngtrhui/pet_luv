import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ActionModal from '../common/ActionModal';
import ActionImage from '../common/ActionImage';
import { FiUploadCloud } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deletePetImages } from '../../redux/thunks/petThunk';
import { toast } from 'react-toastify';

const UpdatePetImage = ({ open, images, onSave, onClose }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [innerImages, setInnerImages] = useState(images || []);
  const [uploadedImage, setUploadedImage] = useState([]);

  const loading = useSelector((state) => state.pets.loading);
  const pet = useSelector((state) => state.pets.pet);

  // Handle file input change
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImage(files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setInnerImages((prev) => [...prev, ...newImages]);
  };

  // Delete image by index
  const handleDeleteImage = (index) => {
    setInnerImages((prev) => prev.filter((_, i) => i !== index));
    dispatch(
      deletePetImages({ petId: pet?.petId, imagePath: innerImages[index] })
    )
      .unwrap()
      .then(() => toast.success('Xóa ảnh thú cưng thành công'))
      .catch((e) => {
        console.log(e);
        toast.error(e);
      });
  };

  const handleSaveImage = () => {
    onSave(uploadedImage);
    onClose();
  };

  return (
    <ActionModal title='Update Pet Images' open={open} onClose={onClose}>
      <div className='grid grid-cols-4 gap-2'>
        {innerImages?.map((imgSrc, index) => (
          <ActionImage
            key={index}
            src={imgSrc}
            index={index}
            onDelete={handleDeleteImage}
          />
        ))}

        <button
          onClick={() => fileInputRef.current.click()}
          className='flex flex-col items-center justify-center gap-2 max-h-full rounded-xl h-full px-8 
            border-[3px] border-primary hover:border-secondary hover:bg-primary-light hover:text-white'
        >
          <input
            type='file'
            multiple
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageUpload}
            className='hidden'
          />
          <FiUploadCloud size={'2rem'} />
          Add Images
        </button>
      </div>
      <div className='flex justify-end items-center gap-4 ms-auto'>
        <button
          onClick={handleSaveImage}
          disabled={loading}
          className='px-12 py-3 rounded-lg text-white bg-primary cursor-pointer hover:bg-primary-dark'
        >
          {loading ? <CircularProgress size={'1.5rem'} /> : 'Lưu'}
        </button>
        <button
          onClick={onClose}
          className='px-12 py-3 rounded-lg bg-tertiary-light cursor-pointer hover:bg-tertiary-dark'
        >
          Hủy
        </button>
      </div>
    </ActionModal>
  );
};

UpdatePetImage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UpdatePetImage;
