import axios from 'axios';

export const fetchProducts = async (token) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
