import apiClient from '..';

export const fetchPostImage = async (params: any) => {
  try {
    const response = await apiClient.post('/common/image', params);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'File upload failed');
  }
};

export const fetchDeleteImage = async (imageId: string) => {
  try {
    const response = await apiClient.delete(`/common/image`, {
      params: { imageId },
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'File upload failed');
  }
};
