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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />

      {/* GRADIENT LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#3b82f6,transparent_40%),radial-gradient(circle_at_70%_70%,#22c55e,transparent_40%)] opacity-30" />

      {/* FORM */}
      <div className="relative z-10 w-full max-w-5xl p-8">

        <Stack
          spacing={6}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >

          {/* HEADER */}
          <div>
            <h2 className="text-3xl font-bold text-white text-center">
              Tạo tài khoản
            </h2>

            {/* FAKE PROGRESS */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-white mb-2">
                <span>Thông tin</span>
                <span>Tài khoản</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-r from-primary to-secondary" />
              </div>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>

                <div className="grid md:grid-cols-2 gap-10">

                  {/* STEP 1 */}
                  <div className="space-y-6">
                    <h3 className="text-white text-lg font-semibold">
                      Thông tin cá nhân
                    </h3>

                    <div className="group">
                      <Field
                        name="fullName"
                        placeholder="Họ và tên"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-primary outline-none transition"
                      />
                      <ErrorMessage name="fullName" component="div" className="text-red-400 text-sm mt-1" />
                    </div>

                    <Field
                      as="select"
                      name="gender"
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="true" className="text-black">Nam</option>
                      <option value="false" className="text-black">Nữ</option>
                    </Field>

                    <Field
                      type="date"
                      name="dateOfBirth"
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
                    />

                    <Field
                      name="phoneNumber"
                      placeholder="Số điện thoại"
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50"
                    />

                    <Field
                      name="address"
                      placeholder="Địa chỉ"
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50"
                    />
                  </div>

                  {/* STEP 2 */}
                  <div className="space-y-6">
                    <h3 className="text-white text-lg font-semibold">
                      Thông tin tài khoản
                    </h3>

                    <Field
                      name="email"
                      placeholder="Email"
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50"
                    />

                    <Field
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50"
                    />

                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50"
                    />

                    {/* AVATAR */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20">
                        {avatarPreview ? (
                          <img src={avatarPreview} className="w-full h-full object-cover" />
                        ) : (
                          <img src="/logo.png" />
                        )}
                      </div>

                      <div>
                        <input
                          id="avatar"
                          type="file"
                          className="hidden"
                          onChange={(e) => handleAvatarChange(e, setFieldValue)}
                        />
                        <label
                          htmlFor="avatar"
                          className="cursor-pointer px-4 py-2 bg-white text-black rounded-lg"
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                  </div>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-[1.02] transition"
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Tạo tài khoản'}
                </button>

              </Form>
            )}
          </Formik>

          {/* SOCIAL */}
          <Divider>
            <span className="text-white">hoặc</span>
          </Divider>

          <Stack direction="row" justifyContent="center" spacing={4}>
            <FaFacebook className="text-white hover:scale-110 cursor-pointer" size={36} />
            <FcGoogle className="hover:scale-110 cursor-pointer" size={36} />
          </Stack>

        </Stack>
      </div>
    </div>
  );
};

export default RegisterPage;
