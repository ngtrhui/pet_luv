import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getServiceById } from '../redux/thunks/serviceThunk';
import { ImageGallery, ServiceInfo, ServiceCardList } from '../components';
import { toast } from 'react-toastify';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();

  const headPageRef = useRef(null);

  const service = useSelector((state) => state.services.service);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(getServiceById(serviceId));
  }, [dispatch, serviceId, error]);

  useEffect(() => {
    if (headPageRef.current) {
      headPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const serviceImageUrls = useMemo(
    () =>
      service?.serviceImageUrls?.map((url) => `http://localhost:5020${url}`),
    [service]
  );

  return (
    <div className='container mx-auto p-6 space-y-12' ref={headPageRef}>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-1/2'>
          {serviceImageUrls && serviceImageUrls.length > 0 ? (
            <ImageGallery imageUrls={serviceImageUrls} />
          ) : (
            <div className='w-full h-96 bg-gray-200 flex flex-col items-center justify-center rounded-lg'>
              <img src='/logo.png' alt='' />
            </div>
          )}
        </div>

        <div className='lg:w-1/2'>
          <ServiceInfo service={service} />
        </div>
      </div>

      <div>
        <h2 className='text-3xl text-secondary font-bold mb-6 mt-14'>
          Các dịch vụ tương tự
        </h2>
        <ServiceCardList />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
