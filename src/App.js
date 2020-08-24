import React from "react";
import styles from './App.module.css'

// import Cards from './components/Cards';
// import Chart from './components/Chart';
// import CountryPicker from './components/CountryPicker'

import {Cards, Chart, CountryPicker} from './components';

import {fetchData} from "./api";

import covid19Image from './images/image-covid19.png'

class App extends React.Component{
    state = {
        data:{},         // initiate with empty data object

        // we won't be keeping the state of chosen country in the CountryPicker.jsx,
        // rather it's going to be in its parent component, the App.js;
        // To make that work, we need to add the country in the state, and the initial value is empty
        // Next, we need to create a function that is going to change the state of the country
        country: '',
    };

    async componentDidMount() {
        const fetchedData = await fetchData();
        // update the state using this.setState({data: fetchedData})
        this.setState({data: fetchedData});
        // console.log(this.state.data)
    }

    // for controlling the country change function, it also an async function:
    handleCountryChange = async ( country )=> {
        // 1st, fetch the data
        // this fetch is same as above one to get the data, but specifically for country, that's why we add the parameter country in api call
        const fetchedData = await fetchData(country);
        // console.log(fetchedData)

        // 2nd, set the state, except update the data, we also update the country
        this.setState({data: fetchedData, country: country})

         // 3rd, we are going to pass this method as prop inside of CountryPicker component
    };


    render() {
        const { data, country } = this.state;
        return (
            <div className={ styles.container }>
                <img className={styles.image} src={covid19Image} alt='COVID-19' />
               <Cards data={ data }/>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
               <Chart data={ data } country = { country }/>

            </div>
        )
    }
}

export default App;
