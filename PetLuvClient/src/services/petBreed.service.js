import ApiService from './api.service';

class PetBreedService {
  constructor() {
    this.api = new ApiService('http://localhost:5040/api/');
  }

  async getAllASync(params) {
    const { petType = '', pageIndex = 1, pageSize = 10 } = params;

    const query = new URLSearchParams({
      petType,
      pageIndex,
      pageSize,
    }).toString();

    try {
      return this.api.get(`pet-breeds/?${query}`);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new PetBreedService();
