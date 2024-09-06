import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // İstek öncesi yapılacak işlemler
    this.api.interceptors.request.use(
      (config) => {
        // Örneğin, yetkilendirme token'ı eklemek için kullanılabilir
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Yanıt sonrası yapılacak işlemler
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Hata durumlarını merkezi olarak yönetmek için kullanılabilir
        if (error.response && error.response.status === 401) {
          // Örneğin, yetkilendirme hatası durumunda kullanıcıyı giriş sayfasına yönlendirme
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  get(endpoint, params = {}) {
    return this.api.get(endpoint, { params });
  }

  post(endpoint, data) {
    return this.api.post(endpoint, data);
  }

  put(endpoint, data) {
    return this.api.put(endpoint, data);
  }

  delete(endpoint) {
    return this.api.delete(endpoint);
  }
}

export default new ApiService();
