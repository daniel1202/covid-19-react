import axios from 'axios';
const URL = 'https://covid19.mathdro.id/api';
export const getData = async (country) => {
  let newURL = URL;
  if (country) {
    newURL = URL + '/countries/' + country;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(newURL);
    const modifiedData = { confirmed, recovered, deaths, lastUpdate };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
export const getDaily = async () => {
  try {
    const { data } = await axios.get(URL + '/daily');
    const modifiedData = data.map((daily) => ({
      confirmed: daily.confirmed.total,
      deaths: daily.deaths.total,
      date: daily.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
export const getCountriesList = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(URL + '/countries');
    const modifiedData = countries.map((country) => country.name);
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
