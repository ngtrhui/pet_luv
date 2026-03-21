export default function checkPetWeight(petWeight, range) {
  const [minWeight, maxWeight] = range.replace('kg', '').split('-');

  return (
    petWeight >= parseFloat(minWeight.trim()) &&
    petWeight <= parseFloat(maxWeight.trim())
  );
}
