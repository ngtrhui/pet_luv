import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRoomById } from '../redux/thunks/roomThunk'; // Giả sử có thunk này
import { toast } from 'react-toastify';
import { ImageGallery, ServiceCardList } from '../components';
import RoomInfo from '../components/RoomPage/RoomInfo';

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const headPageRef = useRef(null);

  const room = useSelector((state) => state.rooms.room);
  const error = useSelector((state) => state.rooms.error);

  useEffect(() => {
    if (headPageRef.current) {
      headPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getRoomById(roomId));
  }, [dispatch, roomId, error]);

  console.log(room);

  return (
    <div className='container mx-auto p-6 space-y-12' ref={headPageRef}>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-1/2'>
          {room?.roomImages && room.roomImages.length > 0 ? (
            <ImageGallery
              imageUrls={room.roomImages.map(
                (image) => `http://localhost:5030${image}`
              )}
            />
          ) : (
            <div className='w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg'>
              <p className='text-gray-500'>No images available.</p>
            </div>
          )}
        </div>

        <div className='lg:w-1/2'>
          <RoomInfo room={room} />
        </div>
      </div>

      <div>
        <h2 className='text-3xl font-bold text-tertiary mb-6'>Similar Rooms</h2>
        <ServiceCardList />
      </div>
    </div>
  );
};

export default RoomDetailPage;
