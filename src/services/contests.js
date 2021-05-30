import axios from 'axios'
const baseUrl = '/api/contests/'

const filterContests = async (Query) => {
  const response = await axios.post(`${baseUrl}search_by_date`, Query);
  return response.data;
}

const getContest = async (contestName) => {
  const response = await axios.get(`${baseUrl}${contestName}`);
  return response.data;
}

const makeContest = async (contestDate) => {
  const storage = JSON.parse(localStorage.getItem("loggedUser"));
  if (storage === null) {
    return [];
  }
  const Authorization = `bearer ${storage.token}`;
  const response = await axios.post(baseUrl, contestDate, { headers: { Authorization }});
  return response.data;
}

const getRanking = async (contestName) => {
  const response = await axios.get(`${baseUrl}ranking/${contestName}`);
  return response.data;
}

const register = async (contestName) => {
  const Authorization = `bearer ${JSON.parse(localStorage.getItem("loggedUser"))["token"]}`;
  const response = await axios.post(`${baseUrl}register/`, {contestName: contestName}, {headers: { Authorization }});
  return response.data;
}

const unregister = async (contestName) => {
  const Authorization = `bearer ${JSON.parse(localStorage.getItem("loggedUser"))["token"]}`;
  const response = await axios.post(`${baseUrl}unregister/`, {contestName: contestName}, {headers: { Authorization }});
  return response.data;
}

const checkRegistered = async ({contestName, userid}) => {
  const response = await axios.post(`${baseUrl}check_registered/`, {contestName: contestName, userid: userid});
  return response.data;
}

export {filterContests, getContest, makeContest, getRanking, register, unregister, checkRegistered};