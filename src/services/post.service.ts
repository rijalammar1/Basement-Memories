import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_BASE_URL;

const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

/* =========================
   CREATE POST
========================= */
export const createPost = async (
  token: string,
  payload: {
    caption: string;
    imageUrl: string;
  },
) => {
  const response = await axios.post(`${apiURL}/api/v1/create-post`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

/* =========================
   GET POSTS
========================= */
export const getFollowingPosts = async (token: string) => {
  const response = await axios.get(`${apiURL}/api/v1/following-post?size=20&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data.data.posts || [];
};

/* =========================
   UPDATE POST
========================= */
export const updatePost = async (
  token: string,
  postId: string,
  payload: {
    caption: string;
    imageUrl: string;
  },
) => {
  const response = await axios.post(`${apiURL}/api/v1/update-post/${postId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

/* =========================
   DELETE POST
========================= */
export const deletePost = async (token: string, postId: string) => {
  const response = await axios.delete(`${apiURL}/api/v1/delete-post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data;
};

/* =========================
   LIKE POST
========================= */
export const likePost = async (token: string, postId: string) => {
  const response = await axios.post(
    `${apiURL}/api/v1/like`,
    {
      postId,
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

/* =========================
   UNLIKE POST
========================= */
export const unlikePost = async (token: string, postId: string) => {
  const response = await axios.post(
    `${apiURL}/api/v1/unlike`,
    {
      postId,
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

/* =========================
   CREATE COMMENT
========================= */
export const createComment = async (
  token: string,
  payload: {
    postId: string;
    comment: string;
  },
) => {
  const response = await axios.post(`${apiURL}/api/v1/create-comment`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

/* =========================
   DELETE COMMENT
========================= */
export const deleteComment = async (token: string, commentId: string) => {
  const response = await axios.delete(`${apiURL}/api/v1/delete-comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data;
};
