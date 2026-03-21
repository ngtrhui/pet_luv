import PropTypes from 'prop-types';
import UserPetCard from './UserPetCard';
import NotFoundComponent from '../common/NotFoundComponent';

const UserPetCardList = ({ pets }) => {
  return Array.isArray(pets) && pets.length !== 0 ? (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4'>
      {pets.map((pet) => (
        <UserPetCard key={pet.petId} pet={pet} />
      ))}
    </div>
  ) : (
    <NotFoundComponent name='thú cưng' />
  );
};

UserPetCardList.propTypes = {
  pets: PropTypes.array,
};

export default UserPetCardList;
