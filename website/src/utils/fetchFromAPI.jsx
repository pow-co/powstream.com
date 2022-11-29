import axios from 'axios';

export const BASE_URL = 'https://youtube138.p.rapidapi.com';

/*const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key':'b31eab2b68msh53d06c4c9c6e3cap115a61jsn855de5b279b2',
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
  },
};*/

const options = {

};

export const fetchFromAPI = async (path, params) => {

  console.log('PARAMS', params)
  const { data } = await axios.request({
    method: 'GET',
    url: `https://youtube138.p.rapidapi.com/${path}`,
    params,
    headers: {
      'X-RapidAPI-Key': 'b31eab2b68msh53d06c4c9c6e3cap115a61jsn855de5b279b2',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  });

  return data;
};