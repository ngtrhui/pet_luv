import ApiService from './api.service';

class BookingService {
  constructor() {
    this.api = new ApiService('http://localhost:5010/api/bookings/');
  }

  async getBookingHistory(userId) {
    try {
      return await this.api.get(`/api/users/${userId}/bookings`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createBooking(payload) {
    try {
      const response = await this.api.post('', payload);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new BookingService();
