import { useCallback, useEffect, useMemo, useState } from 'react';
import { Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import { Pets, CheckCircle, Category } from '@mui/icons-material';
import { MdMedicalServices, MdOutlineTypeSpecimen } from 'react-icons/md';
import { FaDog, FaBath, FaHotel } from 'react-icons/fa';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/vi';

import {
  ChoosePetStepperContent,
  ChooseServiceContainer,
  ChooseVariantStepperContent,
  ConfirmInforStepperContent,
} from '../components';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  resetSelectedService,
  resetSelectedVariant,
  setSelectedVariant,
} from '../redux/slices/serviceSlice';
import { useSelector } from 'react-redux';
import { resetSelectedPet, setSelectedPet } from '../redux/slices/petSlice';
import ChooseBookingTypeContent from '../components/BookingPage/ChooseBookingTypeContent';
import { getBookingTypes } from '../redux/thunks/bookingTypeThunk';
import { toast } from 'react-toastify';
import {
  resetSelectedType,
  setSelectedType,
} from '../redux/slices/bookingTypeSlice';
import { resetSelectedCombo } from '../redux/slices/serviceComboSlice';
import ChooseRoomBookTime from '../components/BookingPage/ChooseRoomBookTime';
import {
  resetRoomRentalTime,
  resetSelectedRoom,
  setRoomRentalTime,
} from '../redux/slices/roomSlice';
import {
  resetBookingTime,
  setBookingEndTime,
  setBookingStartTime,
} from '../redux/slices/bookingSlice';

// Set Vietnamese locale
dayjs.locale('vi');
dayjs.extend(isSameOrBefore);

const steps = [
  { label: 'Chọn loại booking', icon: <MdOutlineTypeSpecimen /> },
  { label: 'Chọn dịch vụ', icon: <MdMedicalServices /> },
  { label: 'Chọn thú cưng', icon: <Pets /> },
  { label: 'Chọn biến thể', icon: <Category /> },
  { label: 'Xác nhận thông tin', icon: <CheckCircle /> },
];

const BookingPage = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(search);

  // Stepper initialization
  const serviceId = params.get('dichVu');
  const breedId = params.get('loai');
  const petWeightRange = params.get('canNang');

  const initialStep = useMemo(() => {
    if (serviceId !== null && breedId !== null && petWeightRange !== null)
      return 1;
    return 0;
  }, [breedId, petWeightRange, serviceId]);

  const [activeStep, setActiveStep] = useState(initialStep);
  const [handleBook, setHandleBook] = useState(null);

  // Room booking state
  const [bookingType, setBookingType] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // BookingType
  const bookingTypes = useSelector((state) => state.bookingTypes.bookingTypes);
  const selectedTypeId = useSelector(
    (state) => state.bookingTypes.selectedTypeId
  );

  const bookingLoading = useSelector((state) => state.bookings.loading);

  const selectedType = useMemo(
    () => ({
      id: selectedTypeId,
      name: bookingTypes.find((type) => type.bookingTypeId === selectedTypeId)
        ?.bookingTypeName,
    }),
    [selectedTypeId, bookingTypes]
  );

  const formattedBookingTypes = useMemo(() => {
    return Array.isArray(bookingTypes) && bookingTypes.length !== 0
      ? bookingTypes.map((type) => ({
          id: type.bookingTypeId,
          label: type.bookingTypeName,
          icon: type.bookingTypeName.toLowerCase().includes('chăm sóc') ? (
            <FaBath className='text-primary w-12 h-12' />
          ) : type.bookingTypeName.toLowerCase().includes('dắt chó') ? (
            <FaDog className='text-primary w-12 h-12' />
          ) : (
            <FaHotel className='text-primary w-12 h-12' />
          ),
          description: type.bookingTypeDesc,
        }))
      : [];
  }, [bookingTypes]);

  const handleSelectBookingtype = useCallback(
    (typeId) => dispatch(setSelectedType(typeId)),
    [dispatch]
  );

  //
  const selectedBreed = useSelector((state) => state.services.selectedBreedId);

  // Service
  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );
  const selectedRooms = useSelector((state) => state.rooms.selectedRooms);

  const selectedCombos = useSelector(
    (state) => state.serviceCombos.selectedCombos
  );

  // Pet
  const selectedPet = useSelector((state) => state.pets.selectedPetId);

  const handleSetPet = useCallback(
    (payload) => dispatch(setSelectedPet(payload)),
    [dispatch]
  );

  const selectedPetWeightRange = useSelector(
    (state) => state.services.selectedPetWeightRange
  );

  const handleSetVariant = useCallback(
    (payload) => dispatch(setSelectedVariant(payload)),
    [dispatch]
  );

  // Stepper Helpers
  const disableNext = useMemo(() => {
    switch (activeStep) {
      case 0:
        return selectedTypeId === null
          ? 'Vui lòng chọn ít nhất một loại dịch vụ để tiếp tục'
          : null;

      case 1:
        return (Array.isArray(selectedServices) &&
          selectedServices.length !== 0) ||
          (Array.isArray(selectedRooms) && selectedRooms.length !== 0) ||
          (Array.isArray(selectedCombos) && selectedCombos.length !== 0)
          ? null
          : 'Vui lòng chọn ít nhất một dịch vụ để tiếp tục';

      case 2:
        return selectedPet == null
          ? 'Vui lòng chọn một thú cưng để tiếp tục'
          : null;

      case 3:
        if (
          selectedType?.name?.toLowerCase()?.includes('khách sạn') ||
          selectedType?.name?.toLowerCase()?.includes('phòng')
        ) {
          return bookingType && checkInDate && checkOutDate
            ? null
            : 'Vui lòng chọn thời gian đặt phòng để tiếp tục';
        }
        return selectedBreed === null && selectedPetWeightRange === null
          ? 'Vui lòng chọn một biến thể để tiếp tục'
          : null;

      default:
        return null;
    }
  }, [
    activeStep,
    selectedTypeId,
    selectedServices,
    selectedRooms,
    selectedCombos,
    selectedBreed,
    selectedPetWeightRange,
    selectedPet,
    selectedType,
    bookingType,
    checkInDate,
    checkOutDate,
  ]);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = () => {
    if (activeStep === 1) {
      dispatch(resetSelectedService());
      dispatch(resetSelectedCombo());
      dispatch(resetSelectedRoom());
      dispatch(resetSelectedType());
    }

    if (activeStep === 2) {
      // Reset selected variants (service booking)
      dispatch(resetSelectedVariant());
      // Reset room booking state if going back from (room booking)
      if (
        selectedType?.name?.toLowerCase()?.includes('khách sạn') ||
        selectedType?.name?.toLowerCase()?.includes('phòng')
      ) {
        setBookingType(null);
        setCheckInDate(null);
        setCheckOutDate(null);
        dispatch(resetRoomRentalTime());
        dispatch(resetBookingTime());
      }
    }

    if (activeStep === 3) {
      dispatch(resetSelectedPet());
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Room booking handlers
  const handleBookingTypeSelect = useCallback((type) => {
    setBookingType(type);

    // Reset dates when changing booking type
    setCheckInDate(null);
    setCheckOutDate(null);

    // If day booking, set default check-in and check-out times to 12 PM
    if (type === 'day') {
      const today = dayjs();
      const checkIn = today.hour(12).minute(0).second(0);
      const checkOut = today.add(1, 'day').hour(12).minute(0).second(0);

      setCheckInDate(checkIn);
      setCheckOutDate(checkOut);
    }
  }, []);

  const handleCheckInChange = useCallback(
    (newDate) => {
      if (bookingType === 'hour') {
        // Ensure only full hours
        const fullHourDate = dayjs(newDate).minute(0).second(0);
        setCheckInDate(fullHourDate);

        // Update checkout to be at least 1 hour after check-in
        const newCheckOut = fullHourDate.add(1, 'hour');
        setCheckOutDate(newCheckOut);
      } else {
        // For day booking, keep time at 12 PM
        const dayDate = dayjs(newDate).hour(12).minute(0).second(0);
        setCheckInDate(dayDate);

        // Set checkout to next day at 12 PM
        const nextDay = dayDate.add(1, 'day');
        setCheckOutDate(nextDay);
      }
    },
    [bookingType]
  );

  const handleCheckOutChange = useCallback(
    (newDate) => {
      if (bookingType === 'hour') {
        // Ensure only full hours
        const fullHourDate = dayjs(newDate).minute(0).second(0);

        // Ensure checkout is after check-in
        if (checkInDate && fullHourDate.isSameOrBefore(checkInDate)) {
          setCheckOutDate(dayjs(checkInDate).add(1, 'hour'));
        } else {
          setCheckOutDate(fullHourDate);
        }
      } else {
        // For day booking, checkout should be at least one day after check-in
        const dayDate = dayjs(newDate).hour(12).minute(0).second(0);

        if (checkInDate && dayDate.isSameOrBefore(checkInDate)) {
          setCheckOutDate(dayjs(checkInDate).add(1, 'day'));
        } else {
          setCheckOutDate(dayDate);
        }
      }
    },
    [bookingType, checkInDate]
  );

  const shouldDisableTime = useCallback((time, view) => {
    const openingTime = 8; // 8 AM
    const closingTime = 21; // 5 PM

    if (view === 'hours') {
      const hours = time.hour();
      return hours < openingTime || hours > closingTime;
    }

    if (view === 'minutes') {
      return time.minute() !== 0;
    }

    return false;
  }, []);

  const handleRoomBookingConfirm = useCallback(() => {
    // Calculate room rental time for hourly bookings
    let roomRentalTime = null;
    if (bookingType === 'hour' && checkInDate && checkOutDate) {
      // Calculate difference in hours
      roomRentalTime = checkOutDate.diff(checkInDate, 'hour');
    }

    if (roomRentalTime !== null) {
      dispatch(setRoomRentalTime(roomRentalTime));
    }

    if (checkInDate !== null) {
      const formattedCheckIn = checkInDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      dispatch(setBookingStartTime(formattedCheckIn));
    }

    if (checkOutDate !== null) {
      const formattedCheckOut = checkOutDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      dispatch(setBookingEndTime(formattedCheckOut));
    }

    toast.info('Đã ghi nhận thời gian đặt phòng');
  }, [checkInDate, checkOutDate, bookingType, dispatch]);

  useEffect(() => {
    dispatch(getBookingTypes({ pageIndex: 1, pageSize: 1000 }))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(resetSelectedService());
      dispatch(resetSelectedType());
      dispatch(resetSelectedVariant());
      dispatch(resetSelectedPet());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <div className='flex flex-col items-center p-8 max-w-7xl mx-auto'>
      <Stepper activeStep={activeStep} alternativeLabel className='w-full'>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel
              icon={step.icon}
              className={`text-lg font-semibold ${
                activeStep === index
                  ? 'text-primary'
                  : activeStep > index
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className='mt-8 text-center'>
        {activeStep === 0 ? (
          <ChooseBookingTypeContent
            bookingTypes={formattedBookingTypes}
            onSelect={handleSelectBookingtype}
          />
        ) : activeStep === 1 ? (
          <ChooseServiceContainer selectedBookingType={selectedType} />
        ) : activeStep === 2 ? (
          <ChoosePetStepperContent setPet={handleSetPet} />
        ) : activeStep === 3 ? (
          selectedType?.name?.toLowerCase()?.includes('khách sạn') ||
          selectedType?.name?.toLowerCase()?.includes('phòng') ? (
            <ChooseRoomBookTime
              bookingType={bookingType}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onBookingTypeSelect={handleBookingTypeSelect}
              onCheckInChange={handleCheckInChange}
              onCheckOutChange={handleCheckOutChange}
              onConfirm={handleRoomBookingConfirm}
              shouldDisableTime={shouldDisableTime}
              openingTime={8}
              closingTime={17}
              isLoading={bookingLoading}
            />
          ) : (
            <ChooseVariantStepperContent setVariant={handleSetVariant} />
          )
        ) : activeStep === 4 ? (
          <ConfirmInforStepperContent setHandleBook={setHandleBook} />
        ) : (
          <h1 className='text-2xl font-bold'>{steps[activeStep]?.label}</h1>
        )}
      </div>

      <div className='mt-8 flex justify-between w-full'>
        <button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={`bg-gray-500 px-8 py-2 rounded-lg text-white ${
            activeStep === 0
              ? 'cursor-not-allowed bg-gray-400'
              : 'cursor-pointer hover:bg-gray-400'
          }`}
        >
          Quay lại
        </button>
        {activeStep === steps.length - 1 ? (
          <button
            color='success'
            className={`bg-green-500 px-8 py-2 rounded-lg text-white hover:bg-green-400 text-center ${
              bookingLoading
                ? 'cursor-not-allowed bg-green-400'
                : 'cursor-pointer'
            }`}
            onClick={handleBook}
          >
            {bookingLoading ? (
              <CircularProgress
                size={'1rem'}
                color='inherit'
                className='mx-8'
              />
            ) : (
              'Hoàn thành'
            )}
          </button>
        ) : (
          <button
            disabled={disableNext !== null}
            onClick={handleNext}
            color='primary'
            className={`bg-primary px-8 py-2 rounded-lg text-white ${
              disableNext === null
                ? 'cursor-pointer hover:bg-primary-dark'
                : 'cursor-not-allowed bg-primary-light'
            }`}
          >
            Tiếp tục
          </button>
        )}
      </div>
      {disableNext && (
        <span className='text-md text-red-600 font-light ms-auto mt-2 italic'>
          {disableNext}
        </span>
      )}
    </div>
  );
};

export default BookingPage;
