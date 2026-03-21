import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getRooms } from '../redux/thunks/roomThunk';
import RoomCardList from '../components/common/RoomCardList';
import { toast } from 'react-toastify';
import { FaSearch, FaDog, FaCat } from 'react-icons/fa';

const HotelServicePage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [petTypeFilter, setPetTypeFilter] = useState('all');

  const loading = useSelector((state) => state.rooms.loading);
  const error = useSelector((state) => state.rooms.error);
  const rooms = useSelector((state) => state.rooms.rooms);

  const catRooms = useMemo(
    () => rooms.filter((room) => room.roomDesc.toLowerCase().includes('mèo')),
    [rooms]
  );

  const dogRooms = useMemo(
    () => rooms.filter((room) => room.roomDesc.toLowerCase().includes('chó')),
    [rooms]
  );

  useEffect(() => {
    dispatch(getRooms({ pageIndex: 1, pageSize: 10 }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const filteredDogRooms = useMemo(() => {
    return dogRooms.filter(
      (room) =>
        room.roomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomDesc?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dogRooms, searchTerm]);

  const filteredCatRooms = useMemo(() => {
    return catRooms.filter(
      (room) =>
        room.roomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomDesc?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [catRooms, searchTerm]);

  return (
    <div>
      <div className='relative w-full h-[30rem]'>
        <div
          className='absolute inset-0 bg-cover bg-center blur-[2px]'
          style={{ backgroundImage: "url('./cat-hotel.jpg')" }}
        ></div>

        <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
          <h1 className='text-primary text-6xl font-cute tracking-wider'>
            Khách sạn thú cưng
          </h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className='max-w-4xl mx-auto mt-8 px-4'>
        <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
          {/* Search Bar */}
          <div className='relative w-full md:w-2/3'>
            <input
              type='text'
              placeholder='Tìm kiếm phòng...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          </div>

          {/* Pet Type Filter */}
          <div className='flex gap-2 w-full md:w-auto'>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                petTypeFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setPetTypeFilter('all')}
            >
              Tất cả
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                petTypeFilter === 'dog'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setPetTypeFilter('dog')}
            >
              <FaDog /> Chó
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                petTypeFilter === 'cat'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setPetTypeFilter('cat')}
            >
              <FaCat /> Mèo
            </button>
          </div>
        </div>
      </div>

      {(petTypeFilter === 'all' || petTypeFilter === 'dog') && (
        <section>
          <div>
            <h1 className='text-3xl font-semibold text-center text-primary mt-4 mb-2'>
              Khách sạn cho chó
            </h1>
            <img
              src='./cute_separator.png'
              alt='cute_separator'
              className='mx-auto'
            />
          </div>

          <div className='m-8'>
            {loading ? (
              <div className='flex justify-center items-center w-full'>
                <img
                  src='./loading-cat.gif'
                  alt='loading...'
                  className='w-1/4 sm:w-1/3'
                />
              </div>
            ) : (
              <RoomCardList roomList={filteredDogRooms} />
            )}
          </div>
        </section>
      )}

      {(petTypeFilter === 'all' || petTypeFilter === 'cat') && (
        <section>
          <div>
            <h1 className='text-3xl font-semibold text-center text-primary mt-4 mb-2'>
              Khách sạn cho mèo
            </h1>
            <img
              src='./cute_separator.png'
              alt='cute_separator'
              className='mx-auto'
            />
          </div>

          <div className='m-8'>
            {loading ? (
              <div className='flex justify-center items-center w-full'>
                <img
                  src='./loading-cat.gif'
                  alt='loading...'
                  className='w-1/4 sm:w-1/3'
                />
              </div>
            ) : (
              <RoomCardList roomList={filteredCatRooms} />
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HotelServicePage;
