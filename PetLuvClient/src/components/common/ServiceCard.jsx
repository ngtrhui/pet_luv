import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, serviceType = 'spa' }) => {
  return (
    <Link
      to={`${
        serviceType === 'spa'
          ? '/dich-vu-spa/' + service.serviceId
          : '/dat-cho-di-dao/' + service.serviceId
      }`}
      className='bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:cursor-pointer'
    >
      <img
        src={`${
          !Array.isArray(service?.serviceImageUrls) ||
          service?.serviceImageUrls.length === 0
            ? '/logo.png'
            : 'http://localhost:5020' + service?.serviceImageUrls[0]
        }`}
        alt={service?.serviceName}
        className='w-full h-48 object-cover'
      />

      <div className='p-4'>
        <h3 className='text-xl font-bold text-gray-800'>
          {service?.serviceName}
        </h3>
        <p className='text-sm text-gray-600 mt-2 line-clamp-3'>
          {service?.serviceDesc}
        </p>

        <span
          className={`inline-block mt-3 text-xs text-white ${
            service?.serviceTypeName && 'bg-primary'
          } px-3 py-1 rounded-full`}
        >
          {service?.serviceTypeName}
        </span>
      </div>
    </Link>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  serviceType: PropTypes.string.isRequired,
};

export default ServiceCard;
