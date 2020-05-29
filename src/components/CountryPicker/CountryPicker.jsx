import React, {useState, useEffect} from "react";

import{ NativeSelect, FormControl } from "@material-ui/core";

import styles from './CountryPicker.module.css'

import {fetchCountries} from "../../api";

const CountryPicker = () => {
    const [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        const fetchCountriesAPI = async () => {
            setCountriesData(await fetchCountries());
        };

        fetchCountriesAPI()
    }, [setCountriesData]);

    // console.log(countriesData)


    return (
       <FormControl className={styles.container}>
           <NativeSelect>
               <option value="global">Global</option>
               {countriesData.map((country,i) => <option key={i} value={country}>{country}</option>)}
           </NativeSelect>
       </FormControl>
    )
};

export default CountryPicker;
