import { useEffect, useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FaEye, FaPlus, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import formatCurrency from '../utils/formatCurrency';
import getColorByBookingStatus from '../utils/getColorByBookingStatus';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getBookingHistory } from '../redux/thunks/bookingThunk';
import { toast } from 'react-toastify';
import ViewBookingHistoryDetailModal from '../components/BookingHistoryPage/ViewBookingHistoryDetailModal';

const BookingHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const userId = useMemo(() => user?.userId, [user]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingTypeFilter, setBookingTypeFilter] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const bookings = useSelector((state) => state.bookings.bookings);
  const bookingLoading = useSelector((state) => state.bookings.loading);
  const bookingError = useSelector((state) => state.bookings.error);

  const bookingTypes = useSelector((state) => state.bookingTypes.bookingTypes);

  const handleViewBookingDetail = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBookingId(null);
  };

  const columns = [
    {
      field: 'bookingStartTime',
      headerName: 'Bắt đầu',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      valueFormatter: (params) => dayjs(params).format('DD/MM/YYYY'),
    },
    {
      field: 'bookingEndTime',
      headerName: 'Kết thúc',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      valueFormatter: (params) => dayjs(params).format('DD/MM/YYYY'),
    },
    {
      field: 'totalAmount',
      headerName: 'Tổng tiền (đ)',
      headerAlign: 'center',
      align: 'right',
      flex: 1,
      valueFormatter: (params) => formatCurrency(params.value || params),
    },
    {
      field: 'bookingType',
      headerName: 'Loại đặt lịch',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      valueFormatter: (params) => params?.bookingTypeName || 'N/A',
    },
    {
      field: 'bookingStatusName',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        const colorCode = getColorByBookingStatus(
          params?.value?.bookingStatusName ||
            params?.bookingStatusName ||
            params?.row?.bookingStatus?.bookingStatusName
        );
        return (
          <span
            style={{ backgroundColor: colorCode }}
            className='px-8 py-2 rounded-full font-semibold'
          >
            {params?.value || params?.row?.bookingStatus?.bookingStatusName}
          </span>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Hành động',
      headerAlign: 'center',
      align: 'center',
      flex: 0.75,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() => handleViewBookingDetail(params.row.bookingId)}
          className='text-blue-500 hover:text-blue-700'
          title='Xem chi tiết'
        >
          <FaEye size={'1.5rem'} />
        </button>
      ),
    },
  ];

  // Filtered bookings (mock logic)
  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const bookingDate = dayjs(booking.bookingStartTime);
        const isInDateRange =
          (!startDate ||
            bookingDate.isAfter(startDate) ||
            bookingDate.isSame(startDate)) &&
          (!endDate ||
            bookingDate.isBefore(endDate) ||
            bookingDate.isSame(endDate));
        const isTypeMatch = bookingTypeFilter
          ? booking?.bookingType?.bookingTypeId === bookingTypeFilter
          : true;
        return isInDateRange && isTypeMatch;
      }),
    [bookingTypeFilter, bookings, endDate, startDate]
  );

  const handleChangeBookingTypeFilter = (e) => {
    setBookingTypeFilter(e.target.value);
  };

  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setBookingTypeFilter('');
  };

  useEffect(() => {
    dispatch(getBookingHistory(userId));

    if (bookingError) {
      toast.error(bookingError);
    }
  }, [dispatch, bookingError, userId]);

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-cute tracking-wider text-primary'>
          Lịch sử đặt lịch
        </h2>
        <button
          onClick={() => navigate('/dat-lich')}
          className='flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-16 py-3 rounded-full transition-all'
        >
          <FaPlus /> Đặt lịch hẹn
        </button>
      </div>

      <div className='flex items-center justify-between gap-4'>
        <div className='me-2'>
          <h2 className='text-xl font-semibold'>Bộ lọc:</h2>
          <span className='whitespace-nowrap font-light italic text-gray-400'>
            (Bạn có thể lọc theo thời gian hoặc theo loại)
          </span>
        </div>
        <div className='grid md:grid-cols-3 gap-4'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Từ ngày'
              value={startDate}
              format='DD/MM/YYYY'
              onChange={(date) => setStartDate(date)}
              className='w-full'
              slotProps={{ textField: { fullWidth: true } }}
            />
            <DatePicker
              label='Đến ngày'
              value={endDate}
              format='DD/MM/YYYY'
              onChange={(date) => setEndDate(date)}
              className='w-full'
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>

          <select
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
            value={bookingTypeFilter}
            placeholder='Lọc theo loại'
            onChange={handleChangeBookingTypeFilter}
          >
            <option value=''>Tất cả loại</option>
            {Array.isArray(bookingTypes) &&
              bookingTypes.length > 0 &&
              bookingTypes.map((item) => (
                <option key={item?.bookingTypesId} value={item?.bookingTypeId}>
                  {item?.bookingTypeName}
                </option>
              ))}
          </select>
        </div>
        <FaUndo
          size={'2rem'}
          className='cursor-pointer text-primary hover:text-primary-dark'
          onClick={handleResetFilter}
          title='Đặt lại bộ lọc'
        />
      </div>

      <div className='h-[500px]'>
        {bookingLoading ? (
          <Skeleton height={40} count={10} />
        ) : (
          <DataGrid
            rows={filteredBookings}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row.bookingId}
            className='bg-white rounded-xl shadow'
            sx={{
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#efefef',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f79400',
                color: 'white',
              },
            }}
          />
        )}
      </div>

      {/* Booking Detail Modal */}
      <ViewBookingHistoryDetailModal
        open={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        bookingId={selectedBookingId}
        bookings={bookings}
      />
    </div>
  );
};

export default BookingHistoryPage;
