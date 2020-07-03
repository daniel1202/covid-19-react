import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './Countries.module.css';
import { getCountriesList } from '../../api/index';
const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    getAPI();
  }, [setCountries]);
  const getAPI = async () => {
    setCountries(await getCountriesList());
  };
  const selectCountry = (e) => {
    handleCountryChange(e.target.value);
  };
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={selectCountry} defaultValue=''>
        <option value=''>World</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
export default Countries;
