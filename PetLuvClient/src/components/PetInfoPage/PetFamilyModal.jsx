import PropTypes from 'prop-types';
import { useState } from 'react';
import ActionModal from '../common/ActionModal';
import BriefPetInfoCard from './BriefPetInfoCard';
import { IoAdd } from 'react-icons/io5';

const PetFamilyModal = ({
  familyPets,
  userPets,
  open,
  onClose,
  onAddFamily,
}) => {
  const {
    father,
    mother,
    childrenFromFather = [],
    childrenFromMother = [],
    petId,
    petName,
  } = familyPets || {};

  const allChildren = [
    ...(childrenFromFather || []),
    ...(childrenFromMother || []),
  ];

  const [showAddForm, setShowAddForm] = useState(false);
  const [step, setStep] = useState(1);
  const [relationship, setRelationship] = useState(null);
  const [useOwnPet, setUseOwnPet] = useState(true);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [manualPet, setManualPet] = useState({
    name: '',
    breed: '',
    age: '',
    image: '',
  });
  const [parentRole, setParentRole] = useState(null);

  const handleAddSubmit = () => {
    const newPet = useOwnPet
      ? userPets.find((pet) => pet.petId === selectedPetId)
      : {
          petName: manualPet.name,
          breedName: manualPet.breed,
          dateOfBirth: manualPet.age,
          petImagePaths: [{ petImagePath: manualPet.image }],
        };

    relationship === 'Con'
      ? onAddFamily?.({
          petId,
          childrenIds: [newPet?.petId],
          petFamilyRole: parentRole,
        })
      : relationship === 'Cha'
      ? onAddFamily?.({
          petId,
          fatherId: newPet?.petId,
        })
      : onAddFamily?.({
          petId,
          motherId: newPet?.petId,
        });

    // Reset state
    setShowAddForm(false);
    setStep(1);
    setRelationship(null);
    setSelectedPetId(null);
    setManualPet({ name: '', breed: '', age: '', image: '' });
    setParentRole(null);
  };

  return (
    <ActionModal title='Gia đình thú cưng' open={open} onClose={onClose}>
      <div className='flex flex-col gap-6 w-full max-h-[70vh] overflow-y-auto px-2'>
        {(father || mother) && (
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold text-secondary'>Phụ huynh</h2>
            {father && <BriefPetInfoCard pet={father} role='Cha' />}
            {mother && <BriefPetInfoCard pet={mother} role='Mẹ' />}
          </div>
        )}

        {allChildren.length > 0 && (
          <div className='flex flex-col gap-4 mt-6'>
            <h2 className='text-2xl font-semibold text-secondary'>Con cái</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {allChildren.map((child) => (
                <BriefPetInfoCard key={child.petId} pet={child} role='Con' />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!father && !mother && allChildren.length === 0 && (
          <p className='text-center text-gray-500'>
            Không có thông tin gia đình được cung cấp.
          </p>
        )}

        {/* Toggle Add Form */}
        <div className='mt-8'>
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className='rounded-xl bg-primary px-8 py-4 text-white hover:bg-primary-dark transition flex items-center gap-1'
            >
              <IoAdd size={'1.5rem'} /> Thêm thành viên gia đình
            </button>
          ) : (
            <div className='flex flex-col gap-4 border-t pt-4 mt-4'>
              {step === 1 && (
                <>
                  <label className='font-semibold text-gray-700'>
                    Chọn mối quan hệ với bé {petName}:
                  </label>
                  <select
                    className='p-2 border rounded-md'
                    value={relationship || ''}
                    onChange={(e) => setRelationship(e.target.value)}
                  >
                    <option value=''>-- Chọn --</option>
                    <option value='Cha'>Cha</option>
                    <option value='Mẹ'>Mẹ</option>
                    <option value='Con'>Con</option>
                  </select>
                  {!relationship && (
                    <span className='text-sm text-red-500'>
                      Vui lòng chọn mối quan hệ.
                    </span>
                  )}

                  {relationship === 'Con' && (
                    <>
                      <label className='font-semibold text-gray-700 mt-2'>
                        Bé {petName} là?
                      </label>
                      <div className='flex gap-4'>
                        <button
                          className={`px-4 py-2 rounded-md border ${
                            parentRole === 'cha'
                              ? 'bg-white border-[3px] border-primary'
                              : 'bg-white'
                          }`}
                          onClick={() => setParentRole('cha')}
                        >
                          Là Cha
                        </button>
                        <button
                          className={`px-4 py-2 rounded-md border ${
                            parentRole === 'mẹ'
                              ? 'bg-white border-[3px] border-primary'
                              : 'bg-white'
                          }`}
                          onClick={() => setParentRole('mẹ')}
                        >
                          Là Mẹ
                        </button>
                      </div>
                      {!parentRole && (
                        <span className='text-sm text-red-500'>
                          Vui lòng chọn mối quan hệ với con.
                        </span>
                      )}
                    </>
                  )}

                  <div className='flex gap-4 mt-4'>
                    <button
                      onClick={() => {
                        if (
                          relationship &&
                          (relationship !== 'Con' ||
                            (relationship === 'Con' && parentRole))
                        ) {
                          setStep(2);
                        }
                      }}
                      className='bg-primary text-white px-4 py-2 rounded-lg'
                    >
                      Tiếp tục
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setStep(1);
                        setRelationship(null);
                        setParentRole(null);
                      }}
                      className='text-gray-700 underline self-center'
                    >
                      Quay lại
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <label className='font-semibold text-gray-700'>
                    Chọn thú cưng:
                  </label>

                  {useOwnPet ? (
                    <>
                      <select
                        className='p-2 border rounded-md'
                        value={selectedPetId || ''}
                        onChange={(e) => setSelectedPetId(e.target.value)}
                      >
                        <option value=''>-- Chọn thú cưng --</option>
                        {userPets?.map((pet) => (
                          <option key={pet.petId} value={pet.petId}>
                            {pet.petName} - {pet.breedName}
                          </option>
                        ))}
                      </select>
                      {!selectedPetId && (
                        <span className='text-sm text-red-500'>
                          Vui lòng chọn thú cưng.
                        </span>
                      )}
                    </>
                  ) : (
                    <div className='flex flex-col gap-2 mt-4'>
                      <input
                        type='text'
                        placeholder='Tên thú cưng'
                        className='p-2 border rounded-md'
                        value={manualPet.name}
                        onChange={(e) =>
                          setManualPet((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                      {!manualPet.name && (
                        <span className='text-sm text-red-500'>
                          Tên thú cưng là bắt buộc.
                        </span>
                      )}
                      <input
                        type='text'
                        placeholder='Giống loài'
                        className='p-2 border rounded-md'
                        value={manualPet.breed}
                        onChange={(e) =>
                          setManualPet((prev) => ({
                            ...prev,
                            breed: e.target.value,
                          }))
                        }
                      />
                      {!manualPet.breed && (
                        <span className='text-sm text-red-500'>
                          Giống loài là bắt buộc.
                        </span>
                      )}
                      <input
                        type='date'
                        className='p-2 border rounded-md'
                        value={manualPet.age}
                        onChange={(e) =>
                          setManualPet((prev) => ({
                            ...prev,
                            age: e.target.value,
                          }))
                        }
                      />
                      {!manualPet.age && (
                        <span className='text-sm text-red-500'>
                          Ngày sinh là bắt buộc.
                        </span>
                      )}
                      <input
                        type='text'
                        placeholder='URL hình ảnh'
                        className='p-2 border rounded-md'
                        value={manualPet.image}
                        onChange={(e) =>
                          setManualPet((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }
                      />
                      {!manualPet.image && (
                        <span className='text-sm text-red-500'>
                          Hình ảnh là bắt buộc.
                        </span>
                      )}
                    </div>
                  )}

                  <div className='flex gap-4 mt-4'>
                    <button
                      onClick={() => {
                        const valid = useOwnPet
                          ? selectedPetId
                          : manualPet.name &&
                            manualPet.breed &&
                            manualPet.age &&
                            manualPet.image;

                        if (valid) handleAddSubmit();
                      }}
                      className='bg-primary text-white px-4 py-2 rounded-md'
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() => {
                        setStep(1);
                      }}
                      className='text-gray-600 underline'
                    >
                      Quay lại
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </ActionModal>
  );
};

PetFamilyModal.propTypes = {
  familyPets: PropTypes.shape({
    father: PropTypes.object,
    mother: PropTypes.object,
    childrenFromFather: PropTypes.array,
    childrenFromMother: PropTypes.array,
  }).isRequired,
  userPets: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddFamily: PropTypes.func.isRequired,
};

export default PetFamilyModal;
