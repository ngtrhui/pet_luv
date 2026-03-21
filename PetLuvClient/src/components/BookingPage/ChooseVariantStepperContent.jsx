import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';
import checkPetWeight from '../../utils/checkPetWeight';

const ChooseVariantStepperContent = ({ setVariant }) => {
  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );

  const selectedCombos = useSelector(
    (state) => state.serviceCombos.selectedCombos
  );

  const selectedPetId = useSelector((state) => state.pets.selectedPetId);
  const userPets = useSelector((state) => state.pets.pets);

  const selectedBreedId = useSelector(
    (state) => state.services.selectedBreedId
  );
  const selectedPetWeightRange = useSelector(
    (state) => state.services.selectedPetWeightRange
  );

  const { breedId, petWeight } = userPets.find(
    (pet) => pet.petId === selectedPetId
  );

  const [selectedVariants, setSelectedVariants] = useState({
    serviceId: selectedServices?.[0]?.serviceId || null,
    breedId: selectedBreedId || null,
    petWeightRange: selectedPetWeightRange || null,
  });

  const filteredVariants = useMemo(() => {
    if (
      (!Array.isArray(selectedServices) || selectedServices.length === 0) &&
      (!Array.isArray(selectedCombos) || selectedCombos.length === 0)
    )
      return [];

    const matchingVariants = [];

    console.log(selectedCombos);

    const variantExists = (variant) => {
      return matchingVariants.some(
        (existingVariant) =>
          existingVariant.breedId === variant.breedId &&
          existingVariant.petWeightRange === variant.petWeightRange
      );
    };

    selectedServices.forEach((service) => {
      if (
        !Array.isArray(service.serviceVariants) ||
        service.serviceVariants.length === 0
      )
        return;

      if (
        Array.isArray(service.serviceVariants) &&
        service.serviceVariants.length !== 0
      ) {
        service.serviceVariants.forEach((variant) => {
          if (
            variant.breedId === breedId &&
            checkPetWeight(petWeight, variant.petWeightRange) &&
            !variantExists(variant)
          ) {
            matchingVariants.push(variant);
          }
        });
      }
    });

    console.log(selectedCombos);

    selectedCombos.forEach((combo) => {
      console.log(combo);
      if (
        !Array.isArray(combo.comboVariants) ||
        combo.comboVariants.length === 0
      )
        return;

      if (
        Array.isArray(combo.comboVariants) &&
        combo.comboVariants.length !== 0
      ) {
        combo.comboVariants.forEach((variant) => {
          if (
            variant.breedId === breedId &&
            checkPetWeight(petWeight, variant.weightRange) &&
            !variantExists(variant)
          ) {
            matchingVariants.push(variant);
          }
        });
      }
    });

    return matchingVariants;
  }, [breedId, petWeight, selectedCombos, selectedServices]);

  console.log(filteredVariants);

  const handleVariantSelect = (serviceId, breedId, petWeightRange) => {
    setVariant({ breedId, petWeightRange });
    setSelectedVariants({ serviceId, breedId, petWeightRange });
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='mb-2 text-3xl font-cute tracking-wide text-primary'>
        Chọn biến thể cho dịch vụ đã chọn
      </h1>
      <p className='mb-6 text-secondary-light'>
        Vui lòng chọn biến thể phù hợp với thú cưng của bạn
      </p>

      {/* Display selected services */}
      {selectedServices.map((service) => (
        <div key={service.serviceId} className='w-full max-w-3xl mb-8'>
          <Card className='p-4 shadow-lg shadow-orange-600 mt-4'>
            <h1 className='font-bold text-primary text-2xl mb-1'>
              {service.serviceName}
            </h1>
            <Typography variant='body2' className='text-gray-500'>
              Loại: {service.serviceTypeName}
            </Typography>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'>
              {filteredVariants?.map((variant, index) => (
                <Card
                  key={`variant-${index}`}
                  className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${
                    selectedVariants.serviceId === variant.serviceId &&
                    selectedVariants.breedId === variant.breedId &&
                    selectedVariants.petWeightRange === variant.petWeightRange
                      ? 'border-primary border-[2px]'
                      : 'border-gray-200'
                  }`}
                  onClick={() =>
                    handleVariantSelect(
                      service.serviceId,
                      variant.breedId,
                      variant.petWeightRange
                    )
                  }
                >
                  <CardContent>
                    <h2 className='font-bold text-sm text-secondary-light flex items-center gap-2 mb-4 overflow-hidden'>
                      <span className='truncate flex-1'>
                        {variant?.breedName}
                      </span>
                      <span className='whitespace-nowrap flex-shrink-0'>
                        {variant?.petWeightRange}
                      </span>
                    </h2>
                    <p className='font-bold text-xl text-primary-light'>
                      {formatCurrency(variant.price)}
                    </p>
                    {selectedVariants.breedId === variant.breedId &&
                      selectedVariants.petWeightRange ===
                        variant.petWeightRange && (
                        <img
                          src='/cat-paw.png'
                          alt='cat-paw'
                          className='w-16 absolute right-0 top-0 -z-50 -rotate-45'
                        />
                      )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      ))}

      {/* Display selected combos */}
      {selectedCombos.length > 0 && (
        <div className='w-full max-w-3xl mb-8'>
          <h1 className='mb-2 text-2xl font-cute tracking-wide text-primary'>
            Combo dịch vụ đã chọn
          </h1>

          {selectedCombos.map((combo) => (
            <div key={combo.serviceComboId} className='w-full'>
              <Card className='p-4 shadow-lg shadow-orange-600 mt-4'>
                <h1 className='font-bold text-primary text-2xl mb-1'>
                  {combo.serviceComboName}
                </h1>

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'>
                  {filteredVariants?.map((variant, index) => (
                    <Card
                      key={`combo-variant-${index}`}
                      className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${
                        selectedVariants.breedId === variant.breedId &&
                        selectedVariants.petWeightRange === variant.weightRange
                          ? 'border-primary border-[2px]'
                          : 'border-gray-200'
                      }`}
                      onClick={() =>
                        handleVariantSelect(
                          combo.serviceComboId,
                          variant.breedId,
                          variant.weightRange
                        )
                      }
                    >
                      <CardContent>
                        <h2 className='font-bold text-sm text-secondary-light flex items-center gap-2 mb-4 overflow-hidden'>
                          <span className='truncate flex-1'>
                            {variant?.breedName}
                          </span>
                          <span className='whitespace-nowrap flex-shrink-0'>
                            {variant?.weightRange}
                          </span>
                        </h2>
                        <p className='font-bold text-xl text-primary-light'>
                          {formatCurrency(variant.comboPrice)}
                        </p>
                        {selectedVariants.breedId === variant.breedId &&
                          selectedVariants.petWeightRange ===
                            variant.petWeightRange && (
                            <img
                              src='/cat-paw.png'
                              alt='cat-paw'
                              className='w-16 absolute right-0 top-0 -z-50 -rotate-45'
                            />
                          )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ChooseVariantStepperContent.propTypes = {
  setVariant: PropTypes.func,
};

export default ChooseVariantStepperContent;
