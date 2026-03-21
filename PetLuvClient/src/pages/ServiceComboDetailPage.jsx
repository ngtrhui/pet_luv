import { useEffect, useMemo, useRef } from 'react';
import {
  ImageGallery,
  ServiceCardList,
  ServiceComboCardList,
  ServiceComboInfo,
} from '../components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  getServiceComboById,
  getServicesByCombo,
} from '../redux/thunks/serviceComboThunk';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const ServiceComboDetailPage = () => {
  const dispatch = useDispatch();
  const headPageRef = useRef(null);
  const { serviceComboId } = useParams();

  const serviceCombo = useSelector((state) => state.serviceCombos.serviceCombo);
  const services = useSelector((state) => state.serviceCombos.services);
  const loading = useSelector((state) => state.serviceCombos.loading);

  const formattedServices = useMemo(() => {
    return services.map((item) => ({
      serviceId: item.service.serviceId,
      serviceName: item.service.serviceName,
      serviceDesc: item.service.serviceDesc,
      serviceImageUrls: item.service.serviceImages,
      serviceType: item.service.serviceType,
    }));
  }, [services]);

  useEffect(() => {
    dispatch(getServiceComboById(serviceComboId));
    dispatch(getServicesByCombo(serviceComboId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceComboId]);

  useEffect(() => {
    if (headPageRef.current) {
      headPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const serviceImageUrls = [];
  return (
    <div className='container mx-auto p-6 space-y-12' ref={headPageRef}>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* <div className='lg:w-1/2'>
          {serviceImageUrls && serviceImageUrls.length > 0 ? (
            <ImageGallery imageUrls={serviceImageUrls} />
          ) : (
            <div className='w-full h-96 bg-gray-200 flex flex-col items-center justify-center rounded-lg'>
              <img src='/logo.png' alt='' />
            </div>
          )}
        </div> */}

        {loading ? (
          <Skeleton circle count={4.5} />
        ) : (
          <ServiceComboInfo serviceCombo={serviceCombo} />
        )}
      </div>

      <div>
        <h2 className='text-3xl text-secondary font-bold mb-6 mt-14'>
          Các Dịch vụ mà thú cưng của bạn sẽ được hưởng khi sử dụng Combo này:
        </h2>
        <ServiceCardList serviceList={formattedServices} />
      </div>

      <div>
        <h2 className='text-3xl text-secondary font-bold mb-6 mt-14'>
          Các combo tương tự
        </h2>
        <ServiceComboCardList />
      </div>
    </div>
  );
};

export default ServiceComboDetailPage;
