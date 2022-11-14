

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://youtube138.p.rapidapi.com/search/',
  params: {q: 'despacito', hl: 'en', gl: 'US'},
  headers: {
    'X-RapidAPI-Key': 'b31eab2b68msh53d06c4c9c6e3cap115a61jsn855de5b279b2',
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
