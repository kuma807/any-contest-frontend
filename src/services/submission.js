import axios from 'axios'
const baseUrl = '/api/submissions/'

const getUserSubmission = async () => {
  const storage = JSON.parse(localStorage.getItem("loggedUser"));
  console.log(storage);
  if (storage === null) {
    return [];
  }
  const Authorization = `bearer ${storage.token}`;
  const response = await axios.post(`${baseUrl}userid/`, {}, { headers: { Authorization }});
  return response.data;
}

const submit = async (submission) => {
  const Authorization = `bearer ${JSON.parse(localStorage.getItem("loggedUser"))["token"]}`;
  const response = await axios.post(baseUrl, submission,  { headers: { Authorization } });
  return response.data;
}

export {getUserSubmission, submit};