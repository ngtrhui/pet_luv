import { CircularProgress, Paper, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { resetPassword } from '../../redux/thunks/authThunk';
import { useEffect } from 'react';
import MyAlrt from '../../configs/alert/MyAlrt';
import { clearError } from '../../redux/slices/authSlice';
import PasswordField from '../common/PassWordField';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .min(8, 'Mật khẩu ít nhất 8 ký tự')
    .required('Không được bỏ trống'),
  newPassword: Yup.string()
    .min(8, 'Mật khẩu ít nhất 8 ký tự')
    .required('Không được bỏ trống')
    .notOneOf([Yup.ref('oldPassword')], 'Mật khẩu mới phải khác mật khẩu cũ'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
    .required('Không được bỏ trống'),
});

const Privilege = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      MyAlrt.Error('Lỗi', error, 'Xác nhận', false, 'Đóng', () => {
        dispatch(clearError());

        if (
          error.toLowerCase().includes('token') ||
          error.toLowerCase().includes('phiên')
        ) {
          navigate('/dang-nhap');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(resetPassword(values))
      .unwrap()
      .then(() => {
        toast.success('Đổi mật khẩu thành công. Vui lòng đăng nhập lại');
        resetForm();
        localStorage.removeItem('token');
        navigate('/dang-nhap');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Paper elevation={3} className='py-8'>
      <Stack spacing={6}>
        <h1 className='text-3xl text-primary text-center font-cute tracking-wider mb-4'>
          Cập nhật mật khẩu
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form className='px-6 relative'>
              <Stack spacing={4}>
                <PasswordField
                  name='oldPassword'
                  label='Mật khẩu cũ'
                  value={values.oldPassword}
                  onChange={handleChange}
                  error={touched.oldPassword && Boolean(errors.oldPassword)}
                  helperText={touched.oldPassword && errors.oldPassword}
                />
                <PasswordField
                  name='newPassword'
                  label='Mật khẩu mới'
                  value={values.newPassword}
                  onChange={handleChange}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                />
                <PasswordField
                  name='confirmPassword'
                  label='Xác nhận mật khẩu'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <button
                  disabled={loading}
                  type='submit'
                  className={`w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 mt-4 rounded-md ${
                    loading && 'hover:cursor-not-allowed bg-primary-dark'
                  }`}
                >
                  {loading ? (
                    <CircularProgress size={'1rem'} color='secondary' />
                  ) : (
                    'Cập nhật'
                  )}
                </button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Paper>
  );
};

export default Privilege;
