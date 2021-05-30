import axios from 'axios'
const baseUrl = '/api/answers'

const createAnswer = async (answerData) => {
  const storage = JSON.parse(localStorage.getItem("loggedUser"));
  if (storage === null) {
    return [];
  }
  const Authorization = `bearer ${storage.token}`;
  const response = await axios.post(`${baseUrl}`, answerData, { headers: { Authorization }});
  return response.data;
}

export {createAnswer};