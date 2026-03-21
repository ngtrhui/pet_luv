import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import NotFoundComponent from '../common/NotFoundComponent';
import ChosenServiceCard from './ChosenServiceCard';
import ServiceCardList from '../common/ServiceCardList';
import ServiceComboCardList from '../common/ServiceComboCardList';
import ChosenComboCard from './ChosenComboCard';

const ChooseServiceStepperContent = ({
  services,
  combos,
  selectedServices,
  selectedCombos,
  onResetSelectedServices,
  onResetSelectedCombos,
  search,
  setSearch,
  onSelectService,
  onSelectCombo,
}) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-primary text-3xl font-cute tracking-wide my-6'>
        Chọn dịch vụ cho thú cưng của bạn
      </h1>

      <TextField
        label='Tìm kiếm dịch vụ'
        variant='outlined'
        className='w-3/5'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2 className='text-start text-2xl text-primary font-cute tracking-wider mt-16 mb-8'>
        Dịch vụ lẻ
      </h2>
      {!Array.isArray(services) || services.length === 0 ? (
        <NotFoundComponent name='dịch vụ' />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 mx-auto w-full'>
          {services.map(
            (service, index) =>
              !service.serviceName.toLowerCase().includes('dắt chó') && (
                <ChosenServiceCard
                  key={`service-${index}`}
                  service={service}
                  onClick={() => onSelectService(service)}
                />
              )
          )}
        </div>
      )}

      {/* Choosen service combo */}
      <h2 className='text-start text-2xl text-primary font-cute tracking-wider my-8'>
        Combo Dịch vụ
      </h2>
      {!Array.isArray(combos) || combos.length === 0 ? (
        <NotFoundComponent name='dịch vụ' />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 mx-auto w-full'>
          {combos.map((combo, index) => (
            <ChosenComboCard
              key={`combo-${index}`}
              combo={combo}
              onClick={() => onSelectCombo(combo)}
            />
          ))}
        </div>
      )}

      <div className='lg:min-w-[75%] md:min-w-[50%] min-w-[25%]'>
        <div className='flex items-center justify-between w-full'>
          <h1 className='text-2xl text-primary font-cute tracking-wider text-center'>
            Dịch vụ đã chọn
          </h1>
          <span
            onClick={onResetSelectedServices}
            className={`${
              Array.isArray(selectedServices) && selectedServices.length !== 0
                ? 'text-red-500 hover:cursor-pointer hover:text-red-400'
                : 'text-gray-500 hover:cursor-not-allowed'
            }  text-xl italic font-light me-8`}
          >
            Xóa tất cả
          </span>
        </div>
        <ServiceCardList serviceList={selectedServices} />
        {/* Show service combos */}
      </div>

      <div className='lg:min-w-[75%] md:min-w-[50%] min-w-[25%]'>
        <div className='flex items-center justify-between w-full'>
          <h1 className='text-2xl text-primary font-cute tracking-wider text-center'>
            Combo đã chọn
          </h1>
          <span
            onClick={onResetSelectedCombos}
            className={`${
              Array.isArray(selectedCombos) && selectedCombos.length !== 0
                ? 'text-red-500 hover:cursor-pointer hover:text-red-400'
                : 'text-gray-500 hover:cursor-not-allowed'
            }  text-xl italic font-light me-8`}
          >
            Xóa tất cả
          </span>
        </div>
        <ServiceComboCardList comboList={selectedCombos} />
      </div>
    </div>
  );
};

ChooseServiceStepperContent.propTypes = {
  services: PropTypes.array.isRequired,
  combos: PropTypes.array.isRequired,
  selectedServices: PropTypes.array.isRequired,
  selectedCombos: PropTypes.array.isRequired,
  onResetSelectedServices: PropTypes.func.isRequired,
  onResetSelectedCombos: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onSelectService: PropTypes.func.isRequired,
  onSelectCombo: PropTypes.func.isRequired,
};

export default ChooseServiceStepperContent;
