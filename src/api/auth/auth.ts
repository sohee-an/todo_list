import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import apiClient from '..';
import { LoginRequest, RegisterRequest } from './authType';

export const fetchRegister = async (params: RegisterRequest) => {
  try {
    const response = await apiClient.post('/auth/signup/email', params);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const fetchLogin = async (params: LoginRequest) => {
  try {
    const response = await apiClient.post('/auth/signin/email', params);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const fetchRefreshToken = async () => {
  try {
    const response = await apiClient.get('/auth/refresh/token', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const Signup = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    const userId = userCredential.user.uid;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  } catch (error) {
    alert('비밀번호 혹은 아이디가 틀립니다.');
    console.error('Error logging in:', error);
  }
};
