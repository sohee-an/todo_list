import apiClient from '..';

type fetchPostAssignmentReq = {
  dayNumber: number;
  title: string;
  description: string;
};

export const fetchPostAssignment = async (params: fetchPostAssignmentReq) => {
  try {
    const response = await apiClient.post('/assignment', params);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'File upload failed');
  }
};
