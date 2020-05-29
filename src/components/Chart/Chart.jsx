import React, {useState, useEffect} from "react";

import {fetchDailyData} from "../../api";

import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);  // initial state will be an empty array from the fetched API website, as the daily data are all array data

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        // console.log(dailyData);
        fetchAPI();
    });

    const lineChart = (
        // since dailyData is an array, it has the length,
        // so the condition is if the length exist, then show below chart,
        // if not show null
        dailyData.length ?
            (
                <Line
                    data={{
                        // Again, here dailyData is an array of many objects from fetchDailyData, and their names are confirmed, deaths and date
                        // so if we want to see specific property, we need to map each property first and put them inside of an object
                        labels: dailyData.map(({ date }) => date),
                        // fixed syntax: datasets --> all small cases
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            data: dailyData.map(({deaths}) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true,
                        }]
                    }}
                />
            ) : null
    );


    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
};

export default Chart
