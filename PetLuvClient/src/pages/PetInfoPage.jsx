import {
  BigSizeIcon,
  CustomerPetInfo,
  ImageGallery,
  PetFamilyModal,
} from '../components';
import CustomBreadCrumbs from '../components/common/CustomBreadCrumbs';
import { useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RiHealthBookLine } from 'react-icons/ri';
import { GiFamilyTree } from 'react-icons/gi';
import UpdatePetImage from '../components/PetInfoPage/UpdatePetImage';
import { useDispatch } from 'react-redux';
import {
  getPetInfo,
  updatePetFamily,
  updatePetImages,
} from '../redux/thunks/petThunk';
import { toast } from 'react-toastify';
import PetHealthBookModal from '../components/PetInfoPage/PetHealthBookModal';

const familyIconStyle = {
  rotate: '90%',
};

const PetInfoPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const pet = useSelector((state) => state.pets.pet);
  const pets = useSelector((state) => state.pets.pets);

  // BreadCrumbs
  const breedCrumbItems = useMemo(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);

    return pathnames.map((item, index) => {
      if (index >= pathnames.length - 2) return;

      const pathTo = `/${pathnames.slice(0, index + 1).join('/')}`;

      return (
        <Link
          key={`pet-info-${index}`}
          to={pathTo}
          className='text-primary hover:underline hover:text-primary-dark'
        >
          {decodeURIComponent(item)}
        </Link>
      );
    });
  }, [location]);

  const petImages = useMemo(() => {
    return Array.isArray(pet.petImagePaths)
      ? pet.petImagePaths.map((item) => item.petImagePath)
      : [];
  }, [pet]);

  // PET FAMILY
  const [isPetFamModalOpen, setIsPetFamModalOpen] = useState(false);

  const handleViewFamilyDetail = () => {
    setIsPetFamModalOpen(true);
  };

  const handleClosePetFamModal = () => {
    setIsPetFamModalOpen(false);
  };

  const handleAddPetFam = useCallback(
    (payload) => {
      dispatch(updatePetFamily({ petId: payload.petId, payload }))
        .unwrap()
        .then(() =>
          toast.success('Cập nhật thông tin gia đình thú cưng thành công')
        )
        .catch((e) => {
          console.log(e);
          toast.error(e?.message || e);
        });
    },
    [dispatch]
  );

  // PET IMAGE
  const [isAddImgModalOpen, setIsAddImgModalOpen] = useState(false);

  const handleCloseAddImgModal = () => {
    setIsAddImgModalOpen(false);
  };

  const handleClickAddButton = () => {
    setIsAddImgModalOpen(true);
  };

  // Update Pet Image
  const handleUpdateImages = useCallback(
    (imageList) => {
      Array.isArray(imageList) &&
        imageList.length > 0 &&
        dispatch(updatePetImages({ petId: pet?.petId, payload: imageList }))
          .unwrap()
          .then(() => {
            toast.success('Thêm ảnh thú cưng thành công');
            dispatch(getPetInfo(pet?.petId));
          })
          .catch((e) => {
            console.log(e);
            toast.error(e);
          });
    },
    [dispatch, pet]
  );

  // HEALTH BOOK
  const [isPetHealthBookModalOpen, setIsPetHealthBookModalOpen] =
    useState(false);

  const handleClickHealthBookModal = useCallback(() => {
    setIsPetHealthBookModalOpen(true);
  }, []);

  const handleCloseHealthBookModal = () => {
    setIsPetHealthBookModalOpen(false);
  };

  return (
    <div className='p-8'>
      <CustomBreadCrumbs breadCrumbItems={breedCrumbItems} className={'mb-4'} />

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-4'>
          <ImageGallery
            imageUrls={petImages}
            onAddButtonClicked={handleClickAddButton}
            addButtonContent={'Cập nhật ảnh thú cưng'}
          />
          <BigSizeIcon
            icon={<RiHealthBookLine size={'4rem'} />}
            content={
              <h1 className='lg:text-lg md:text-sm font-cute tracking-wide'>
                Xem sổ sức khỏe của
                <div className='text-primary'>{pet?.petName}</div>
              </h1>
            }
            onClick={handleClickHealthBookModal}
          />
          <BigSizeIcon
            icon={<GiFamilyTree size={'4rem'} style={familyIconStyle} />}
            content={
              <h1 className='lg:text-lg md:text-sm font-cute tracking-wide'>
                Xem nguồn gốc của
                <div className='text-primary'>{pet?.petName}</div>
              </h1>
            }
            onClick={handleViewFamilyDetail}
          />
          {isPetFamModalOpen && (
            <PetFamilyModal
              familyPets={pet}
              open={isPetFamModalOpen}
              onClose={handleClosePetFamModal}
              userPets={pets}
              onAddFamily={handleAddPetFam}
            />
          )}
        </div>

        <div className='col-span-8'>
          <CustomerPetInfo />
        </div>

        {isAddImgModalOpen && (
          <UpdatePetImage
            open={isAddImgModalOpen}
            onClose={handleCloseAddImgModal}
            images={petImages}
            onSave={handleUpdateImages}
          />
        )}

        {isPetHealthBookModalOpen && (
          <PetHealthBookModal
            open={isPetHealthBookModalOpen}
            onClose={handleCloseHealthBookModal}
            pet={pet}
          />
        )}
      </div>
    </div>
  );
};

export default PetInfoPage;
