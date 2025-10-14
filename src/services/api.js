// services/api.js
const API_BASE_URL = import.meta.env.PROD
  ? '/api/v1'
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1');

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Erreur HTTP: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("Erreur API:", error);
      throw error;
    }
  }

  async login(credentials) {
    return this.request("/user/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async getUserProfile() {
    return this.request("/user/profile", {
        method: 'GET'
    });
  }

  async updateUserProfile(userData) {
    return this.request("/user/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }
}

const apiService = new ApiService();
export default apiService;
