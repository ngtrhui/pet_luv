import ApiService from './api.service';

class ServicesService {
  constructor() {
    this.api = new ApiService('http://localhost:5020/api/services/');
  }

  async getServices(params = {}) {
    const { serviceType = '', showAll = false, pageIndex, pageSize } = params;
    const query = new URLSearchParams({
      serviceType,
      showAll,
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

  async getServiceById(serviceId) {
    try {
      const response = await this.api.get(`${serviceId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getVariants(serviceId) {
    try {
      const response = await this.api.get(`${serviceId}/service-variants`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ServicesService();
