import PropTypes from 'prop-types';
import formatCurrency from '../../utils/formatCurrency';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setSelectedService,
  setSelectedVariant as setSelectedVariantRedux,
} from '../../redux/slices/serviceSlice';
import { useSelector } from 'react-redux';
import { setSelectedType } from '../../redux/slices/bookingTypeSlice';

const ServiceInfo = ({ service }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [selectedVariant, setSelectedVariant] = useState({
    serviceId: '',
    breedId: '',
    petWeightRange: '',
  });

  const bookingTypes = useSelector((state) => state.bookingTypes.bookingTypes);

  const onSelectVariant = ({ breedId, petWeightRange }) => {
    setSelectedVariant({ serviceId, breedId, petWeightRange });
    dispatch(setSelectedVariantRedux({ breedId, petWeightRange }));
  };

  const handleClickBook = () => {
    const { serviceId, breedId, petWeightRange } = selectedVariant;

    const queryParams = new URLSearchParams({
      dichVu: serviceId,
      loai: breedId,
      canNang: petWeightRange,
    });

    dispatch(setSelectedService(service));

    navigate(`/dat-lich?${queryParams}`);
  };

  useEffect(() => {
    if (pathname.includes('spa')) {
      const bookingTypeId = bookingTypes.find((type) =>
        type.bookingTypeName.includes('chăm sóc')
      ).bookingTypeId;

      dispatch(setSelectedType(bookingTypeId));
    }

    if (pathname.includes('dat-cho')) {
      const bookingTypeId = bookingTypes.find((type) =>
        type.bookingTypeName.includes('dắt chó')
      ).bookingTypeId;
      console.log(
        bookingTypes.find((type) => type.bookingTypeName.includes('dắt chó'))
          .bookingTypeId
      );
      dispatch(setSelectedType(bookingTypeId));
    }
  }, [bookingTypes, dispatch, pathname]);

  return (
    <div className='flex flex-col h-full'>
      <div className='mb-6'>
        <h1 className='text-4xl font-bold text-primary'>
          {service?.serviceName}
        </h1>
        <p className='mt-4 text-lg line-clamp-4'>{service?.serviceDesc}</p>
        {service?.serviceTypeName && (
          <div className='mt-4'>
            <span className='inline-block bg-secondary-light text-white px-4 py-2 rounded-full text-sm font-semibold'>
              {service.serviceTypeName}
            </span>
          </div>
        )}
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-tertiary mb-4'>Giá dịch vụ</h2>
        {service?.serviceVariants && service.serviceVariants.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {service.serviceVariants.map((variant, index) => (
              <div
                key={index}
                className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 relative z-50 hover:cursor-pointer hover:scale-105 ${
                  selectedVariant.breedId === variant.breedId &&
                  selectedVariant.petWeightRange === variant.petWeightRange &&
                  'border-primary-light border-[3px]'
                }`}
                onClick={() => onSelectVariant(variant)}
              >
                <h2 className='font-bold text-lg text-secondary-light flex items-center gap-2 mb-4 overflow-hidden'>
                  <span className='truncate flex-1'>{variant?.breedName}</span>
                  <span className='whitespace-nowrap flex-shrink-0'>
                    {variant?.petWeightRange}
                  </span>
                </h2>
                <p className='font-bold text-2xl text-primary-light'>
                  <span className='font-bold text-lg text-secondary'>
                    Giá:{' '}
                  </span>{' '}
                  {formatCurrency(variant.price)}
                </p>
                {selectedVariant.breedId === variant.breedId &&
                  selectedVariant.petWeightRange === variant.petWeightRange && (
                    <img
                      src='/cat-paw.png'
                      alt='cat-paw'
                      className='w-16 absolute right-0 top-0 -z-50 -rotate-45'
                    />
                  )}
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>Không có biến thể nào.</p>
        )}
      </div>

      <div className='mt-auto'>
        <button
          onClick={handleClickBook}
          className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors'
        >
          Đặt lịch ngay
        </button>
      </div>
    </div>
  );
};

ServiceInfo.propTypes = {
  service: PropTypes.shape({
    serviceName: PropTypes.string.isRequired,
    serviceDesc: PropTypes.string.isRequired,
    serviceTypeName: PropTypes.string,
    serviceVariants: PropTypes.arrayOf(
      PropTypes.shape({
        variantName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default ServiceInfo;
