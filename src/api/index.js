import axios from 'axios'

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }
    // Here, when we setup the if condition, we can pass the changeableUrl into below axios.get(changeableUrl)
    // So when we calling this fetchData without the specific country, we get all countries' data from normal url
    // but when there is a country, it will correspond that specific country data

    try {
        const {data: { confirmed, recovered, deaths, lastUpdate }} = await axios.get(changeableUrl);
        return { confirmed, recovered, deaths, lastUpdate };

    } catch (e) {
        console.log(e)
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        // console.log(data);

        // since the data is an array, and inside the array are many objects,
        // what we need are the properties of each object, so need to use array map method to get every object
        // and return the specific value of each object, and because there are more than one item(confirmed, deaths and reportDate) need to be fetched from the web api data,
        // that's why it's not feasible to destruct the data from above await and get method,
        // because we CANNOT use map method for multiple properties as this:
        // const {data: {confirmed, deaths, reportDate}} = await axios.get(url); return {confirmed, deaths, reportDate}.map ==> no such way to use map

        // So the way to map the response(data) and get inside value is fetch data first and use map method in the return block
        // Also, the result of map is an new array, we still need to return an object instantly,
        // so the way is: add parentheses and put curly brace inside, which is the object

        // since reportDate is not an object, it's just an string, so we can write date only

        return data.map(({ confirmed, deaths, reportDate }) =>
            ({ confirmed: confirmed.total, deaths: deaths.total, date: reportDate}));

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
