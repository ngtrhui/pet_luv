import ApiService from './api.service';

class UserService {
  constructor() {
    this.api = new ApiService('http://localhost:5050/api/');
  }

  async getUserById(userId) {
    try {
      const response = this.api.get(`${userId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateInfo(userId, payload) {
    try {
      const { fullName, gender, dateOfBirth, phoneNumber, address, avatar } =
        payload;

      const formData = new FormData();

      formData.append('fullname', fullName);
      formData.append('gender', gender);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('phoneNumber', phoneNumber);
      formData.append('address', address);
      formData.append('avatar', avatar);

      return await this.api.put(`users/${userId}`, formData);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new UserService();
