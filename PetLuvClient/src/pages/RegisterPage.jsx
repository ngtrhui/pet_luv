import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Divider, Stack } from '@mui/material';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { register } from '../redux/thunks/authThunk';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  // Initial values cho form đăng ký
  const initialValues = {
    // Thông tin người dùng:
    fullName: '',
    gender: '', // sẽ chọn "male" hoặc "female"
    dateOfBirth: '', // dạng yyyy-mm-dd
    phoneNumber: '',
    address: '',
    avatar: null, // file

    // Thông tin đăng nhập:
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Xác thực form bằng Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Tên không được bỏ trống'),
    gender: Yup.string()
      .oneOf(['true', 'false'], 'Chọn giới tính')
      .required('Giới tính không được bỏ trống'),
    dateOfBirth: Yup.date().nullable(), // không bắt buộc
    phoneNumber: Yup.string().required('Số điện thoại không được bỏ trống'),
    address: Yup.string().nullable(),
    avatar: Yup.mixed().nullable(),

    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không được bỏ trống'),
    password: Yup.string()
      .min(8, 'Mật khẩu ít nhất 8 ký tự')
      .required('Mật khẩu không được bỏ trống'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Xác nhận mật khẩu không được bỏ trống'),
  });

  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    // Tạo một FormData để gửi kèm file (avatar) nếu có
    const formData = new FormData();
    formData.append('FullName', values.fullName);
    formData.append('Gender', values.gender);
    formData.append('DateOfBirth', values.dateOfBirth);
    formData.append('PhoneNumber', values.phoneNumber);
    formData.append('Address', values.address);
    if (values.avatar) {
      formData.append('Avatar', values.avatar);
    }
    formData.append('Email', values.email);
    formData.append('Password', values.password);
    // Gọi API đăng ký
    dispatch(register(formData))
      .unwrap()
      .then(() => {
        toast.success('Đăng ký thành công!');
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Hàm xử lý chọn file avatar
  const handleAvatarChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue('avatar', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <Stack
        spacing={4}
        className='bg-white p-6 rounded-lg shadow-md max-w-4xl w-full'
      >
        <h2 className='text-3xl font-bold text-center'>Đăng ký</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div>
                    <label
                      htmlFor='fullName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Họ và tên
                    </label>
                    <Field
                      type='text'
                      name='fullName'
                      id='fullName'
                      className='mt-1 block w-full rounded-md border border-gray-300 p-2'
                    />
                    <ErrorMessage
                      name='fullName'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='gender'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Giới tính
                    </label>
                    <Field
                      as='select'
                      name='gender'
                      id='gender'
                      className='mt-1 block w-full rounded-md border border-gray-300 p-2'
                    >
                      <option value=''>Chọn giới tính</option>
                      <option value='true'>Nam</option>
                      <option value='false'>Nữ</option>
                    </Field>
                    <ErrorMessage
                      name='gender'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='dateOfBirth'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Ngày sinh
                    </label>
                    <Field
                      type='date'
                      name='dateOfBirth'
                      id='dateOfBirth'
                      className='mt-1 block w-full rounded-md border border-gray-300 p-2'
                    />
                    <ErrorMessage
                      name='dateOfBirth'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phoneNumber'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Số điện thoại
                    </label>
                    <Field
                      type='text'
                      name='phoneNumber'
                      id='phoneNumber'
                      className='mt-1 block w-full rounded-md border border-gray-300 p-2'
                    />
                    <ErrorMessage
                      name='phoneNumber'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Địa chỉ
                    </label>
                    <Field
                      type='text'
                      name='address'
                      id='address'
                      className='mt-1 block w-full rounded-md border border-gray-300 p-2'
                    />
                    <ErrorMessage
                      name='address'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email
                    </label>
                    <Field
                      type='email'
                      name='email'
                      id='email'
                      className='mt-1 block w-full rounded-md border border-gray-300 p-2'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Mật khẩu
                    </label>
                    <Field
                      type='password'
                      name='password'
                      id='password'
                      className='mt-1 block w-full rounded-md border border-gray-300 p-2'
                    />
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='confirmPassword'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Xác nhận mật khẩu
                    </label>
                    <Field
                      type='password'
                      name='confirmPassword'
                      id='confirmPassword'
                      className='mt-1 block w-full rounded-md border border-gray-300 p-2'
                    />
                    <ErrorMessage
                      name='confirmPassword'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Avatar
                    </label>
                    <div className='mt-1 flex flex-col items-center'>
                      <div className='w-28 h-28 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center'>
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt='Avatar Preview'
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <img src='/logo.png' alt='Placeholder Image' />
                        )}
                      </div>
                      <input
                        id='avatar'
                        name='avatar'
                        type='file'
                        accept='image/*'
                        onChange={(e) => handleAvatarChange(e, setFieldValue)}
                        className='mt-2 hidden'
                      />
                      <label
                        htmlFor='avatar'
                        className='cursor-pointer mt-2 inline-block bg-primary hover:bg-primary-dark text-white py-1 px-3 rounded'
                      >
                        Tải ảnh lên
                      </label>
                      <ErrorMessage
                        name='avatar'
                        component='div'
                        className='text-red-500 text-sm mt-1'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-10'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded'
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Divider>
          <span className='text-tertiary-dark'>hoặc đăng nhập với</span>
        </Divider>
        <Stack
          spacing={4}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <FaFacebook
            color='blue'
            size={35}
            className='hover:cursor-pointer hover:opacity-85'
          />
          <FcGoogle
            size={35}
            className='hover:cursor-pointer hover:opacity-85'
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default RegisterPage;
