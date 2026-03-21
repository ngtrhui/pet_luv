import { Link, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { IpnAction } from '../redux/thunks/paymentThunk';

const BookingSuccessPage = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const dispatch = useDispatch();

  const responseCode = params.get('vnp_ResponseCode');
  const amount = params.get('vnp_Amount');
  const payDate = params.get('vnp_PayDate');
  const txnRef = params.get('vnp_TxnRef');

  const formattedAmount = amount
    ? (parseInt(amount) / 100).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })
    : 'N/A';

  const formattedDate = payDate
    ? dayjs(payDate, 'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm:ss')
    : 'N/A';

  const isSuccess = responseCode === '00';

  useEffect(() => {
    dispatch(IpnAction(params.toString()));
  }, [dispatch, params]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <div className='bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-lg'>
        {isSuccess ? (
          <>
            <CheckCircle className='text-green-500 w-16 h-16 mx-auto' />
            <h1 className='text-2xl font-bold text-green-600 mt-4'>
              Thanh toán thành công!
            </h1>
            <p className='text-gray-600 mt-2'>
              Lịch hẹn của bạn đã được xác nhận.
            </p>
          </>
        ) : (
          <>
            <XCircle className='text-red-500 w-16 h-16 mx-auto' />
            <h1 className='text-2xl font-bold text-red-600 mt-4'>
              Thanh toán thất bại!
            </h1>
            <p className='text-gray-600 mt-2'>
              Có lỗi xảy ra trong quá trình thanh toán.
            </p>
          </>
        )}

        <div className='mt-6 space-y-2 text-gray-700 text-left'>
          <p>
            <strong>Số tiền:</strong> {formattedAmount}
          </p>
          <p>
            <strong>Thời gian thanh toán:</strong> {formattedDate}
          </p>
          <p>
            <strong>Mã giao dịch:</strong> {txnRef || 'N/A'}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-6'>
          <Link
            to='/trang-ca-nhan/lich-hen'
            className='mt-6 bg-primary text-white px-6 py-4 rounded-full text-sm hover:bg-primary-light transition'
          >
            Xem thông tin lịch hẹn
          </Link>
          <Link
            to='/trang-ca-nhan/lich-su-thanh-toan'
            className='mt-6 bg-secondary text-white px-6 py-4 rounded-full text-sm hover:bg-secondary-light transition'
          >
            Xem lịch sử thanh toán
          </Link>
        </div>

        <button
          onClick={() => (window.location.href = '/')}
          className='mt-6 bg-gray-500 text-white px-6 py-4 rounded-full text-sm hover:bg-gray-600 transition'
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};
export default BookingSuccessPage;
