import axios from 'axios';

const API_URL = 'http://localhost:3001/feature-flags';

export const fetchFeatureFlags = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar feature flags:', error);
    throw error;
  }
};

export const updateFeatureFlag = async (name: string, status: number) => {
  try {
    await axios.post(API_URL, { name, status });
  } catch (error) {
    console.error('Erro ao atualizar feature flag:', error);
    throw error;
  }
};
