import PropTypes from 'prop-types';
import NotFoundComponent from './NotFoundComponent';
import RoomCard from './RoomCard';

const RoomCardList = ({ roomList }) => {
  return (
    <section className='my-8'>
      {!Array.isArray(roomList) || roomList.length === 0 ? (
        <NotFoundComponent name='dịch vụ' />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-8 mx-auto w-full'>
          {roomList.map((room, index) => (
            <RoomCard key={`room-${index}`} room={room} />
          ))}
        </div>
      )}
    </section>
  );
};

RoomCardList.propTypes = {
  roomList: PropTypes.array,
};

export default RoomCardList;
