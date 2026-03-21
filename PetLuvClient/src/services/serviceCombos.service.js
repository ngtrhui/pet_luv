import ApiService from './api.service';

class ServiceCombo {
  constructor() {
    this.api = new ApiService('http://localhost:5020/api/service-combos/');
  }

  async getAll(params = {}) {
    const { pageIndex, pageSize } = params;

    const query = new URLSearchParams({
      pageIndex,
      pageSize,
    }).toString();

    try {
      const response = await this.api.get(`?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(serviceComboId) {
    try {
      const response = await this.api.get(`${serviceComboId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getServices(serviceComboId) {
    try {
      return await this.api.get(`${serviceComboId}/services`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ServiceCombo();
