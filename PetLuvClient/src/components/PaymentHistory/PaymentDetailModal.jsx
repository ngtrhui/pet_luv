import { useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClipboardList,
} from 'react-icons/fa';
import { MdOutlinePayments } from 'react-icons/md';
import ActionModal from '../common/ActionModal';
import formatCurrency from '../../utils/formatCurrency';

const PaymentDetailModal = ({ open, onClose, paymentId, payments }) => {
  const payment = useMemo(() => {
    return payments.find((p) => p.paymentId === paymentId) || null;
  }, [paymentId, payments]);

  if (!payment) return null;

  const getStatusStyles = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';

    const statusLower = status.toLowerCase();

    if (
      statusLower.includes('hoàn thành') ||
      statusLower.includes('đã thanh toán')
    ) {
      return 'bg-green-100 text-green-800';
    } else if (statusLower.includes('xử lý') || statusLower.includes('chờ')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (
      statusLower.includes('thất bại') ||
      statusLower.includes('hủy')
    ) {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  const statusName = payment.paymentStatus?.paymentStatusName || 'N/A';
  const statusClass = getStatusStyles(statusName);

  return (
    <ActionModal title='Chi tiết thanh toán' open={open} onClose={onClose}>
      <div className='w-full space-y-6'>
        {/* Payment ID and Status */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4'>
          <div className='flex justify-start items-center gap-2'>
            <p className='text-gray-500 text-sm'>Mã thanh toán:</p>
            <p className='font-semibold text-lg'>{payment.paymentId}</p>
          </div>
          <span
            className={`px-8 py-1 rounded-full font-semibold ${statusClass}`}
          >
            {statusName}
          </span>
        </div>

        {/* Payment Time and Method */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
            <div className='flex items-center gap-3 mb-2'>
              <FaCalendarAlt className='text-primary text-xl' />
              <h3 className='font-semibold text-lg'>Thời gian</h3>
            </div>
            <div className='space-y-2 pl-8'>
              <div>
                <p className='text-gray-500 text-sm'>Thời gian tạo</p>
                <p className='font-medium'>
                  {dayjs(payment.createdAt).isValid()
                    ? dayjs(payment.createdAt).format('DD/MM/YYYY HH:mm')
                    : 'Không có dữ liệu'}
                </p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Thời gian cập nhật</p>
                <p className='font-medium'>
                  {dayjs(payment.updatedTime).isValid()
                    ? dayjs(payment.updatedTime).format('DD/MM/YYYY HH:mm')
                    : 'Không có dữ liệu'}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
            <div className='flex items-center gap-3 mb-2'>
              <MdOutlinePayments className='text-primary text-xl' />
              <h3 className='font-semibold text-lg'>Phương thức thanh toán</h3>
            </div>
            <div className='space-y-2 pl-8'>
              <div>
                <p className='text-gray-500 text-sm'>Phương thức</p>
                <p className='font-medium'>
                  {payment.paymentMethod?.paymentMethodName || 'Không xác định'}
                </p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Mã giao dịch</p>
                <p className='font-medium'>
                  {payment.transactionRef || 'Không có'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
          <div className='flex items-center gap-3 mb-2'>
            <FaMoneyBillWave className='text-primary text-xl' />
            <h3 className='font-semibold text-lg'>Thông tin thanh toán</h3>
          </div>
          <div className='pl-8'>
            <div>
              <p className='text-gray-500 text-sm'>Số tiền</p>
              <p className='font-medium text-lg text-primary'>
                {formatCurrency(payment.amount)}
              </p>
            </div>
            <div className='mt-2'>
              <p className='text-gray-500 text-sm'>Mã đơn hàng</p>
              <p className='font-medium'>{payment.orderId || 'Không có'}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
          <div className='flex items-center gap-3 mb-2'>
            <FaClipboardList className='text-primary text-xl' />
            <h3 className='font-semibold text-lg'>Ghi chú</h3>
          </div>
          <div className='pl-8'>
            <p className='italic'>{payment.note || 'Không có ghi chú'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-4'>
          <button
            onClick={onClose}
            className='px-10 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-full transition-all'
          >
            Đóng
          </button>
        </div>
      </div>
    </ActionModal>
  );
};

PaymentDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  paymentId: PropTypes.string,
  payments: PropTypes.array.isRequired,
};

export default PaymentDetailModal;
