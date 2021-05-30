import axios from 'axios'
const baseUrl = '/api/problems/'

const getProblem = async (problemName) =>
{
  const response = await axios.get(`${baseUrl}${problemName}`);
  return response.data;
}

const createProblem = async (problemData) => {
  const storage = JSON.parse(localStorage.getItem("loggedUser"));
  if (storage === null) {
    return [];
  }
  const Authorization = `bearer ${storage.token}`;
  const response = await axios.post(`${baseUrl}`, problemData, { headers: { Authorization }});
  return response.data;
}

export {getProblem, createProblem};