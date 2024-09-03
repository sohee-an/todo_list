import axios from 'axios';
import config from './config';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
