import React from "react";
import styles from './App.module.css'

// import Cards from './components/Cards';
// import Chart from './components/Chart';
// import CountryPicker from './components/CountryPicker'

import {Cards, Chart, CountryPicker} from './components';

import {fetchData} from "./api";

class App extends React.Component{

    async componentDidMount() {
        const data = await fetchData();
        console.log(data)
    }

    render() {
        return (
            <div className={styles.container}>
               <Cards />
                <CountryPicker />
               <Chart />

            </div>
        )
    }
}

export default App;
