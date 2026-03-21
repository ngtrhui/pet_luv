import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { addPetToCollection, getPetByUser } from '../../redux/thunks/petThunk';
import checkPetWeight from '../../utils/checkPetWeight';
import { getAllBreed } from '../../redux/thunks/petBreedThunk';
import CreatePetModal from '../PersonalInfoPage/CreatePetModalContent';
import { toast } from 'react-toastify';

const checkArrayLength = (arr) => {
  return Array.isArray(arr) && arr.length !== 0;
};

const ChoosePetStepperContent = ({ setPet }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const { userId } = useMemo(() => {
    return currentUser || { userId: '' };
  }, [currentUser]);

  const pets = useSelector((state) => state.pets.pets);
  const petLoading = useSelector((state) => state.pets.loading);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );
  const selectedCombos = useSelector(
    (state) => state.serviceCombos.selectedCombos
  );
  const selectedRooms = useSelector((state) => state.rooms.selectedRooms);

  const [createPetModalOpen, setCreatePetModalOpen] = useState(false);

  const handleCloseCreatePetModal = useCallback(
    () => setCreatePetModalOpen(false),
    []
  );

  const handleCreatePetClicked = useCallback(() => {
    setCreatePetModalOpen(true);
    dispatch(getAllBreed());
  }, [dispatch]);

  const filterdPets = useMemo(() => {
    let eligiblePets = [...pets];

    // Services
    if (checkArrayLength(selectedServices)) {
      selectedServices.forEach((service) => {
        if (!checkArrayLength(service.serviceVariants)) return;

        // A pet is eligible if it matches ANY variant of the service
        const petsEligibleForThisService = pets.filter((pet) =>
          service.serviceVariants.some((variant) => {
            return (
              pet.breedId === variant.breedId &&
              checkPetWeight(pet.petWeight, variant.petWeightRange)
            );
          })
        );

        // Update eligible pets to only include those eligible for this service
        eligiblePets = eligiblePets.filter((pet) =>
          petsEligibleForThisService.some(
            (eligiblePet) => eligiblePet.petId === pet.petId
          )
        );
      });
    }

    // Combo
    if (checkArrayLength(selectedCombos)) {
      selectedCombos.forEach((combo) => {
        if (!checkArrayLength(combo.serviceVariants)) return;

        // A pet is eligible if it matches ANY variant of the combo
        const petsEligibleForThisCombo = pets.filter((pet) =>
          combo.serviceVariants.some(
            (variant) =>
              pet.breedId === variant.breedId &&
              checkPetWeight(pet.petWeight, variant.petWeightRange)
          )
        );

        // Update eligible pets to only include those eligible for this combo
        eligiblePets = eligiblePets.filter((pet) =>
          petsEligibleForThisCombo.some(
            (eligiblePet) => eligiblePet.petId === pet.petId
          )
        );
      });
    }

    // Room
    if (checkArrayLength(selectedRooms)) {
      selectedRooms.forEach((room) => {
        if (!checkArrayLength(room.serviceVariants)) return;

        // A pet is eligible if it matches ANY variant of the room
        const petsEligibleForThisRoom = pets.filter((pet) =>
          room.roomDesc.toLowerCase().includes(pet.petTypeName.toLowerCase())
        );

        // Update eligible pets to only include those eligible for this room
        eligiblePets = eligiblePets.filter((pet) =>
          petsEligibleForThisRoom.some(
            (eligiblePet) => eligiblePet.petId === pet.petId
          )
        );
      });
    }

    return eligiblePets;
  }, [pets, selectedServices, selectedCombos, selectedRooms]);

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;

    if (Array.isArray(pets) && pets.length === 0) {
      dispatch(getPetByUser(currentUser?.userId));
      isFetched.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pets]);

  const handlePetSelect = (petId) => {
    setSelectedPetId(petId);
    setPet(petId);
  };

  const handleCreatePet = useCallback(
    (values) => {
      dispatch(addPetToCollection({ ...values, customerId: userId }))
        .unwrap()
        .then(() => {
          toast.success('Thêm mới thú cưng thành công');
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.message || error);
        });
    },
    [dispatch, userId]
  );

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='mb-2 text-3xl font-cute tracking-wide text-primary'>
        Chọn thú cưng của bạn
      </h1>
      <p className='mb-6 text-secondary-light'>
        Vui lòng chọn thú cưng phù hợp với dịch vụ đã chọn
      </p>
      {petLoading ? (
        <div className='flex justify-center items-center w-full'>
          <img
            src='./loading-cat.gif'
            alt='loading...'
            className='w-1/4 sm:w-1/3'
          />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl'>
          {filterdPets.map((pet) => (
            <Card
              key={pet.petId}
              className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${
                selectedPetId === pet.petId
                  ? 'border-primary'
                  : 'border-gray-200'
              }`}
              onClick={() => handlePetSelect(pet.petId)}
            >
              <img
                src={pet.petImagePaths[0]?.petImagePath || '/logo.png'}
                alt={pet.petName}
                className='w-full h-40 object-cover rounded-md'
              />
              <CardContent>
                <h2 className='font-bold text-primary text-xl mb-1'>
                  {pet.petName}
                </h2>
                <p className='text-secondary text-start'>
                  <span className='text-secondary-light text-sm'>Loài:</span>{' '}
                  {pet.breedName}
                </p>
                <p className='text-secondary text-start'>
                  <span className='text-secondary-light text-sm'>
                    Cân nặng:
                  </span>{' '}
                  {pet.petWeight} kg
                </p>
              </CardContent>
            </Card>
          ))}

          <button
            onClick={handleCreatePetClicked}
            className='p-4 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary transition-all duration-300 rounded-lg'
          >
            <AddCircleOutlineIcon fontSize='large' color='primary' />
            <h2 className='mt-2 font-medium'>Thêm thú cưng mới</h2>
          </button>

          {createPetModalOpen && (
            <CreatePetModal
              open={createPetModalOpen}
              onClose={handleCloseCreatePetModal}
              onSubmit={handleCreatePet}
              userId={userId}
            />
          )}
        </div>
      )}
    </div>
  );
};

ChoosePetStepperContent.propTypes = {
  setPet: PropTypes.func,
};

export default ChoosePetStepperContent;
