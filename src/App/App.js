import React, { useEffect, useState, useContext } from 'react';
import { Cards, Chart, Countries } from './Components';
import styles from './App.module.css';
import { getData } from './api';
import { createMuiTheme, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {
    fetchData();
  }, []);
  const customTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  async function fetchData() {
    const response = await getData();
    setData(response);
  }
  const handleCountryChange = async (newCountry) => {
    const response = await getData(newCountry);
    setData(response);
    setCountry(newCountry);
  };

  return (
    <div className={styles.container}>
      <ThemeProvider theme={customTheme}>
        <Countries handleCountryChange={handleCountryChange} />
        <Chart data={data} country={country} />
        <Cards data={data} />
      </ThemeProvider>
    </div>
  );
};

export default App;
