import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const ServiceComboCard = ({ service }) => {
  const randomAngle = useMemo(() => {
    const multiples = [-90, -60, -30, 0, 30, 60, 90];
    const index = Math.floor(Math.random() * multiples.length);
    return multiples[index] + 10;
  }, []);

  return (
    <div className='bg-white shadow-xl rounded-2xl overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer relative'>
      <div className='p-6 flex flex-col h-full justify-between'>
        <div>
          <h3 className='text-2xl font-extrabold text-gray-900 z-10 line-clamp-1 w-[85%]'>
            <Tooltip title={service?.serviceComboName} placement='bottom'>
              {service?.serviceComboName}
            </Tooltip>
          </h3>
          <p className='mt-4 text-base text-gray-600 z-10 line-clamp-3'>
            <Tooltip title={service?.serviceComboDesc} placement='bottom'>
              {service?.serviceComboDesc}
            </Tooltip>
          </p>
        </div>
        <div className='mt-6'>
          <Link
            to={`combo/${service.serviceComboId}`}
            className='w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors z-10 block text-center'
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
      <img
        src='cat-paw.png'
        alt='Background decoration'
        className='absolute top-2 right-2 z-0'
        style={{
          width: '80px',
          transform: `rotate(${randomAngle}deg)`,
        }}
      />
    </div>
  );
};

ServiceComboCard.propTypes = {
  service: PropTypes.shape({
    serviceComboId: PropTypes.string.isRequired,
    serviceComboName: PropTypes.string.isRequired,
    serviceComboDesc: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServiceComboCard;
