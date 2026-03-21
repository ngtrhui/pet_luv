import PropTypes from 'prop-types';
import formatCurrency from '../../utils/formatCurrency';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPaw, FaMoneyBillWave, FaWeightHanging } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';

const ServiceComboInfo = ({ serviceCombo }) => {
  const { serviceComboId } = useParams();

  const [selectedVariant, setSelectedVariant] = useState({
    serviceComboId: '',
    breedId: '',
    weightRange: '',
  });

  const onSelectVariant = ({ breedId, weightRange }) => {
    setSelectedVariant({ serviceComboId, breedId, weightRange });
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-xl shadow-lg p-6 mx-auto'>
      <div className='mb-6 border-b pb-4'>
        <div className='flex items-center gap-2'>
          <MdPets className='text-primary text-3xl' />
          <h1 className='text-4xl font-bold text-primary'>
            {serviceCombo?.serviceComboName}
          </h1>
        </div>
        <div className='mt-4 bg-gray-50 p-4 rounded-lg border-l-4 border-primary'>
          <p className='text-lg text-gray-700 line-clamp-4'>
            {serviceCombo?.serviceComboDesc}
          </p>
        </div>
      </div>

      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-4'>
          <FaMoneyBillWave className='text-tertiary text-xl' />
          <h2 className='text-2xl font-bold text-tertiary'>Giá combo</h2>
        </div>

        {serviceCombo?.comboVariants &&
        serviceCombo.comboVariants.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {serviceCombo.comboVariants.map((variant, index) => (
              <div
                key={index}
                className={`bg-white shadow-md rounded-lg p-4 border-2 relative z-50 hover:cursor-pointer 
                  transition-all duration-300 hover:shadow-xl ${
                    selectedVariant.breedId === variant.breedId &&
                    selectedVariant.petWeightRange === variant.weightRange
                      ? 'border-primary scale-105'
                      : 'border-gray-200 hover:border-primary-light'
                  }`}
                onClick={() => onSelectVariant(variant)}
              >
                <div className='flex flex-col h-full'>
                  <div className='flex items-center gap-2 mb-2'>
                    <FaPaw className='text-secondary' />
                    <h2 className='font-bold text-lg text-secondary'>
                      {variant.breedName}
                    </h2>
                  </div>

                  <div className='flex items-center gap-2 mb-3'>
                    <FaWeightHanging className='text-secondary' />
                    <h3 className='font-bold text-lg text-secondary'>
                      <span className='text-gray-600 font-normal'>
                        Trọng lượng:{' '}
                      </span>
                      {variant?.weightRange}
                    </h3>
                  </div>

                  <div className='mt-auto'>
                    <p className='text-xl font-bold text-primary'>
                      {formatCurrency(variant.comboPrice)}
                    </p>
                  </div>
                </div>

                {selectedVariant.breedId === variant.breedId &&
                  selectedVariant.weightRange === variant.weightRange && (
                    <div className='absolute -top-3 -right-3 bg-primary text-white rounded-full p-2 shadow-lg'>
                      <FaPaw className='animate-pulse' />
                    </div>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <div className='bg-gray-50 p-6 rounded-lg text-center'>
            <p className='text-gray-500 italic'>Không có biến thể nào.</p>
          </div>
        )}
      </div>

      <div className='mt-auto'>
        <button className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300'>
          <FaPaw className='text-white' />
          Đặt lịch ngay
        </button>
        <p className='text-center text-gray-500 text-sm mt-2'>
          Đặt lịch ngay để nhận ưu đãi đặc biệt
        </p>
      </div>
    </div>
  );
};

ServiceComboInfo.propTypes = {
  serviceCombo: PropTypes.shape({
    serviceComboName: PropTypes.string.isRequired,
    serviceComboDesc: PropTypes.string.isRequired,
    serviceTypeName: PropTypes.string,
    comboVariants: PropTypes.arrayOf(
      PropTypes.shape({
        variantName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default ServiceComboInfo;
