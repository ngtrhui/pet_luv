import PropTypes from 'prop-types';
import calculatePetAge from '../../utils/calculatePetAge';

const BriefPetInfoCard = ({ pet, role }) => {
  // const image = pet?.petImagePaths?.[0]?.petImagePath;

  return (
    <div className='flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition duration-200'>
      <img
        src={pet?.petImagePaths[0]?.petImagePath}
        alt={pet?.petName}
        className='w-full h-40 object-cover'
      />
      <div className='flex flex-col'>
        <span className='text-sm font-semibold text-gray-500'>{role}</span>
        <h2 className='text-xl font-bold text-primary'>{pet?.petName}</h2>
        <p className='text-sm text-gray-600'>{pet?.breedName}</p>
        <p className='text-sm text-gray-600'>
          {calculatePetAge(pet?.petDateOfBirth)}
        </p>
      </div>
    </div>
  );
};

BriefPetInfoCard.propTypes = {
  pet: PropTypes.object.isRequired,
  role: PropTypes.oneOf(['Cha', 'Mẹ', 'Con']).isRequired,
};

export default BriefPetInfoCard;
