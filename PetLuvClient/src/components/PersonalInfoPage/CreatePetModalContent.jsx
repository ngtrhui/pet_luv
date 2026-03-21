import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ActionModal from '../common/ActionModal';
import { useSelector } from 'react-redux';
import PetInfoForm from '../PetInfoPage/PetInfoForm';

const CreatePetModal = ({ open, onClose, onSubmit }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageReview, setImageReview] = useState([]);

  // Handle File Upload
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageObjects = files.map((file, index) => ({
      index,
      file,
      reviewUrl: URL.createObjectURL(file),
    }));
    setSelectedFiles(imageObjects.map((item) => item.file));
    setImageReview(imageObjects.map((file) => file.reviewUrl));
  };

  const handleDeleteUploadedImage = useCallback((index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImageReview((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // pet breed
  const breedOptions = useSelector((state) => state.petBreeds.petBreeds);

  return (
    <ActionModal title='Thêm thú cưng vào BST' open={open} onClose={onClose}>
      <PetInfoForm
        breedOptions={breedOptions}
        imageReview={imageReview}
        selectedFiles={selectedFiles}
        handleFileChange={handleFileChange}
        handleDeleteUploadedImage={handleDeleteUploadedImage}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </ActionModal>
  );
};

CreatePetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreatePetModal;
