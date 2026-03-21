import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <Link
      to={`/khach-san-thu-cung/${room?.roomId}`}
      className='bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:cursor-pointer'
    >
      <img
        src={`${
          !Array.isArray(room?.roomImages) || room?.roomImages.length === 0
            ? 'logo.png'
            : 'http://localhost:5030' + room?.roomImages[0]
        }`}
        alt={room?.roomName}
        className='w-full h-48 object-cover'
      />

      <div className='p-4 text-start'>
        <h3 className='text-xl font-bold text-gray-800'>{room?.roomName}</h3>
        <p className='text-sm text-gray-600 mt-2 line-clamp-3'>
          {room?.roomDesc}
        </p>

        <span className='inline-block mt-3 text-xs text-white bg-primary px-3 py-1 rounded-full'>
          {room?.roomTypeName}
        </span>
      </div>
    </Link>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomCard;
