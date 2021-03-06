import axios from 'axios'
const baseUrl = '/api/ratings/'

const getQuery = async (query) => {
  const response = await axios.post(`${baseUrl}query/`, query);
  return response.data;
}

const getUserRating = async (userid) => {
  const response = await axios.get(`${baseUrl}userid/${userid}`)
  return response.data;
}

const getFieldRating = async (fieldName) => {
  const response = await axios.get(`${baseUrl}fieldName/${fieldName}`)
  return response.data;
}

export {getUserRating, getQuery, getFieldRating};