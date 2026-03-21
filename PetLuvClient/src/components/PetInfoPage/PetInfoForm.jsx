import PropTypes from 'prop-types';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import { CloudUpload } from 'lucide-react';
import * as Yup from 'yup';
import ActionImage from '../common/ActionImage';
import clsx from 'clsx';
import dayjs from 'dayjs';

const validationSchema = Yup.object({
  petName: Yup.string().required('Không được để trống trường này'),
  petDateOfBirth: Yup.date()
    .nullable()
    .required('Không được để trống trường này'),
  petGender: Yup.boolean().required('Không được để trống trường này'),
  petFurColor: Yup.string().required('Không được để trống trường này'),
  petWeight: Yup.number()
    .positive('Cân nặng phải > 0')
    .required('Không được để trống trường này'),
  petDesc: Yup.string(),
  petFamilyRole: Yup.string().nullable(),
  breedId: Yup.string().required('Không được để trống trường này'),
});

const defaultInitialValues = {
  petName: '',
  petDateOfBirth: null,
  petGender: '',
  petFurColor: '',
  petWeight: '',
  petDesc: '',
  petFamilyRole: '',
  breedId: '',
  isVisible: true,
};

const PetInfoForm = ({
  initialValues,
  breedOptions,
  imageReview,
  selectedFiles,
  handleFileChange,
  handleDeleteUploadedImage,
  onSubmit,
  onClose,
  isReadOnly = false,
}) => {
  const mergedInitialValues = {
    ...defaultInitialValues,
    ...initialValues,
    petDateOfBirth: initialValues?.petDateOfBirth
      ? dayjs(initialValues.petDateOfBirth)
      : null,
  };

  const formik = useFormik({
    initialValues: {
      ...mergedInitialValues,
      petDateOfBirth: mergedInitialValues?.petDateOfBirth
        ? mergedInitialValues.petDateOfBirth
        : null,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, imageFiles: selectedFiles });
      onClose?.();
    },
    enableReinitialize: true,
  });

  // Compare current value with initial value to detect changes
  const isFieldEdited = (fieldName) => {
    const initial = formik.initialValues[fieldName];
    const current = formik.values[fieldName];
    return JSON.stringify(initial) !== JSON.stringify(current);
  };

  const getFieldClass = (fieldName) =>
    clsx({
      'border-yellow-500 border-2': isFieldEdited(fieldName) && !isReadOnly,
      'bg-gray-100 pointer-events-none': isReadOnly,
    });

  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-4 m-4'>
      {/* Pet Name */}
      <TextField
        fullWidth
        label='Tên boss của bạn là gì?'
        name='petName'
        className={getFieldClass('petName')}
        value={formik.values.petName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isReadOnly}
        error={formik.touched.petName && Boolean(formik.errors.petName)}
        helperText={formik.touched.petName && formik.errors.petName}
      />

      {/* Date of Birth */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Hãy cho chúng tôi biết ngày sinh thú cưng của bạn nhé'
          className={`w-full ${getFieldClass('petDateOfBirth')}`}
          //   format='DD/MM/YYYY'
          value={formik.values.petDateOfBirth}
          onChange={(date) =>
            !isReadOnly && formik.setFieldValue('petDateOfBirth', date)
          }
          readOnly={isReadOnly}
          slotProps={{
            textField: {
              fullWidth: true,
              error:
                formik.touched.petDateOfBirth &&
                Boolean(formik.errors.petDateOfBirth),
              helperText:
                formik.touched.petDateOfBirth && formik.errors.petDateOfBirth,
              className: getFieldClass('petDateOfBirth'),
            },
          }}
        />
      </LocalizationProvider>

      {/* Pet Gender */}
      <FormControl fullWidth className={getFieldClass('petGender')}>
        <InputLabel>Boss của bạn là đực hay cái nào?</InputLabel>
        <Select
          name='petGender'
          label='Boss của bạn là đực hay cái nào?'
          value={formik.values.petGender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isReadOnly}
          error={formik.touched.petGender && Boolean(formik.errors.petGender)}
        >
          <MenuItem value={true}>Đực</MenuItem>
          <MenuItem value={false}>Cái</MenuItem>
        </Select>
      </FormControl>

      {/* Fur Color */}
      <TextField
        fullWidth
        label='Thú cưng của bạn có lông màu gì nhỉ'
        name='petFurColor'
        className={getFieldClass('petFurColor')}
        value={formik.values.petFurColor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isReadOnly}
        error={formik.touched.petFurColor && Boolean(formik.errors.petFurColor)}
        helperText={formik.touched.petFurColor && formik.errors.petFurColor}
      />

      {/* Weight */}
      <TextField
        fullWidth
        label='Cân nặng là bao nhiêu?'
        name='petWeight'
        type='number'
        className={getFieldClass('petWeight')}
        InputProps={{
          endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
        }}
        value={formik.values.petWeight}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onWheel={(e) => e.target.blur()}
        disabled={isReadOnly}
        error={formik.touched.petWeight && Boolean(formik.errors.petWeight)}
        helperText={formik.touched.petWeight && formik.errors.petWeight}
      />

      {/* Description */}
      <TextField
        fullWidth
        label='Nói một chút về thú cưng của bạn nhé'
        name='petDesc'
        multiline
        rows={3}
        className={getFieldClass('petDesc')}
        value={formik.values.petDesc}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isReadOnly}
      />

      {/* Breed Selection */}
      <FormControl fullWidth className={getFieldClass('breedId')}>
        <InputLabel id='breed-selection-label'>
          Boss của bạn thuộc giống gì nhỉ? Nếu không rõ bạn có thể tham khảo
          thông qua hình ảnh nhé
        </InputLabel>
        <Select
          name='breedId'
          labelId='breed-selection-label'
          value={formik.values.breedId}
          onChange={(e) =>
            !isReadOnly && formik.setFieldValue('breedId', e.target.value)
          }
          onBlur={formik.handleBlur}
          disabled={isReadOnly}
          error={formik.touched.breedId && Boolean(formik.errors.breedId)}
        >
          {breedOptions?.map((breed) => (
            <Tooltip
              key={breed?.breedId}
              value={breed?.breedId}
              title={breed.breedDesc}
            >
              <MenuItem value={breed?.breedId}>
                <img
                  src={`${breed?.illustrationImage}`}
                  alt={breed?.breedName}
                  className='w-12 h-12 object-contain me-2 rounded-md'
                />
                {breed?.breedName}
              </MenuItem>
            </Tooltip>
          ))}
        </Select>
      </FormControl>

      {/* File Upload */}
      {!isReadOnly && handleFileChange && (
        <div className='space-y-2'>
          <label className='block font-medium'>Thêm ảnh cho thú cưng</label>
          <div className='relative w-full py-10 rounded-lg my-4 border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer bg-gray-50'>
            <input
              type='file'
              multiple
              onChange={handleFileChange}
              className='absolute inset-0 opacity-0 cursor-pointer'
            />
            <div className='flex flex-col items-center justify-center text-gray-500'>
              <CloudUpload />
              <p>Click vào để thêm ảnh</p>
            </div>
          </div>
        </div>
      )}
      {imageReview?.length > 0 && (
        <>
          <p className='text-sm text-gray-600'>
            Đã thêm {imageReview?.length} ảnh
          </p>
          <div className='grid grid-cols-4 gap-2'>
            {imageReview.map((item, index) => (
              <ActionImage
                src={item}
                key={`pet-img-key-${index}`}
                alt={`ảnh thú cưng ${index}`}
                onDelete={isReadOnly ? null : handleDeleteUploadedImage}
                index={index}
              />
            ))}
          </div>
        </>
      )}

      {/* Submit / Cancel */}
      {!isReadOnly && (
        <div className='flex items-center justify-end gap-4'>
          {onClose && (
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 rounded-lg px-16 py-3 cursor-pointer hover:bg-gray-400'
            >
              Hủy
            </button>
          )}
          {onSubmit && (
            <button
              type='submit'
              className='bg-primary text-white rounded-lg px-16 py-3 cursor-pointer hover:bg-primary-dark'
            >
              Lưu
            </button>
          )}
        </div>
      )}
    </form>
  );
};

PetInfoForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  breedOptions: PropTypes.array.isRequired,
  imageReview: PropTypes.array,
  selectedFiles: PropTypes.array,
  handleFileChange: PropTypes.func,
  handleDeleteUploadedImage: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

export default PetInfoForm;
