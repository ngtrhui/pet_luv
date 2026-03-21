import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setSelectedType } from '../../redux/slices/bookingTypeSlice';
import { getServices } from '../../redux/thunks/serviceThunk';
import { getRooms } from '../../redux/thunks/roomThunk';
import { getServiceCombos } from '../../redux/thunks/serviceComboThunk';

const ChooseBookingTypeContent = ({ bookingTypes }) => {
  const dispatch = useDispatch();

  const selectedTypeId = useSelector(
    (state) => state.bookingTypes.selectedTypeId
  );

  const handleSelectType = useCallback(
    (e) => {
      dispatch(setSelectedType(e?.currentTarget?.id));
      const selectedTypeName = bookingTypes.find(
        (b) => b.id === e?.currentTarget?.id
      ).label;

      if (
        selectedTypeName.toLowerCase().includes('khách sạn') ||
        selectedTypeName.toLowerCase().includes('phòng')
      ) {
        dispatch(getRooms({ pageIndex: 1, pageSize: 10 }));
      } else {
        dispatch(
          getServices({
            serviceType: selectedTypeName,
            pageIndex: 1,
            pageSize: 10,
          })
        );
        dispatch(getServiceCombos({ pageIndex: 1, pageSize: 10 }));
      }
    },
    [dispatch, bookingTypes]
  );

  return (
    <div className='flex flex-col items-center w-full p-6'>
      <h2 className='text-3xl text-primary font-cute tracking-wide mb-1'>
        Chọn loại dịch vụ
      </h2>
      <p className='text-gray-600 mb-8 italic'>
        Vui lòng chọn một loại dịch vụ phù hợp với nhu cầu của bạn.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl'>
        {bookingTypes?.map((type) => (
          <div
            key={type.id}
            id={type.id}
            className={`p-6 pb-10 border rounded-2xl shadow-lg text-center cursor-pointer transition hover:scale-105 ${
              selectedTypeId === type.id
                ? 'border-primary ring-2 ring-primary'
                : 'border-gray-300'
            }`}
            onClick={handleSelectType}
          >
            <div className='mb-4 flex justify-center'>{type.icon}</div>
            <h3 className='text-xl font-semibold'>{type.label}</h3>
            <p className='text-gray-600 text-sm mt-2 line-clamp-3 text-start'>
              {type.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

ChooseBookingTypeContent.propTypes = {
  bookingTypes: PropTypes.array.isRequired,
};

export default ChooseBookingTypeContent;
