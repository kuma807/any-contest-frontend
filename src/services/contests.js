import axios from 'axios'
const baseUrl = '/api/contests/'

const filterContests = async (tiemQuery) => {
  const response = await axios.post(`${baseUrl}search_by_date`, tiemQuery);
  return response.data;
}

const getContest = async (contestName) =>
{
  const response = await axios.get(`${baseUrl}${contestName}`);
  return response.data;
}

export {filterContests, getContest};