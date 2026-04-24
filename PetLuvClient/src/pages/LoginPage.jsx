import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CircularProgress, Divider, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MyAlrt from '../configs/alert/MyAlrt';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../redux/thunks/authThunk';
import { clearError } from '../redux/slices/authSlice';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const credentialsValue = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Không được bỏ trống'),
    password: Yup.string()
      .min(6, 'Mật khẩu ít nhất 8 ký tự')
      .required('Không được bỏ trống'),
  });

  const handleSubmit = async (values) => {
    dispatch(login(values))
      .unwrap()
      .then(() => toast.success('Đăng nhập thành công'))
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || error);
      });
  };

  useEffect(() => {
    if (error) {
      MyAlrt.Error('Lỗi', error, 'Xác nhận', false, 'Đóng', () => {
        dispatch(clearError());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (user !== null && localStorage.getItem('token') !== null) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

      {/* BACKGROUND GLOBAL */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#3b82f6,transparent_40%),radial-gradient(circle_at_70%_70%,#22c55e,transparent_40%)] opacity-30" />

      {/* LEFT - BRANDING */}
      <div className="relative z-10 hidden lg:flex flex-col justify-between text-white p-12">

        <div>
          <h1 className="text-4xl font-bold mb-4">
            PetLuv 🐾
          </h1>
          <p className="text-lg opacity-90">
            Nơi chăm sóc thú cưng toàn diện, tiện lợi và đáng tin cậy.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Chào mừng bạn quay lại!
          </h2>
          <p className="opacity-80">
            Đăng nhập để tiếp tục sử dụng dịch vụ tốt nhất cho thú cưng của bạn.
          </p>
        </div>

        {/* decor */}
        <div className="absolute bottom-0 right-0 opacity-20 text-[10rem]">
          🐶
        </div>
      </div>

      {/* RIGHT - FORM */}
      <div className="relative z-10 flex items-center justify-center px-6 py-10">

        <Stack
          spacing={4}
          className="w-full max-w-md text-white bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >

          <h2 className="text-3xl font-bold text-center">
            Đăng nhập
          </h2>

          <Formik
            initialValues={credentialsValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>

                {/* EMAIL */}
                <div className="mb-4">
                  <label className="block text-sm text-white/80">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 p-4 focus:ring-2 focus:ring-primary outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-300 text-sm mt-1"
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                  <label className="block text-sm text-white/80">
                    Mật khẩu
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 p-4 focus:ring-2 focus:ring-primary outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-300 text-sm mt-1"
                  />
                </div>

                <p className="text-primary text-right hover:underline cursor-pointer">
                  Quên mật khẩu?
                </p>

                {/* BUTTON */}
                <button
                  disabled={loading}
                  type="submit"
                  className={`w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold transition ${loading && 'opacity-70 cursor-not-allowed'
                    }`}
                >
                  {loading ? (
                    <CircularProgress size={'1rem'} color="inherit" />
                  ) : (
                    'Đăng nhập'
                  )}
                </button>

              </Form>
            )}
          </Formik>

          {/* REGISTER */}
          <p className="text-center text-sm text-white/80">
            Bạn chưa có tài khoản?{' '}
            <Link
              to={'/dang-ky'}
              className="text-primary font-medium hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>

          {/* DIVIDER */}
          <Divider>
            <span className="text-white/60 text-sm">
              hoặc đăng nhập với
            </span>
          </Divider>

          {/* SOCIAL */}
          <Stack
            spacing={4}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <FaFacebook
              size={36}
              className="text-white hover:scale-110 transition cursor-pointer"
            />
            <FcGoogle
              size={36}
              className="hover:scale-110 transition cursor-pointer"
            />
          </Stack>

        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
