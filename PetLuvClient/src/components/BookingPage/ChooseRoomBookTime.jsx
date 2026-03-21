import PropTypes from 'prop-types';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const ChooseRoomBookTime = ({
  bookingType,
  checkInDate,
  checkOutDate,
  onBookingTypeSelect,
  onCheckInChange,
  onCheckOutChange,
  onConfirm,
  shouldDisableTime,
  openingTime,
  closingTime,
  isLoading,
}) => {
  // Helper function to format time for display
  const formatTimeForDisplay = (date, isDay) => {
    if (!date) return '';

    // For day booking, always show noon time
    if (isDay) {
      // Create a copy of the date with time set to 12:00 PM for display purposes
      const displayDate = dayjs(date).hour(12).minute(0).second(0);
      return displayDate.locale('vi').format('DD MMMM YYYY HH:mm');
    }

    return dayjs(date).locale('vi').format('DD MMMM YYYY HH:mm');
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Chọn Thời Gian Đặt Phòng
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        {/* Hourly Booking Option */}
        <div
          className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            bookingType === 'hour'
              ? 'border-2 border-primary bg-blue-50'
              : 'border-gray-200 hover:border-primary'
          }`}
          onClick={() => onBookingTypeSelect('hour')}
        >
          <div className='flex items-center mb-4'>
            <div
              className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                bookingType === 'hour' ? 'bg-primary' : 'border border-gray-300'
              }`}
            >
              {bookingType === 'hour' && (
                <div className='w-3 h-3 bg-white rounded-full'></div>
              )}
            </div>
            <h3 className='text-xl font-semibold'>Đặt Theo Giờ</h3>
          </div>
          <p className='text-gray-600 mb-2'>Đặt phòng theo giờ</p>
          <ul className='text-left text-sm text-gray-500 list-disc list-inside'>
            <li>
              Có sẵn từ {openingTime} giờ sáng đến {closingTime} giờ chiều
            </li>
            <li>Chỉ chọn giờ đầy đủ</li>
            <li>Thời gian đặt tối thiểu: 1 giờ</li>
          </ul>
        </div>

        {/* Daily Booking Option */}
        <div
          className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            bookingType === 'day'
              ? 'border-2 border-primary bg-blue-50'
              : 'border-gray-200 hover:border-primary'
          }`}
          onClick={() => onBookingTypeSelect('day')}
        >
          <div className='flex items-center mb-4'>
            <div
              className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                bookingType === 'day' ? 'bg-primary' : 'border border-gray-300'
              }`}
            >
              {bookingType === 'day' && (
                <div className='w-3 h-3 bg-white rounded-full'></div>
              )}
            </div>
            <h3 className='text-xl font-semibold'>Đặt Theo Ngày</h3>
          </div>
          <p className='text-gray-600 mb-2'>Đặt phòng theo ngày</p>
          <ul className='text-left text-sm text-gray-500 list-disc list-inside'>
            <li>Giờ nhận phòng: 12 giờ trưa</li>
            <li>Giờ trả phòng: 12 giờ trưa ngày hôm sau</li>
            <li>Thời gian đặt tối thiểu: 1 ngày</li>
          </ul>
        </div>
      </div>

      {bookingType && (
        <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm'>
          <h3 className='text-xl font-semibold mb-6'>
            {bookingType === 'hour'
              ? 'Chi Tiết Đặt Theo Giờ'
              : 'Chi Tiết Đặt Theo Ngày'}
          </h3>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Check-in Date/Time */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  {bookingType === 'day'
                    ? 'Ngày nhận phòng'
                    : 'Thời gian nhận phòng'}
                </label>
                <DateTimePicker
                  value={checkInDate}
                  onChange={(newDate) => {
                    // For day booking, ensure time is set to 12:00 PM
                    if (bookingType === 'day') {
                      const noonDate = dayjs(newDate)
                        .hour(12)
                        .minute(0)
                        .second(0);
                      onCheckInChange(noonDate);
                    } else {
                      onCheckInChange(newDate);
                    }
                  }}
                  className='w-full'
                  disablePast
                  minutesStep={60}
                  shouldDisableTime={
                    bookingType === 'hour' ? shouldDisableTime : undefined
                  }
                  views={
                    bookingType === 'day'
                      ? ['year', 'month', 'day']
                      : ['year', 'month', 'day', 'hours']
                  }
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      fullWidth: true,
                      className: 'bg-white',
                    },
                  }}
                />
                {bookingType === 'day' && (
                  <p className='mt-2 text-sm text-gray-500'>
                    Giờ nhận phòng cố định lúc 12:00
                  </p>
                )}
              </div>

              {/* Check-out Date/Time */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  {bookingType === 'day'
                    ? 'Ngày trả phòng'
                    : 'Thời gian trả phòng'}
                </label>
                <DateTimePicker
                  value={checkOutDate}
                  onChange={(newDate) => {
                    // For day booking, ensure time is set to 12:00 PM
                    if (bookingType === 'day') {
                      const noonDate = dayjs(newDate)
                        .hour(12)
                        .minute(0)
                        .second(0);
                      onCheckOutChange(noonDate);
                    } else {
                      onCheckOutChange(newDate);
                    }
                  }}
                  className='w-full'
                  disablePast
                  minDateTime={checkInDate ? dayjs(checkInDate) : undefined}
                  minutesStep={60}
                  shouldDisableTime={
                    bookingType === 'hour' ? shouldDisableTime : undefined
                  }
                  views={
                    bookingType === 'day'
                      ? ['year', 'month', 'day']
                      : ['year', 'month', 'day', 'hours']
                  }
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      fullWidth: true,
                      className: 'bg-white',
                    },
                  }}
                />
                {bookingType === 'day' && (
                  <p className='mt-2 text-sm text-gray-500'>
                    Giờ trả phòng cố định lúc 12:00
                  </p>
                )}
              </div>
            </div>
          </LocalizationProvider>

          {/* Summary */}
          {checkInDate && checkOutDate && (
            <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
              <h4 className='font-medium text-gray-800 mb-2'>
                Tóm Tắt Đặt Phòng
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-600'>Nhận phòng:</p>
                  <p className='font-medium'>
                    {formatTimeForDisplay(checkInDate, bookingType === 'day')}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Trả phòng:</p>
                  <p className='font-medium'>
                    {formatTimeForDisplay(checkOutDate, bookingType === 'day')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className='mt-6 flex justify-end'>
            <button
              className='px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
              onClick={onConfirm}
              disabled={!checkInDate || !checkOutDate || isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ChooseRoomBookTime.propTypes = {
  // State props
  bookingType: PropTypes.oneOf(['hour', 'day', null]),
  checkInDate: PropTypes.object, // Changed to accept dayjs object
  checkOutDate: PropTypes.object, // Changed to accept dayjs object
  isLoading: PropTypes.bool,

  // Shop configuration
  openingTime: PropTypes.number,
  closingTime: PropTypes.number,

  // Handler functions
  onBookingTypeSelect: PropTypes.func.isRequired,
  onCheckInChange: PropTypes.func.isRequired,
  onCheckOutChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  shouldDisableTime: PropTypes.func,
};

export default ChooseRoomBookTime;
