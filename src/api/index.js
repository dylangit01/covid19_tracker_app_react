import axios from 'axios'

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {
        const {data: { confirmed, recovered, deaths, lastUpdate }} = await axios.get(url);
        return { confirmed, recovered, deaths, lastUpdate };

    } catch (e) {

    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        // console.log(data);

        // since the data is an array, and inside the array are many objects,
        // what we need are the properties of each object, so need to map the array first to get every object
        // and return the specific value of each object, that's why it's not feasible to destruct the data from above 'get' method
        // because we have to map the response(data) and get inside value;
        // and the result of map is an new array, we still need to return an object instantly,
        // so the way is => parentheses and put curly brace inside, which is the object

        // since reportDate is not an object, it's just an string, so we can write date only

        return data.map(({ confirmed, deaths, reportDate: date }) =>
            ({ confirmed: confirmed.total, deaths: deaths.total, date }));

    } catch (error) {
        console.log(error);
    }
};

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map( country => country.name);

        // console.log(response)

    } catch (e) {
        console.log(e)
    }
};
