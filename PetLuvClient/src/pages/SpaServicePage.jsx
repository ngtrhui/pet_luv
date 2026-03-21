import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getServices } from '../redux/thunks/serviceThunk.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ServiceCardList, ServiceComboCardList } from '../components/index.js';
import { getServiceCombos } from '../redux/thunks/serviceComboThunk.js';
import { FaSearch, FaDog, FaCat } from 'react-icons/fa';
import Pagination from '../components/common/Pagination.jsx';

const SpaServicePage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [currentServicePage, setCurrentServicePage] = useState(1);
  const [currentComboPage, setCurrentComboPage] = useState(1);
  const [pageSize] = useState(10);

  // Hardcoded total pages for now - in a real app, this would come from API
  const [totalServicePages] = useState(5); // Example value
  const [totalComboPages] = useState(3); // Example value

  const loading = useSelector((state) => state.services.loading);
  const services = useSelector((state) => state.services.services);
  const error = useSelector((state) => state.services.error);

  const comboLoading = useSelector((state) => state.serviceCombos.loading);
  const serviceCombos = useSelector(
    (state) => state.serviceCombos.serviceCombos
  );

  useEffect(() => {
    dispatch(getServices({ pageIndex: currentServicePage, pageSize }));
    dispatch(getServiceCombos({ pageIndex: currentComboPage, pageSize }));

    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, currentServicePage, currentComboPage, pageSize]);

  const filteredServices = services?.filter((service) => {
    const matchesSearch = service.serviceName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPetType =
      petTypeFilter === 'all' ||
      (petTypeFilter === 'dog' &&
        service.serviceName?.toLowerCase().includes('chó')) ||
      (petTypeFilter === 'cat' &&
        service.serviceName?.toLowerCase().includes('mèo'));
    return matchesSearch && matchesPetType;
  });

  const filteredCombos = serviceCombos?.filter((combo) => {
    const matchesSearch = combo.serviceComboName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPetType =
      petTypeFilter === 'all' ||
      (petTypeFilter === 'dog' &&
        combo.serviceComboName?.toLowerCase().includes('chó')) ||
      (petTypeFilter === 'cat' &&
        combo.serviceComboName?.toLowerCase().includes('mèo'));
    return matchesSearch && matchesPetType;
  });

  const handleServicePageChange = (page) => {
    setCurrentServicePage(page);
    window.scrollTo({
      top: document.getElementById('services-section').offsetTop - 100,
      behavior: 'smooth',
    });
  };

  const handleComboPageChange = (page) => {
    setCurrentComboPage(page);
    window.scrollTo({
      top: document.getElementById('combos-section').offsetTop - 100,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className='relative w-full h-[30rem]'>
        <div
          className='absolute inset-0 bg-cover bg-center blur-[2px]'
          style={{ backgroundImage: "url('./dog-grooming.jpg')" }}
        ></div>

        <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
          <h1 className='text-primary text-6xl font-cute tracking-wider'>
            Dịch vụ spa
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
              placeholder='Tìm kiếm dịch vụ...'
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

      <section id='services-section'>
        <div>
          <h1 className='text-3xl font-semibold text-center text-primary mt-4 mb-2'>
            Dịch vụ lẻ
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
            <>
              <ServiceCardList
                serviceList={filteredServices}
                serviceType='spa'
              />
              {totalServicePages > 1 && (
                <Pagination
                  currentPage={currentServicePage}
                  totalPages={totalServicePages}
                  onPageChange={handleServicePageChange}
                  className='mt-8'
                />
              )}
            </>
          )}
        </div>
      </section>

      <section id='combos-section'>
        <div>
          <h1 className='text-3xl font-semibold text-center text-primary mt-4 mb-2'>
            Combo
          </h1>
          <img
            src='./cute_separator.png'
            alt='cute_separator'
            className='mx-auto'
          />
        </div>

        <div className='m-10 mb-24'>
          {comboLoading ? (
            <div className='flex justify-center items-center w-full'>
              <img
                src='./loading-cat.gif'
                alt='loading...'
                className='w-1/4 sm:w-1/3'
              />
            </div>
          ) : (
            <>
              <ServiceComboCardList comboList={filteredCombos} />
              {totalComboPages > 1 && (
                <Pagination
                  currentPage={currentComboPage}
                  totalPages={totalComboPages}
                  onPageChange={handleComboPageChange}
                  className='mt-8'
                />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SpaServicePage;
