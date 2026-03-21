import { useDispatch } from 'react-redux';
import UserPetCardList from './UserPetCardList';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { addPetToCollection, getPetByUser } from '../../redux/thunks/petThunk';
import { toast } from 'react-toastify';
import LoadingComponent from '../common/LoadingComponent';
import { IoAddCircleOutline } from 'react-icons/io5';
import CreatePetModal from './CreatePetModalContent';
import { getAllBreed } from '../../redux/thunks/petBreedThunk';

const PetCollection = () => {
  const dispatch = useDispatch();

  const [createPetModalOpen, setCreatePetModalOpen] = useState(false);

  const handleCloseCreatePetModal = useCallback(
    () => setCreatePetModalOpen(false),
    []
  );

  const user = useSelector((state) => state.auth.user);
  const { userId } = useMemo(() => {
    return user || { userId: '' };
  }, [user]);

  const pets = useSelector((state) => state.pets.pets);
  const loading = useSelector((state) => state.pets.loading);

  const handleCreatePetClicked = useCallback(() => {
    setCreatePetModalOpen(true);
    dispatch(getAllBreed());
  }, [dispatch]);

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

  useEffect(() => {
    dispatch(getPetByUser(userId))
      .unwrap()
      .then(() => {})
      .catch((error) => toast.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-4xl text-primary font-cute tracking-wide'>
          Bộ sưu tập thú cưng của bạn
        </h1>
        <button
          onClick={handleCreatePetClicked}
          className='bg-primary text-white font-semibold flex justify-center items-center gap-1 px-10 py-3 rounded-full hover:text-tertiary-light hover:bg-primary-dark'
        >
          Thêm thú cưng <IoAddCircleOutline className='mt-1' />
        </button>
      </div>
      {loading ? <LoadingComponent /> : <UserPetCardList pets={pets} />}
      {createPetModalOpen && (
        <CreatePetModal
          open={createPetModalOpen}
          onClose={handleCloseCreatePetModal}
          onSubmit={handleCreatePet}
          userId={userId}
        />
      )}
    </div>
  );
};

export default PetCollection;
