import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Switch,
  Stack,
  TextField,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../redux/thunks/userThunk';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Họ tên không được để trống'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
  gender: Yup.string()
    .oneOf(['true', 'false'], 'Giới tính phải là true hoặc false')
    .required('Giới tính không được để trống'),
  dateOfBirth: Yup.date().nullable(),
  address: Yup.string().required('Địa chỉ không được để trống'),
});

const dateFormat = 'dd/MM/yyyy';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const { userId } = user || { userId: '' };

  const initialDate = useMemo(
    () => (user?.dateOfBirth ? parseISO(user?.dateOfBirth) : null),
    [user?.dateOfBirth]
  );

  const initialUserValues = {
    avatar: user?.avatar,
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    gender: user?.gender || '',
    dateOfBirth: initialDate,
    address: user?.address || '',
  };

  const [editMode, setEditMode] = useState(false);

  const [formValues, setFormValues] = useState(initialUserValues);
  const [avatarPreview, setAvatarPreview] = useState(
    `${initialUserValues?.avatar}`
  );
  const [errors, setErrors] = useState({});

  const handleToggleEdit = () => {
    setEditMode((prev) => !prev);
    if (!editMode) {
      setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    setFormValues((prev) => ({
      ...prev,
      avatar: file,
    }));

    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Handler cập nhật thông tin người dùng
  const handleUpdate = () => {
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then((validData) => {
        setErrors({});
        const payload = {
          ...validData,
          dateOfBirth: validData.dateOfBirth
            ? format(validData.dateOfBirth, 'dd/MM/yyyy')
            : null,
        };
        dispatch(updateUserInfo({ userId, payload }));
        toast.success('Cập nhật thông tin người dùng thành công');
        setEditMode(false);
      })
      .catch((validationError) => {
        const errorObj = {};
        validationError.inner.forEach((err) => {
          errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      });
  };

  // Hàm helper trả về style cho InputLabel nếu giá trị đã thay đổi
  const getLabelSx = (fieldName) => ({
    color:
      formValues[fieldName] !== initialUserValues[fieldName]
        ? 'green'
        : 'text.primary',
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Box sx={{ px: 3 }}>
      <Stack spacing={3}>
        {/* Header: Avatar và Toggle */}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={avatarPreview}
                alt={formValues?.fullName}
                sx={{ width: '8rem', height: '8rem' }}
              />
              {editMode && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(14,24,38,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    borderRadius: '50%',
                    transition: 'opacity 0.3s',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <label htmlFor='avatar-upload' style={{ cursor: 'pointer' }}>
                    <img
                      src='/camera_icon.png'
                      alt='Change Avatar'
                      className='w-1/3 mx-auto opacity-50'
                    />
                  </label>
                </Box>
              )}
            </Box>
            <input
              id='avatar-upload'
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </Box>
          <FormControlLabel
            control={<Switch checked={editMode} onChange={handleToggleEdit} />}
            label={editMode ? 'Sửa' : 'Xem'}
          />
        </Stack>

        {/* Các ô input hiển thị thông tin người dùng theo dạng stack */}
        <TextField
          fullWidth
          label='Họ tên'
          name='fullName'
          value={formValues.fullName}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('fullName') }}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName}
        />
        <TextField
          fullWidth
          label='Email'
          name='email'
          value={formValues.email}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('email') }}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label='Số điện thoại'
          name='phoneNumber'
          value={formValues.phoneNumber}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('phoneNumber') }}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
        />
        <TextField
          fullWidth
          select
          label='Giới tính'
          name='gender'
          value={formValues.gender}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          SelectProps={{ native: true }}
          InputLabelProps={{ sx: getLabelSx('gender') }}
          error={Boolean(errors.gender)}
          helperText={errors.gender}
        >
          <option value=''>Chọn giới tính</option>
          <option value='true'>Nam</option>
          <option value='false'>Nữ</option>
        </TextField>

        <DatePicker
          label='Ngày sinh'
          value={formValues.dateOfBirth ? formValues.dateOfBirth : null}
          onChange={(newValue) =>
            setFormValues({
              ...formValues,
              dateOfBirth: newValue ? format(newValue, dateFormat) : null,
            })
          }
          disabled={!editMode}
          // format='dd/MM/yyyy'
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              InputLabelProps={{ sx: getLabelSx('dateOfBirth') }}
              error={Boolean(errors.dateOfBirth)}
              helperText={errors.dateOfBirth}
            />
          )}
        />
        <TextField
          fullWidth
          label='Địa chỉ'
          name='address'
          value={formValues.address}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('address') }}
          error={Boolean(errors.address)}
          helperText={errors.address}
        />

        {/* Nút cập nhật */}
        <Button
          disabled={!editMode}
          variant='contained'
          color='primary'
          onClick={handleUpdate}
          fullWidth
          sx={{ py: 2, borderRadius: 2, color: 'white' }}
          className={`${loading && 'hover:cursor-not-allowed bg-primary-dark'}`}
        >
          {loading ? (
            <CircularProgress size={'1rem'} color='primary' />
          ) : (
            'Cập nhật'
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default PersonalInfo;
