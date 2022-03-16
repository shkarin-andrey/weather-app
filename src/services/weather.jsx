import axios from "axios";

const API_KEY = "94d5166542119669e244ca320fde243f";
const URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeatherCity = async (sity, setState) => {
  try {
    const resp = await axios.get(`${URL}?q=${sity}&lang=ru&appid=${API_KEY}`);
    await setState(resp.data);
  } catch (e) {
    console.log(e);
  }
};
