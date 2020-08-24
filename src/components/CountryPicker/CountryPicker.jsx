import React, {useState, useEffect} from "react";

import{ NativeSelect, FormControl } from "@material-ui/core";

import styles from './CountryPicker.module.css'

import {fetchCountries} from "../../api";

// After we setup the country state and the handleCountryChange function in App.js,
// Then CountryPicker can make use of that coming through props:
// So here we can immediately destructed it "(props), const {handleCountryChange} = props";  and use it in the <NativeSelect>
const CountryPicker = ({ handleCountryChange }) => {
    const [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        const fetchCountriesAPI = async () => {
            setCountriesData(await fetchCountries());
        };

        fetchCountriesAPI()
        // [setCountriesData] means "if present, effect will only active if the value in the list change."
        // so this fectchCountriesAPI only works when we click and make changes
    }, [countriesData]);

    // console.log(countriesData)


    return (
       <FormControl className={styles.container}>
           {/*so here, we set the defaultValue is empty, and create onChange event*/}
           {/*this onChange event is a callback function by using handleCountryChange function*/}
           {/*and the parameter is the event.target.value*/}
           <NativeSelect defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
               <option value="">Global</option>
                {/*the way to dynamically get all countries is to use map method as below:*/}
                {/*inside the map, we use option, the text and value are both mapped {country},*/}
                {/*and there is a react rule that we also need to provide the a key whenever we are mapping over*/}
                {/*something in react, and key={i}, i will be the index, and the i is the 2nd parameter to the map*/}
                {countriesData.map((country,i) => <option key={i} value={country}>{country}</option>)}
           </NativeSelect>
       </FormControl>
    )
};

export default CountryPicker;
