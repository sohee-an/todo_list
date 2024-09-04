import apiClient from '..';
import { fetchAssignmentRes, fetchPostAssignmentReq } from './scheduleType';

export const fetchAssignment = async (): Promise<fetchAssignmentRes[]> => {
  try {
    const response = await apiClient.get('/assignment');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const fetchPostAssignment = async (params: fetchPostAssignmentReq) => {
  try {
    const response = await apiClient.post('/assignment', params);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const fetchDetailAssignment = async (assignmentId: string) => {
  try {
    const response = await apiClient.get(`/assignment/${assignmentId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
