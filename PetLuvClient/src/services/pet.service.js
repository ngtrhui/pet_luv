import ApiService from './api.service';

class PetService {
  constructor() {
    this.api = new ApiService('http://localhost:5040/api/');
  }

  async getById(petId) {
    try {
      return this.api.get(`pets/${petId}`);
    } catch (error) {
      console.log(error);
    }
  }

  async createAsync(payload) {
    const {
      petName = '',
      petDateOfBirth = null,
      petGender = '',
      petFurColor = '',
      petWeight = '',
      petDesc = '',
      petFamilyRole = '',
      breedId = '',
      isVisible = true,
      customerId = '',
      imageFiles = [],
    } = payload;

    const formData = new FormData();

    formData.append('petName', petName);
    formData.append('petDateOfBirth', petDateOfBirth);
    formData.append('petGender', petGender);
    formData.append('petFurColor', petFurColor);
    formData.append('petWeight', petWeight);
    formData.append('petDesc', petDesc);
    formData.append('petFamilyRole', petFamilyRole);
    formData.append('breedId', breedId);
    formData.append('isVisible', isVisible);
    formData.append('customerId', customerId);

    imageFiles.forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    try {
      return this.api.post(`pets/`, formData);
    } catch (error) {
      console.log(error);
    }
  }

  async update(petId, payload) {
    const {
      petName = '',
      petDateOfBirth = null,
      petGender = '',
      petFurColor = '',
      petWeight = '',
      petDesc = '',
      petFamilyRole = '',
      breedId = '',
      isVisible = true,
      customerId = '',
      imageFiles = [],
    } = payload;

    const formData = new FormData();

    formData.append('petName', petName);
    formData.append('petDateOfBirth', petDateOfBirth);
    formData.append('petGender', petGender);
    formData.append('petFurColor', petFurColor);
    formData.append('petWeight', petWeight);
    formData.append('petDesc', petDesc);
    formData.append('petFamilyRole', petFamilyRole);
    formData.append('breedId', breedId);
    formData.append('isVisible', isVisible);
    formData.append('customerId', customerId);

    imageFiles.forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    try {
      const response = this.api.put(`pets/${petId}`, formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateImages(petId, payload) {
    const formData = new FormData();

    payload.forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    try {
      const response = this.api.put(`pets/${petId}/images`, formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateFamily(petId, payload) {
    try {
      return this.api.put(`pets/${petId}/family`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImage(petId, imagePath) {
    const query = new URLSearchParams({ imagePath }).toString();
    try {
      const response = this.api.delete(`pets/${petId}/image?${query}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getPetCollection(userId) {
    try {
      const response = this.api.get(`users/${userId}/pets`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getHealthBookDetail(healthBookId) {
    try {
      return this.api.get(
        `pet-health-books/${healthBookId}/detail?pageIndex=1&pageSize=10`
      );
    } catch (error) {
      console.log(error);
    }
  }

  async createHealthBookDetail(payload) {
    const {
      healthBookId,
      petHealthNote,
      treatmentName,
      treatmentDesc,
      treatmentProof,
      updatedDate,
      vetDegree,
      vetName,
    } = payload;

    const formData = new FormData();

    formData.append('healthBookId', healthBookId);
    formData.append('petHealthNote', petHealthNote);
    formData.append('treatmentName', treatmentName);
    formData.append('treatmentDesc', treatmentDesc);
    formData.append('treatmentProof', treatmentProof);
    formData.append('updatedDate', updatedDate);
    formData.append('vetDegree', vetDegree);
    formData.append('vetName', vetName);

    try {
      return this.api.post(`pet-health-books/`, formData);
    } catch (error) {
      console.log(error);
    }
  }

  async updateHealthBookDetail(payload) {
    const {
      healthBookDetailId,
      petHealthNote,
      treatmentName,
      treatmentDesc,
      treatmentProof,
      updatedDate,
      vetDegree,
      vetName,
    } = payload;

    const formData = new FormData();

    formData.append('petHealthNote', petHealthNote);
    formData.append('treatmentName', treatmentName);
    formData.append('treatmentDesc', treatmentDesc);
    formData.append('treatmentProof', treatmentProof);
    formData.append('updatedDate', updatedDate);
    formData.append('vetDegree', vetDegree);
    formData.append('vetName', vetName);

    try {
      return this.api.put(`pet-health-books/${healthBookDetailId}`, formData);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new PetService();
