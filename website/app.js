/* Global Variables */
// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e0f0dfcb2e087d673fe7668cb695ecfb&units=imperial';

//Get the date
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', generate);
function generate(e) {
  const zip = document.getElementById('zip').value;
  const feeling = document.getElementById('feelings').value;

  getWeather(baseURL, zip, apiKey).then(function (data) {
      postData('/add', { date: newDate, temp: data.main.temp, content:feeling})}).then(function (dataa) {
      updateUI()
    })
}

const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log(error);
  }
};