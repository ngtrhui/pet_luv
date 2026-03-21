import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import {
  FaCalendarAlt,
  FaClock,
  FaDog,
  FaHotel,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { MdPets, MdSpa } from 'react-icons/md';
import { IoGrid } from 'react-icons/io5';
import formatCurrency from '../../utils/formatCurrency';

// Set Vietnamese locale
dayjs.locale('vi');

const BookingSummary = () => {
  // Get data from Redux store
  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );
  const selectedCombos = useSelector(
    (state) => state.serviceCombos.selectedCombos
  );
  const selectedRooms = useSelector((state) => state.rooms.selectedRooms);
  const selectedPet = useSelector((state) => state.pets.selectedPetId);
  const pets = useSelector((state) => state.pets.pets);
  const bookingStartTime = useSelector(
    (state) => state.bookings.bookingStartTime
  );
  const bookingEndTime = useSelector((state) => state.bookings.bookingEndTime);
  const roomRentalTime = useSelector((state) => state.rooms.roomRentalTime);
  const selectedTypeId = useSelector(
    (state) => state.bookingTypes.selectedTypeId
  );
  const bookingTypes = useSelector((state) => state.bookingTypes.bookingTypes);
  const selectedBreedId = useSelector(
    (state) => state.services.selectedBreedId
  );
  const selectedPetWeightRange = useSelector(
    (state) => state.services.selectedPetWeightRange
  );

  const selectedVariant = useMemo(() => {
    if (!Array.isArray(selectedServices)) return null;

    for (const service of selectedServices) {
      for (const variant of service.serviceVariants) {
        if (
          variant.breedId === selectedBreedId &&
          variant.petWeightRange === selectedPetWeightRange
        ) {
          return variant;
        }
      }
    }

    return null;
  }, [selectedBreedId, selectedPetWeightRange, selectedServices]);

  // Format dates
  const formattedStartTime = useMemo(() => {
    if (!bookingStartTime) return null;
    return dayjs(bookingStartTime).format('DD/MM/YYYY HH:mm');
  }, [bookingStartTime]);

  const formattedEndTime = useMemo(() => {
    if (!bookingEndTime) return null;
    return dayjs(bookingEndTime).format('DD/MM/YYYY HH:mm');
  }, [bookingEndTime]);

  // Get selected pet details
  const selectedPetDetails = useMemo(() => {
    if (!selectedPet || !Array.isArray(pets)) return null;
    return pets.find((pet) => pet.petId === selectedPet);
  }, [selectedPet, pets]);

  // Get booking type name
  const bookingTypeName = useMemo(() => {
    if (!selectedTypeId || !Array.isArray(bookingTypes)) return '';
    const bookingType = bookingTypes.find(
      (type) => type.bookingTypeId === selectedTypeId
    );
    return bookingType?.bookingTypeName || '';
  }, [selectedTypeId, bookingTypes]);

  // Calculate total price
  const totalServicesPrice = useMemo(() => {
    if (!Array.isArray(selectedServices)) return 0;

    return selectedServices.reduce((total, service) => {
      if (!Array.isArray(service.serviceVariants)) return total;
      return (
        total +
        service.serviceVariants.reduce((variantTotal, variant) => {
          if (
            variant.breedId === selectedBreedId &&
            variant.petWeightRange === selectedPetWeightRange
          ) {
            return variantTotal + (variant.price || 0);
          }

          return variantTotal;
        }, 0)
      );
    }, 0);
  }, [selectedBreedId, selectedPetWeightRange, selectedServices]);

  // Calculate total combo price
  const totalCombosPrice = useMemo(() => {
    if (!Array.isArray(selectedCombos) || selectedCombos.length === 0) return 0;

    return selectedCombos.reduce((total, combo) => {
      if (!Array.isArray(combo.comboVariants)) return total;
      return (
        total +
        combo.comboVariants.reduce((variantTotal, variant) => {
          console.log(variant);
          console.log(selectedBreedId);
          console.log(selectedPetWeightRange);
          if (
            variant.breedId === selectedBreedId &&
            variant.weightRange === selectedPetWeightRange
          ) {
            return variantTotal + (variant.comboPrice || 0);
          }

          return variantTotal;
        }, 0)
      );
    }, 0);
  }, [selectedBreedId, selectedCombos, selectedPetWeightRange]);

  const daysBetween = useMemo(() => {
    if (!bookingStartTime || !bookingEndTime || roomRentalTime) return null;

    const start = dayjs(bookingStartTime);
    const end = dayjs(bookingEndTime);

    // Calculate difference in days (rounded up if partial day)
    const diffInDays = Math.ceil(end.diff(start, 'day', true));
    return diffInDays > 0 ? diffInDays : 1; // Ensure at least 1 day
  }, [bookingStartTime, bookingEndTime, roomRentalTime]);

  const totalRoomsPrice = useMemo(() => {
    if (!Array.isArray(selectedRooms)) return 0;
    return selectedRooms.reduce((total, room) => {
      return total + roomRentalTime
        ? room?.pricePerHour * roomRentalTime
        : room?.pricePerDay * daysBetween;
    }, 0);
  }, [selectedRooms, roomRentalTime, daysBetween]);

  const totalPrice = useMemo(() => {
    let total = 0;

    if (totalServicesPrice) total += totalServicesPrice;
    if (totalCombosPrice) total += totalCombosPrice;
    if (totalRoomsPrice) total += totalRoomsPrice;

    return formatCurrency(total);
  }, [totalRoomsPrice, totalServicesPrice, totalCombosPrice]);

  // Check if we have any booking data to display
  const hasBookingData =
    selectedServices?.length > 0 ||
    selectedRooms?.length > 0 ||
    selectedCombos?.length > 0;

  if (!hasBookingData) {
    return null;
  }

  return (
    <div className='w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200'>
      <div className='bg-primary text-white p-4'>
        <h2 className='text-xl font-bold flex items-center'>
          <FaCalendarAlt className='mr-2' /> Thông Tin Đặt Lịch
        </h2>
      </div>

      {/* Booking Type and Time */}
      <div className='p-6 bg-gray-50'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex items-start'>
            <div className='bg-primary bg-opacity-10 p-3 rounded-full'>
              <MdPets className='text-primary text-xl' />
            </div>
            <div className='ml-4'>
              <h3 className='text-sm font-medium text-gray-500'>
                Loại Dịch Vụ
              </h3>
              <p className='text-lg font-semibold'>{bookingTypeName}</p>
            </div>
          </div>

          {selectedPetDetails && (
            <div className='flex items-start'>
              <div className='bg-primary bg-opacity-10 p-3 rounded-full'>
                <FaDog className='text-primary text-xl' />
              </div>
              <div className='ml-4'>
                <h3 className='text-sm font-medium text-gray-500'>Thú Cưng</h3>
                <p className='text-lg font-semibold'>
                  {selectedPetDetails.petName}{' '}
                  {selectedPetDetails.breed?.breedName || ''} -
                  {selectedPetDetails.petWeight
                    ? ` ${selectedPetDetails.petWeight}kg`
                    : ''}
                </p>
                <p className='text-sm text-gray-500'></p>
              </div>
            </div>
          )}
        </div>

        {(formattedStartTime || formattedEndTime) && (
          <div className='mt-6 border-t border-gray-200 pt-4'>
            <div className='flex items-center mb-2'>
              <FaClock className='text-primary mr-2' />
              <h3 className='font-medium'>Thời Gian</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pl-6'>
              {formattedStartTime && (
                <div>
                  <p className='text-sm text-gray-500'>Bắt đầu:</p>
                  <p className='font-medium'>{formattedStartTime}</p>
                </div>
              )}
              {formattedEndTime && (
                <div>
                  <p className='text-sm text-gray-500'>Kết thúc:</p>
                  <p className='font-medium'>{formattedEndTime}</p>
                </div>
              )}
              {roomRentalTime && (
                <div>
                  <p className='text-sm text-gray-500'>Thời gian thuê:</p>
                  <p className='font-medium'>{roomRentalTime} giờ</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Service Combos */}
      {selectedCombos?.length > 0 && (
        <div className='p-6 border-t border-gray-200'>
          <div className='flex items-center mb-4'>
            <IoGrid className='text-primary mr-2 text-xl' />
            <h3 className='font-medium text-lg'>Combo Dịch Vụ Đã Chọn</h3>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Tên Combo
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Mô tả
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Giá
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {selectedCombos.map((combo, index) => (
                  <tr key={`${combo.serviceComboId}-${index}`}>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        index % 2 !== 0 ? 'bg-tertiary-light' : ''
                      }`}
                    >
                      <div className='flex items-center'>
                        <div className='text-left'>
                          <div className='text-sm font-medium text-gray-900'>
                            {combo.serviceComboName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm line-clamp-1 max-w-[8rem] text-gray-500 ${
                        index % 2 !== 0 ? 'bg-tertiary-light' : ''
                      }`}
                    >
                      {combo.serviceComboDesc || 'Gói dịch vụ kết hợp'}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right ${
                        index % 2 !== 0 ? 'bg-tertiary-light' : ''
                      }`}
                    >
                      {formatCurrency(totalCombosPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Services */}
      {selectedServices?.length > 0 && (
        <div className='p-6 border-t border-gray-200'>
          <div className='flex items-center mb-4'>
            <MdSpa className='text-primary mr-2 text-xl' />
            <h3 className='font-medium text-lg'>Dịch Vụ Đã Chọn</h3>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Tên Dịch Vụ
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Ước tính (giờ)
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Giá
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {selectedServices.map((service, index) => (
                  <tr key={`${service.serviceId}-${index}`}>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        index % 2 !== 0 ? 'bg-tertiary-light' : ''
                      }`}
                    >
                      <div className='flex items-center'>
                        <div className='text-left'>
                          <div className='text-sm font-medium text-gray-900'>
                            {service.serviceName}
                          </div>
                          <span className='text-xs italic'>
                            {selectedVariant
                              ? `(${selectedVariant.breedName} - ${selectedVariant.petWeightRange})`
                              : ''}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                        index % 2 !== 0 ? 'bg-tertiary-light' : ''
                      }`}
                    >
                      {selectedVariant?.estimateTime}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right ${
                        index % 2 !== 0 ? 'bg-tertiary-light' : ''
                      }`}
                    >
                      {formatCurrency(selectedVariant?.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rooms */}
      {selectedRooms?.length > 0 && (
        <div className='p-6 border-t border-gray-200'>
          <div className='flex items-center mb-4'>
            <FaHotel className='text-primary mr-2 text-xl' />
            <h3 className='font-medium text-lg'>Phòng Đã Chọn</h3>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-[0.65rem] font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Tên Phòng
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-[0.65rem] font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Loại Phòng
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-[0.65rem] font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Thời Gian
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-[0.65rem] font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Giá
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-[0.65rem] font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Tổng
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 text-xs'>
                {selectedRooms.map((room) => (
                  <tr key={room.roomId} className='hover:bg-gray-50'>
                    <td className='p-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='ml-4'>
                          <div className='text-xs font-medium text-gray-900'>
                            {room.roomName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='p-4 whitespace-nowrap text-xs text-gray-500'>
                      {room?.roomTypeName}
                    </td>
                    <td className='p-4 whitespace-nowrap text-xs text-gray-500'>
                      {roomRentalTime
                        ? `${roomRentalTime} giờ`
                        : `${daysBetween} ngày`}
                    </td>
                    <td className='p-4 whitespace-nowrap text-xs text-gray-900 text-right'>
                      {roomRentalTime
                        ? formatCurrency(totalRoomsPrice)
                        : formatCurrency(room?.pricePerDay * daysBetween)}
                    </td>
                    <td className='p-4 whitespace-nowrap text-xs font-medium text-gray-900 text-right'>
                      {formatCurrency(totalRoomsPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Total */}
      <div className='p-6 bg-gray-50 border-t border-gray-200'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <FaMoneyBillWave className='text-primary mr-2 text-xl' />
            <h3 className='font-medium text-lg'>Tổng Thanh Toán</h3>
          </div>
          <div className='text-2xl font-bold text-primary'>{totalPrice}</div>
        </div>
        <p className='text-sm text-gray-500 mt-2 italic'>
          * Giá trên đã bao gồm thuế và phí dịch vụ
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
