import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export default {
  async getAll() {
    const res = await api.get('/products');
    return res.data;
  },
  async reserve(id) {
    // simulación: en backend real harías un POST o PATCH
    return { success: true, message: `Product ${id} reserved.` };
  }
}