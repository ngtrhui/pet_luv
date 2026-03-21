import PropTypes from 'prop-types';
import calculatePetAge from '../../utils/calculatePetAge';
import generateRandomColor from '../../utils/generateColorByName';
import { useMemo } from 'react';

import { FaCat } from 'react-icons/fa6';
import { FaDog } from 'react-icons/fa';
import { MdOutlinePets } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

const renderPetTypeIcon = (petTypeName) => {
  if (!petTypeName) return <MdOutlinePets />;

  if (petTypeName.toLowerCase().includes('chó')) {
    return <FaDog />;
  } else if (petTypeName.toLowerCase().includes('mèo')) {
    return <FaCat />;
  }

  return <MdOutlinePets />;
};

const UserPetCard = ({ pet }) => {
  const age = useMemo(() => calculatePetAge(pet?.petDateOfBirth), [pet]);
  const petBreedColor = useMemo(
    () => generateRandomColor(pet?.breedName),
    [pet]
  );
  const petTypeIcon = useMemo(() => renderPetTypeIcon(pet?.petTypeName), [pet]);

  return (
    <Link
      to={`thu-cung/${pet?.petId}`}
      className='max-w-sm rounded-xl shadow-lg overflow-hidden bg-white border hover:scale-110'
    >
      <img
        src={pet?.petImagePaths[0]?.petImagePath}
        alt={pet?.petName}
        className='w-full h-40 object-cover'
      />

      <Stack spacing={4} className='p-4'>
        <div>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl text-primary font-bold'>{pet?.petName}</h2>
            <span className='text-2xl text-primary'>{petTypeIcon}</span>
          </div>

          <p className='text-secondary-light text-sm mt-1'>{age}</p>
        </div>

        <div
          className='text-xs font-bold py-1 px-4 rounded-full w-fit text-[#333]'
          style={{
            backgroundColor: petBreedColor,
          }}
        >
          {pet?.breedName}
        </div>
      </Stack>
    </Link>
  );
};

UserPetCard.propTypes = {
  pet: PropTypes.object.isRequired,
};

export default UserPetCard;
