import axios from 'axios'
const baseUrl = '/api/problems/'

const getProblem = async (problemName) =>
{
  const response = await axios.get(`${baseUrl}${problemName}`);
  return response.data;
}

export {getProblem};