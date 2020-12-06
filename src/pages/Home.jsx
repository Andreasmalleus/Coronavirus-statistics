import React from "react";
import Map from "./Map.jsx";
import "../../public/styles.css";
import Country from "../components/Country.jsx";
import Cases from "../components/Cases.jsx";
import {data, data2, casesByCountry, deathsByCountry, news} from "../../data.js"
import Graph from "../components/Graph.jsx";
import News from "../components/News.jsx";
import logo from "../../public/images/logo.png";
const axios = require('axios');

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedCountry : "Estonia",
            global : {},
            countries : []
        }
    }

    componentDidMount(){
        console.log(this.state);
    }

    selectCountry = (country) => {
        if(this.selectedCountry != country){
            this.setState({
                selectCountry : country
            })
            console.log(country);
        }
    }

    _/*fetchSummary = () => {
        axios.get('https://api.covid19api.com/summary')
        .then((res) => {
            this.setState({
                global : res.data.Global,
                countries : res.data.Countries
            })
            console.log(this.state);
        })
        .catch((err) => console.log(err))
    }*/

    render(){

        return (
            <div className="home">
                <div className="header">
                    <img src={logo} alt=""/>
                    <div className="title">Coronavirus statistics</div>
                </div>
                <div className="content">
                    <div className="section-one">
                        <Map selectCountry={this.selectCountry}/>
                    </div>
                    <div className="section-two">
                        <div className="statistics">
                            <Country data={this.state.countries}/>
                            <Cases {...data2}/>
                            <div className="cases-overtime">
                                <div className="title">Cases overtime</div>
                                <div className="country-name">{this.state.selectedCountry}</div>
                                <Graph data={casesByCountry} chartName={"cases-overtime-chart"}/>
                            </div>
                            <div className="deaths-overtime">
                                <div className="title">Deaths overtime</div>
                                <div className="country-name">{this.state.selectedCountry}</div>
                                <Graph data={deathsByCountry} chartName={"deaths-overtime-chart"}/>
                            </div>
                        </div>
                        <News data={news.articles} country={this.state.selectedCountry}/>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Home;
