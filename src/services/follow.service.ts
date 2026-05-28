import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_BASE_URL;

const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

export const followUser = async (token: string, userId: string) => {
  const response = await axios.post(
    `${apiURL}/api/v1/follow`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY || '',
      },
    },
  );

  return response.data;
};

export const unfollowUser = async (token: string, userId: string) => {
  const response = await axios.post(
    `${apiURL}/api/v1/unfollow`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY || '',
      },
    },
  );

  return response.data;
};
