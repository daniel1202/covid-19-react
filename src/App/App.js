import React, { useEffect, useState, useContext } from 'react';
import { Cards, Chart, Countries } from './Components';
import styles from './App.module.css';
import { getData,getTop10Confirmed } from './api';
import { Button, createMuiTheme, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import coronavirus from "./Images/coronavirus.svg"
export const options = {
  world:'WORLD',country:'COUNTRY',top10:'TOP10'
} 

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  const [currentOption,setCurrentOption] = useState(options.world)
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
    setCurrentOption(options.world)
    setData(response);
  }
  const handleCountryChange = async (newCountry) => {
    const response = await getData(newCountry);
    setCurrentOption(options.country)
    setData(response);
    setCountry(newCountry);
  };
  const fetchTop10Confirmed = async ()=>{
    const response = await getTop10Confirmed();
    setCurrentOption(options.top10)
    setData(response)
  }
  return (
    <div className={styles.container}>
      <ThemeProvider theme={customTheme}>
        <div className={styles.header}><Typography variant='h1' color='textPrimary' className={styles.title}>
          COVID -19
        </Typography> <img src={coronavirus}/></div>
        
        <Countries handleCountryChange={handleCountryChange} />
        {/* <Button onClick={fetchTop10Confirmed} color='secondary' variant='outlined'>Show Top 10 Confirmed</Button> */}
        <Cards data={data} />
        <Chart data={data} country={country} option={currentOption}/>
      </ThemeProvider>
    </div>
  );
};

export default App;
