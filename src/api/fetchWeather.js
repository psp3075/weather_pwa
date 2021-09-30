import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "c0bd7a9a78768d24c0f1109c9a9b2011";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    //destructure response
    params: {
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });
  
  return data;
};
