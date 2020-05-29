import React from "react";
import styles from './App.module.css'

// import Cards from './components/Cards';
// import Chart from './components/Chart';
// import CountryPicker from './components/CountryPicker'

import {Cards, Chart, CountryPicker} from './components';

import {fetchData} from "./api";

class App extends React.Component{
    state = {
        data:{},         // initiate with empty data object
        country: '',
    };

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});

        // console.log(fetchedData)
    }

    render() {
        const { data } = this.state;
        return (
            <div className={styles.container}>
               <Cards data={data}/>
                <CountryPicker />
               <Chart />

            </div>
        )
    }
}

export default App;
