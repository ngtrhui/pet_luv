import ApiService from './api.service';

class AuthService {
  constructor() {
    this.api = new ApiService('http://localhost:5050/api/');
  }

  async login(credentials) {
    const { email, password } = credentials;

    try {
      const response = await this.api.post('login', { email, password });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async register(registerInfo) {
    try {
      const response = await this.api.post('register', registerInfo);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(credentials) {
    try {
      return await this.api.post(`change-password`, credentials);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new AuthService();
