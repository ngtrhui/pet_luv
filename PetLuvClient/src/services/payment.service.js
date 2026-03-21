import ApiService from './api.service';

class PaymentsService {
  constructor() {
    this.api = new ApiService('http://localhost:5080/api/payments/');
  }

  async getPaymentHistories(userId) {
    try {
      return await this.api.get(`/api/users/${userId}/payments`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async IpnAction(params) {
    try {
      return await this.api.get(`IpnAction/?${params}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new PaymentsService();
