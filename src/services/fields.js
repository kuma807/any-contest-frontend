import axios from 'axios'
const baseUrl = '/api/fields/'

const getFieldNames = async () => {
  const response = await axios.get(`${baseUrl}name`);
  return response.data;
}

export {getFieldNames};