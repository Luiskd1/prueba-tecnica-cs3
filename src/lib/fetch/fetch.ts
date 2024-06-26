import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://api.mercadolibre.com/sites/MLA'
});

export const fetchApi = async (way:string) => {
  try {
    const response = await instance.get(way);
    return response.data; 
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
