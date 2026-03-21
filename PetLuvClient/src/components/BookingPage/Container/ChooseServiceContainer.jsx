import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ChooseServiceStepperContent from '../ChooseServiceStepperContent';
import { useDispatch } from 'react-redux';
import {
  resetSelectedService,
  setSelectedService,
} from '../../../redux/slices/serviceSlice';
import ChooseRoomStepperContent from '../ChooseRoomStepperContent';
import ChooseWalkDogServiceStepperContent from '../ChooseWalkDogServiceStepperContent';
import {
  resetSelectedRoom,
  setSelectedRoom,
} from '../../../redux/slices/roomSlice';
import {
  resetSelectedCombo,
  setSelectedCombo,
} from '../../../redux/slices/serviceComboSlice';
import { toast } from 'react-toastify';
import { getRoomsByBreeds } from '../../../redux/thunks/roomThunk';

const ChooseServiceContainer = ({ selectedBookingType }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const services = useSelector((state) => state.services.services);
  const serviceCombos = useSelector(
    (state) => state.serviceCombos.serviceCombos
  );
  const rooms = useSelector((state) => state.rooms.availableRooms);
  const roomLoading = useSelector((state) => state.rooms.loading);

  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );

  const selectedCombos = useSelector(
    (state) => state.serviceCombos.selectedCombos
  );

  const selectedRooms = useSelector((state) => state.rooms.selectedRooms);

  const isRenderRoom = useMemo(
    () =>
      selectedBookingType?.name?.toLowerCase()?.includes('khách sạn') ||
      selectedBookingType?.name?.toLowerCase()?.includes('phòng'),
    [selectedBookingType]
  );

  const userPets = useSelector((state) => state.pets.pets);

  const breedsFromPets = useMemo(() => {
    if (!Array.isArray(userPets) || userPets.length === 0) return [];

    const breedIds = userPets.map((pet) => pet.breedId);
    const uniqueBreedIds = [...new Set(breedIds)];

    return uniqueBreedIds;
  }, [userPets]);

  useEffect(() => {
    if (isRenderRoom) {
      dispatch(getRoomsByBreeds(breedsFromPets));
    }
  }, [isRenderRoom, breedsFromPets, dispatch]);

  const filteredServices = useMemo(() => {
    if (selectedBookingType && isRenderRoom) {
      return rooms.filter((room) => {
        return room?.roomName
          ?.toLowerCase()
          .includes(search.toLowerCase().trim());
      });
    }

    console.log(selectedServices);

    let result = services;

    if (Array.isArray(selectedServices) && selectedServices.length !== 0) {
      result = result.filter(
        (service) =>
          !selectedServices.some(
            (selectedService) => selectedService.serviceId === service.serviceId
          )
      );
    }

    return result.filter((service) => {
      return service?.serviceName
        ?.toLowerCase()
        .includes(search.toLowerCase().trim());
    });
  }, [
    selectedBookingType,
    isRenderRoom,
    selectedServices,
    services,
    rooms,
    search,
  ]);

  const handleSelectService = (service) => {
    if (Array.isArray(selectedCombos) && selectedCombos.length !== 0) {
      return toast.warn('Không thể cùng lúc chọn cả dịch vụ và combo');
    }

    if (
      !selectedServices.find((item) => item.serviceId === service.serviceId)
    ) {
      dispatch(setSelectedService(service));
    }
  };

  const handleSelectCombo = (combo) => {
    if (Array.isArray(selectedServices) && selectedServices.length !== 0) {
      return toast.warn('Không thể cùng lúc chọn cả dịch vụ và combo');
    }

    if (
      !selectedCombos.find(
        (item) => item.serviceComboId === combo.serviceComboId
      )
    ) {
      dispatch(setSelectedCombo(combo));
    }
  };

  const handleResetSelectedServices = () => {
    dispatch(resetSelectedService());
  };

  const handleResetSelectedCombos = () => {
    dispatch(resetSelectedCombo());
  };

  const handleSelectRoom = (room) => {
    if (Array.isArray(selectedServices) && selectedServices.length !== 0) {
      return toast.warn('Không thể cùng lúc chọn cả dịch vụ và phòng');
    }

    if (selectedRooms?.length > 0) {
      return toast.warn('Đã chọn phòng rồi');
    }

    if (!selectedRooms?.find((item) => item.roomId === room.roomId)) {
      dispatch(setSelectedRoom(room));
    }
  };

  const handleResetSelectedRooms = () => {
    dispatch(resetSelectedRoom());
  };

  return isRenderRoom ? (
    <ChooseRoomStepperContent
      rooms={filteredServices}
      loading={roomLoading}
      selectedRooms={selectedRooms}
      onResetSelectedRooms={handleResetSelectedRooms}
      search={search}
      setSearch={setSearch}
      onSelectRoom={handleSelectRoom}
    />
  ) : selectedBookingType?.name?.toLowerCase()?.includes('dắt chó') ? (
    <ChooseWalkDogServiceStepperContent
      services={filteredServices}
      selectedServices={selectedServices}
      onResetSelectedServices={handleResetSelectedServices}
      search={search}
      setSearch={setSearch}
      onSelectService={handleSelectService}
    />
  ) : (
    <ChooseServiceStepperContent
      services={filteredServices}
      combos={serviceCombos}
      selectedServices={selectedServices}
      onResetSelectedServices={handleResetSelectedServices}
      onResetSelectedCombos={handleResetSelectedCombos}
      search={search}
      setSearch={setSearch}
      onSelectService={handleSelectService}
      onSelectCombo={handleSelectCombo}
      selectedCombos={selectedCombos}
    />
  );
};

ChooseServiceContainer.propTypes = {
  selectedBookingType: PropTypes.object.isRequired,
};

export default ChooseServiceContainer;
