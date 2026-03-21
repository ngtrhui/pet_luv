import PropTypes from 'prop-types';
import { FaCloudUploadAlt } from 'react-icons/fa';

const RenderUploadField = ({ label, onChange, id }) => (
  <div>
    <label htmlFor={id} className='block font-medium mb-2'>
      {label}
    </label>
    <label
      htmlFor={id}
      className='flex flex-col items-center justify-center w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition'
    >
      <FaCloudUploadAlt className='text-4xl text-gray-500 mb-2' />
      <span className='text-sm text-gray-500'>Click to upload</span>
    </label>
    <input
      id={id}
      type='file'
      accept='image/*'
      className='hidden'
      onChange={onChange}
    />
  </div>
);

RenderUploadField.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.any.isRequired,
};

export default RenderUploadField;
