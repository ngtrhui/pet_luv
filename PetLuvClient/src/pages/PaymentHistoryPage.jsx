import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { FaSearch, FaEye } from 'react-icons/fa';
import formatCurrency from '../utils/formatCurrency';
import { useDispatch } from 'react-redux';
import { getPaymentHistories } from '../redux/thunks/paymentThunk';
import { toast } from 'react-toastify';
import PaymentDetailModal from '../components/PaymentHistory/PaymentDetailModal';

const PaymentHistoryPage = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const userId = useMemo(() => user?.userId, [user]);

  const payments = useSelector((state) => state.payments.payments);
  const loading = useSelector((state) => state.payments.loading);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPayments = useMemo(
    () =>
      payments.filter((payment) =>
        payment.transactionRef?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [payments, searchTerm]
  );

  const handleViewDetails = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPaymentId(null);
  };

  const getStatusStyles = useCallback((status) => {
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
    } else if (statusLower.includes('cọc')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  }, []);

  const columns = useMemo(() => {
    return [
      {
        field: 'createdAt',
        headerName: 'Thời gian thanh toán',
        headerAlign: 'center',
        align: 'center',
        width: 180,
        valueFormatter: (params) => {
          console.log(params);
          return dayjs(params).format('DD/MM/YYYY');
        },
      },
      {
        field: 'transactionRef',
        headerName: 'Mã tham chiếu',
        headerAlign: 'center',
        align: 'center',
        width: 180,
      },
      {
        field: 'paymentMethod',
        headerName: 'Phương thức thanh toán',
        headerAlign: 'center',
        align: 'center',
        width: 230,
        valueGetter: (params) => {
          return params?.paymentMethodName || 'N/A';
        },
      },
      {
        field: 'amount',
        headerName: 'Số tiền',
        headerAlign: 'center',
        align: 'right',
        width: 180,
        valueFormatter: (params) => {
          return formatCurrency(params);
        },
      },
      {
        field: 'paymentStatus',
        headerName: 'Trạng thái',
        headerAlign: 'center',
        align: 'center',
        width: 180,
        renderCell: (params) => {
          const statusName =
            params?.row?.paymentStatus?.paymentStatusName || 'N/A';
          return (
            <span
              className={`px-6 py-2 m-auto rounded-full text-xs font-semibold text-center ${getStatusStyles(
                statusName
              )}`}
            >
              {statusName}
            </span>
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Thao tác',
        width: 100,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
          <button
            onClick={() => handleViewDetails(params.row.paymentId)}
            className='text-blue-500 hover:text-blue-600 transition-colors mt-3'
            title='Xem chi tiết'
          >
            <FaEye size={'1.5rem'} />
          </button>
        ),
      },
    ];
  }, [getStatusStyles]);

  useEffect(() => {
    dispatch(getPaymentHistories(userId))
      .unwrap()
      .then()
      .catch((error) => {
        console.log(error);
        toast.error(
          error.message || error || 'Có lỗi xảy ra, vui lòng thử lại sau!'
        );
      });
  }, [dispatch, userId]);

  return (
    <div className='h-full w-full p-6'>
      <h1 className='text-3xl font-cute tracking-wider mb-6 text-primary'>
        Lịch Sử Thanh Toán
      </h1>

      <div className='mb-6 relative bg-white p-6 rounded-xl shadow-sm'>
        <div className='absolute inset-y-0 left-0 pl-9 flex items-center pointer-events-none'>
          <FaSearch className='text-tertiary-dark' />
        </div>
        <input
          type='text'
          placeholder='Tìm kiếm theo mã tham chiếu'
          className='pl-10 pr-4 py-3 border border-tertiary-dark rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className='bg-white rounded-lg shadow-md h-[calc(100vh-250px)] w-full overflow-hidden'>
        <DataGrid
          rows={filteredPayments}
          columns={columns}
          getRowId={(row) => row.paymentId}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
          loading={loading}
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f1f5f9',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#efefef',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f79400',
              color: 'white',
            },
          }}
        />
      </div>
      <PaymentDetailModal
        open={isDetailModalOpen}
        onClose={handleCloseModal}
        paymentId={selectedPaymentId}
        payments={payments}
      />
    </div>
  );
};

export default PaymentHistoryPage;
