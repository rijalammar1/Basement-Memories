import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

export const createPost = async (
  token: string,
  payload: {
    caption: string;
    imageUrl: string;
  },
) => {
  const response = await axios.post(
    `${apiURL}/api/v1/create-post`,
    {
      caption: payload.caption,
      imageUrl: payload.imageUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY || '',
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};

export const getFollowingPosts = async (token: string) => {
  const response = await axios.get(`${apiURL}/api/v1/following-post?size=20&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data.data.posts || [];
};

export const updatePost = async (
  token: string,
  postId: number,
  payload: {
    caption: string;
    imageUrl: string;
  },
) => {
  try {
    const response = await axios.post(
      `${apiURL}/api/v1/update-post/${postId}`,
      {
        imageUrl: payload.imageUrl,
        caption: payload.caption,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY || '',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.log('UPDATE POST ERROR:', error?.response?.data || error.message);

    throw error;
  }
};

export const deletePost = async (token: string, postId: number) => {
  const response = await axios.delete(`${apiURL}/api/v1/delete-post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data;
};
