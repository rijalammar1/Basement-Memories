import axios from 'axios';

export async function getUser(token: string) {
  const apiURL = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

  const response = await axios.get(`${apiURL}/api/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: apiKEY || '',
    },
  });

  return response.data.data;
}
