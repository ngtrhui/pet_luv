import { useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClipboardList,
  FaPaw,
  FaHome,
} from 'react-icons/fa';
import { MdOutlinePayments } from 'react-icons/md';
import ActionModal from '../common/ActionModal';
import formatCurrency from '../../utils/formatCurrency';
import getColorByBookingStatus from '../../utils/getColorByBookingStatus';

// Function to get color by payment status
const getColorByPaymentStatus = (paymentStatusName) => {
  switch (paymentStatusName) {
    case 'Chờ thanh toán':
      return '#FFF4DE'; // Pastel yellow
    case 'Đã đặt cọc':
      return '#E0F7FA'; // Pastel blue
    case 'Đã thanh toán':
      return '#E8F5E9'; // Pastel green
    case 'Thanh toán thất bại':
      return '#FFEBEE'; // Pastel red
    default:
      return '#F5F5F5'; // Light gray for unknown status
  }
};

// Function to get text color by payment status
const getTextColorByPaymentStatus = (paymentStatusName) => {
  switch (paymentStatusName) {
    case 'Chờ thanh toán':
      return '#FF9800'; // Darker yellow/orange
    case 'Đã đặt cọc':
      return '#00ACC1'; // Darker blue
    case 'Đã thanh toán':
      return '#43A047'; // Darker green
    case 'Thanh toán thất bại':
      return '#E53935'; // Darker red
    default:
      return '#757575'; // Gray for unknown status
  }
};

const ViewBookingHistoryDetailModal = ({
  open,
  onClose,
  bookingId,
  bookings,
}) => {
  const booking = useMemo(() => {
    return bookings.find((b) => b.bookingId === bookingId) || null;
  }, [bookingId, bookings]);

  if (!booking) return null;

  const statusColor = getColorByBookingStatus(
    booking?.bookingStatus?.bookingStatusName
  );

  const paymentStatusColor = getColorByPaymentStatus(booking.paymentStatusName);
  const paymentStatusTextColor = getTextColorByPaymentStatus(
    booking.paymentStatusName
  );

  return (
    <ActionModal title='Chi tiết lịch hẹn' open={open} onClose={onClose}>
      <div className='w-full space-y-6'>
        {/* Booking ID and Status */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4'>
          <div className='flex justify-start items-center gap-2'>
            <p className='text-gray-500 text-sm'>Mã lịch hẹn:</p>
            <p className='font-semibold text-lg'>{booking.bookingId}</p>
          </div>
          <span
            style={{ backgroundColor: statusColor }}
            className='px-8 py-1 rounded-full font-semibold'
          >
            {booking.bookingStatus?.bookingStatusName}
          </span>
        </div>

        {/* Booking Time and Type */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
            <div className='flex items-center gap-3 mb-2'>
              <FaCalendarAlt className='text-primary text-xl' />
              <h3 className='font-semibold text-lg'>Thời gian</h3>
            </div>
            <div className='space-y-2 pl-8'>
              <div>
                <p className='text-gray-500 text-sm'>Bắt đầu</p>
                <p className='font-medium'>
                  {dayjs(booking.bookingStartTime).format('DD/MM/YYYY HH:mm')}
                </p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Kết thúc</p>
                <p className='font-medium'>
                  {dayjs(booking.bookingEndTime).format('DD/MM/YYYY HH:mm')}
                </p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Thời gian ước tính</p>
                <p className='font-medium'>{booking.totalEstimateTime} giờ</p>
              </div>
            </div>
          </div>

          <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
            <div className='flex items-center gap-3 mb-2'>
              <FaClipboardList className='text-primary text-xl' />
              <h3 className='font-semibold text-lg'>Loại đặt lịch</h3>
            </div>
            <div className='space-y-2 pl-8'>
              <div>
                <p className='text-gray-500 text-sm'>Loại</p>
                <p className='font-medium'>
                  {booking.bookingType?.bookingTypeName}
                </p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Mô tả</p>
                <p className='font-medium text-sm'>
                  {booking.bookingType?.bookingTypeDesc || 'Không có mô tả'}
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
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pl-8'>
            <div>
              <p className='text-gray-500 text-sm'>Tổng tiền</p>
              <p className='font-medium text-lg text-primary'>
                {formatCurrency(booking.totalAmount)}
              </p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Đặt cọc</p>
              <p className='font-medium'>
                {formatCurrency(booking.depositAmount)}
              </p>
            </div>
            <div>
              <p className='text-gray-500 text-sm mb-1'>
                Trạng thái thanh toán
              </p>
              <div className='flex items-center gap-2'>
                <span
                  style={{
                    backgroundColor: paymentStatusColor,
                    color: paymentStatusTextColor,
                  }}
                  className='px-3 py-1 rounded-full font-medium text-sm flex items-center gap-2'
                >
                  <MdOutlinePayments />
                  {booking.paymentStatusName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        {booking.serviceBookingDetails &&
          booking.serviceBookingDetails.length > 0 && (
            <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
              <div className='flex items-center gap-3 mb-4'>
                <FaPaw className='text-primary text-xl' />
                <h3 className='font-semibold text-lg'>Dịch vụ đã đặt</h3>
              </div>
              <div className='pl-8 space-y-4'>
                {booking.serviceBookingDetails.map((service, index) => (
                  <div key={index} className='border-b pb-3 last:border-b-0'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <p className='font-medium'>
                          {service.serviceItemName || `Dịch vụ ${index + 1}`}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Cân nặng: {service.petWeightRange}
                        </p>
                      </div>
                      <p className='font-semibold text-primary'>
                        {formatCurrency(service.bookingItemPrice)}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Room Booking Details */}
        {booking.roomBookingItem && (
          <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
            <div className='flex items-center gap-3 mb-2'>
              <FaHome className='text-primary text-xl' />
              <h3 className='font-semibold text-lg'>Thông tin phòng</h3>
            </div>
            <div className='pl-8'>
              <p className='text-gray-500 text-sm'>Thời gian thuê phòng</p>
              <p className='font-medium'>
                {booking.roomRentalTime || 'Không có'}
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className='bg-tertiary-light rounded-xl p-4 shadow-sm'>
          <div className='flex items-center gap-3 mb-2'>
            <FaClipboardList className='text-primary text-xl' />
            <h3 className='font-semibold text-lg'>Ghi chú</h3>
          </div>
          <div className='pl-8'>
            <p className='italic'>
              {booking.bookingNote || 'Không có ghi chú'}
            </p>
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

ViewBookingHistoryDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bookingId: PropTypes.string,
  bookings: PropTypes.array.isRequired,
};

export default ViewBookingHistoryDetailModal;
