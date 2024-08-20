import axios, { AxiosInstance } from 'axios';

import config from './config';

const instance: AxiosInstance = axios.create({
  baseURL: config.host,
});

// instance.interceptors.request.use(
//   (config) => {
//     /**
//      * HTTP Authorization 요청 헤더에 jwt-token을 넣음
//      * 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청
//      */
//     const token = window.localStorage.getItem('token');

//     try {
//       if (token) {
//         config.headers.Authorization = `${token}`;
//       }

//       return config;
//     } catch (err) {
//       console.error('[_axios.interceptors.request] config : ' + err);
//     }
//     return config;
//   },
//   (error) => {
//     // 요청 에러 직전 호출됩니다.
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     /**
//      * http status가 200인 경우 응답 성공 직전 호출
//      */

//     const token = response.headers.getAuthorization; // 새로운 토큰을 응답 헤더에서 추출
//     console.log('token', token);

//     if (token) {
//       window.localStorage.setItem('token', token.toString()); // 새로운 토큰을 로컬 스토리지에 저장
//     }

//     return response;
//   },

//   async (error) => {
//     const statusCode = error.response.status;

//     /**
//      * http status가 200이 아닌 경우 응답 에러 직전 호출
//      */
//     if (error.response) {
//       switch (statusCode) {
//         case 401: // 로그인중복
//           break;
//         case 403:
//           break;

//         default:
//           return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

//
export default instance;
