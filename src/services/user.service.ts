import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

export const getProfile = async (token: string) => {
  const response = await axios.get(`${apiURL}/api/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data.data;
};

export const getUserPosts = async (token: string, userId: string) => {
  const response = await axios.get(`${apiURL}/api/v1/users-post/${userId}?size=20&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data.data.posts || [];
};

export const getAllUsers = async (token: string) => {
  const response = await axios.get(`${apiURL}/api/v1/all-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data.data || [];
};

export const updateProfile = async (
  token: string,
  payload: {
    name: string;
    username: string;
    email: string;
    profilePictureUrl: string;
    phoneNumber: string;
    bio: string;
    website: string;
  },
) => {
  const response = await axios.post(`${apiURL}/api/v1/update-profile`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const getUserById = async (token: string, userId: string) => {
  const response = await axios.get(`${apiURL}/api/v1/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data.data;
};
