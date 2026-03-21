import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ActionModal from '../common/ActionModal';
import dayjs from 'dayjs';
import AddHealthBookDetailModal from './AddHealthBookDetailModal';
import { useDispatch } from 'react-redux';
import {
  createHealthBookDetail,
  getHealthBookDetail,
  updateHealthBookDetail,
} from '../../redux/thunks/petThunk';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaCircleInfo } from 'react-icons/fa6';
import EditHealthBookDetailModal from './EditHealthBookDetailModal';

export const PetHealthBookModal = ({ open, onClose, pet }) => {
  const dispatch = useDispatch();

  const details = useSelector((state) => state.pets.healthBookDetails);

  const [selectedImage, setSelectedImage] = useState(null);

  const closeLightbox = () => setSelectedImage(null);

  const [addHealthBookModalOpen, setAddHealthBookModalOpen] = useState(false);

  const handleOpenAddHealthBookModal = useCallback(() => {
    setAddHealthBookModalOpen(true);
  }, []);

  const handleCloseAddHealthBookModal = useCallback(() => {
    setAddHealthBookModalOpen(false);
  }, []);

  const handleSubmit = useCallback(
    (payload) => {
      console.log(payload);
      dispatch(createHealthBookDetail(payload))
        .unwrap()
        .then(() => {
          toast.success('Thêm thông tin sức khỏe thành công');
          handleCloseAddHealthBookModal();
        })
        .catch((e) => {
          console.log(e);
          toast.error(e?.message || e);
        });
    },
    [dispatch, handleCloseAddHealthBookModal]
  );

  useEffect(() => {
    dispatch(getHealthBookDetail(pet.petId));
  }, [dispatch, pet]);

  // EDIT
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleOpenEditModal = useCallback(() => {
    setEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditModalOpen(false);
  }, []);

  const handleSelectHealthBook = (id) => {
    setSelectedDetail(
      Array.isArray(details)
        ? details.find((e) => e.healthBookDetailId === id)
        : null
    );
    handleOpenEditModal();
  };

  const handleUpdateHealthDetail = useCallback(
    (payload) => {
      console.log(payload);
      dispatch(updateHealthBookDetail(payload))
        .unwrap()
        .then(() => {
          toast.success('Cập nhật thông tin sổ sức khỏe thành công');
          handleCloseEditModal();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.message || error);
        });
    },
    [dispatch, handleCloseEditModal]
  );

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title={`Sổ sức khỏe của bé ${pet?.petName}`}
    >
      <div className='space-y-6 max-h-[80vh] overflow-y-auto px-1'>
        {/* Pet Info Card */}
        <div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 max-w-[80%] mx-auto'>
          <div className='p-6'>
            <h3 className='text-2xl text-center font-medium text-primary mb-4'>
              Thông tin thú cưng
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-600'>
              <div className='flex items-center'>
                <span className='text-gray-500 w-32'>Tên thú cưng:</span>
                <span className='font-medium'>{pet?.petName}</span>
              </div>

              <div className='flex items-center'>
                <span className='text-gray-500 w-32'>Giống loài:</span>
                <span className='font-medium'>{pet?.breedName}</span>
              </div>

              <div className='flex items-center'>
                <span className='text-gray-500 w-32'>Giới tính:</span>
                <span className='font-medium'>
                  {pet?.petGender ? 'Đực' : 'Cái'}
                </span>
              </div>

              <div className='flex items-center'>
                <span className='text-gray-500 w-32'>Ngày sinh:</span>
                <span className='font-medium'>
                  {dayjs(pet?.petDateOfBirth).format('DD/MM/YYYY')}
                </span>
              </div>

              <div className='flex items-center'>
                <span className='text-gray-500 w-32'>Màu lông:</span>
                <span className='font-medium'>
                  {pet?.petFurColor || 'Không rõ'}
                </span>
              </div>

              <div className='flex items-center'>
                <span className='text-gray-500 w-32'>Cân nặng:</span>
                <span className='font-medium'>{pet?.petWeight} kg</span>
              </div>

              {pet?.petDesc && (
                <div className='col-span-1 md:col-span-2 flex'>
                  <span className='text-gray-500 w-32'>Mô tả:</span>
                  <span className='font-medium'>{pet.petDesc}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Health Book Records */}
        <div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
          <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
              <h3 className='text-2xl font-medium text-primary'>
                Chi tiết sổ sức khỏe
              </h3>
              <button
                onClick={handleOpenAddHealthBookModal}
                className='bg-primary text-white px-6 py-1 rounded-full hover:bg-primary-dark'
              >
                + Thêm
              </button>
            </div>

            {!Array.isArray(details) || details?.length === 0 ? (
              <div className='text-gray-500 italic bg-gray-50 p-6 rounded-lg text-center'>
                Chưa có thông tin sức khỏe nào.
              </div>
            ) : (
              <div className='overflow-x-auto rounded-lg w-full'>
                <table className='w-full table-auto'>
                  <thead className='bg-gray-50 text-gray-700 '>
                    <tr>
                      <th className='py-3 px-4 text-left font-medium'>
                        Ngày cập nhật
                      </th>
                      <th className='py-3 px-4 text-left font-medium'>
                        Tên điều trị
                      </th>
                      <th className='py-3 px-4 text-left font-medium'>
                        Ghi chú
                      </th>
                      <th className='py-3 px-4 text-left font-medium'>
                        Bác sĩ
                      </th>
                      <th className='py-3 px-4 text-left font-medium'>
                        Bằng cấp
                      </th>
                      <th className='py-3 px-4 text-left font-medium'>
                        Minh chứng
                      </th>
                      <th className='py-3 px-4 text-left font-medium'></th>
                    </tr>
                  </thead>
                  <tbody className='text-[0.75rem] text-center'>
                    {Array.isArray(details) &&
                      details.map((entry, index) => (
                        <tr
                          key={entry.healthBookDetailId}
                          className={`border-t border-gray-100 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                        >
                          <td className='py-3 px-4 text-gray-600'>
                            {dayjs(entry.updatedDate).format('DD/MM/YYYY')}
                          </td>
                          <td className='py-3 px-4 text-gray-600'>
                            {entry.treatmentName}
                          </td>
                          <td className='py-3 px-4 text-gray-600'>
                            {entry.petHealthNote}
                          </td>
                          <td className='py-3 px-4 text-gray-600'>
                            {entry.vetName}
                          </td>
                          <td className='py-3 px-4 text-gray-600'>
                            <div
                              className='cursor-pointer'
                              onClick={() => setSelectedImage(entry.vetDegree)}
                            >
                              <img
                                src={entry.vetDegree}
                                alt='Minh chứng'
                                className='w-16 h-16 object-cover rounded-lg shadow hover:opacity-90 transition-opacity'
                              />
                            </div>
                          </td>
                          <td className='py-3 px-4 text-gray-600'>
                            <div
                              className='cursor-pointer'
                              onClick={() =>
                                setSelectedImage(entry.treatmentProof)
                              }
                            >
                              <img
                                src={entry.treatmentProof}
                                alt='Minh chứng'
                                className='w-16 h-16 object-cover rounded-lg shadow hover:opacity-90 transition-opacity'
                              />
                            </div>
                          </td>
                          <td className='py-3 px-4 text-gray-600'>
                            <FaCircleInfo
                              onClick={() =>
                                handleSelectHealthBook(
                                  entry?.healthBookDetailId
                                )
                              }
                              size={'1.25rem'}
                              className='text-primary cursor-pointer hover:text-primary-dark'
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className='absolute top-0 bottom-0 left-0 right-0 inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
          onClick={closeLightbox}
        >
          <div className='w-2/3 max-h-full p-4'>
            <img
              src={selectedImage}
              alt='Enlarged view'
              className='w-full max-h-[90vh] object-contain rounded-lg'
            />
            <button
              className='absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg'
              onClick={closeLightbox}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {addHealthBookModalOpen && (
        <AddHealthBookDetailModal
          petId={pet?.petId}
          open={addHealthBookModalOpen}
          onClose={handleCloseAddHealthBookModal}
          onSubmit={handleSubmit}
        />
      )}

      {selectedDetail && (
        <EditHealthBookDetailModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdateHealthDetail}
          healthDetail={selectedDetail}
        />
      )}
    </ActionModal>
  );
};

PetHealthBookModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pet: PropTypes.object.isRequired,
};

export default PetHealthBookModal;
