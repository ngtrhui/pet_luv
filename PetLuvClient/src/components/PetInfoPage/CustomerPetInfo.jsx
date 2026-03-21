import { Box, FormControlLabel, Stack, Switch } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPetInfo, updatePetInfo } from '../../redux/thunks/petThunk';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import PetInfoForm from './PetInfoForm';
import { getAllBreed } from '../../redux/thunks/petBreedThunk';

const CustomerPetInfo = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { userId } = useMemo(() => {
    return user || { userId: '' };
  }, [user]);

  const pet = useSelector((state) => state.pets.pet);

  // pet breed
  const breedOptions = useSelector((state) => state.petBreeds.petBreeds);

  const initialPetValues = useMemo(
    () => ({
      petName: pet?.petName || '',
      petDateOfBirth: pet?.petDateOfBirth,
      petGender: pet?.petGender || '',
      petFurColor: pet?.petFurColor || '',
      petWeight: pet?.petWeight || 0,
      petDesc: pet?.petDesc || '',
      petMother: pet?.petMother || '',
      petFather: pet?.petFather || '',
      petBreed: pet?.petBreed || '',
      petType: pet?.petType || '',
      petChildren: pet?.petChildren || '',
      petImages: pet?.petImagePaths || [],
    }),
    [pet]
  );

  const [editMode, setEditMode] = useState(false);

  const handleToggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  // APIs
  useEffect(() => {
    dispatch(getPetInfo(petId));
    dispatch(getAllBreed());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petId]);

  const handleUpdate = useCallback(
    (values) => {
      const payload = {
        petId,
        payload: { ...values, customerId: userId },
      };
      dispatch(updatePetInfo(payload))
        .unwrap()
        .then(() => {
          toast.success('Cập nhật thông tin thú cưng thành công');
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.message || error);
        });
    },
    [dispatch, petId, userId]
  );

  return (
    <Box sx={{ px: 3 }}>
      <h2 className='text-2xl text-primary font-cute tracking-wide mb-4'>
        Thông tin thú cưng
      </h2>
      <Stack spacing={3} className='overflow-y-auto h-[100vh]'>
        <div className='flex justify-start items-center gap-4'>
          <span className='text-sm text-tertiary-dark font-light'>Chế độ:</span>
          <FormControlLabel
            control={<Switch checked={editMode} onChange={handleToggleEdit} />}
            label={editMode ? 'Sửa' : 'Xem'}
          />
        </div>

        <PetInfoForm
          initialValues={initialPetValues}
          breedOptions={breedOptions}
          onSubmit={handleUpdate}
          onClose={handleToggleEdit}
          isReadOnly={editMode === false}
        />
      </Stack>
    </Box>
  );
};

export default CustomerPetInfo;
