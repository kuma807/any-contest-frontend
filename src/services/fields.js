import axios from 'axios'
const baseUrl = '/api/fields/'

const getFields = async () => {
  const response = await axios.get(`${baseUrl}name`);
  return response.data;
}

export {getFields};