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
            selectedCountry : {
                name : "Estonia",
                code : "EE"
            },
            test : "",
            global : {},
            countries :[],
            deathsByCountry : [],
            casesByCountry : [],
            news : [],
        }
    }

    componentDidMount(){
        //this.fetchCasesByCountry();
        //this.fetchDeathsByCountry();
        this.fetchNews();
    }

    selectCountry = (country) => {
        if(this.selectedCountry != country){
            this.setState({
                selectedCountry : country
            })
            //this.fetchCasesByCountry();
            //this.fetchDeathsByCountry();
            this.fetchNews();
        }
        console.log(this.state.selectedCountry.name);
    }

    fetchNews = () => {
        axios.get(`http://newsapi.org/v2/top-headlines?q=Coronavirus&country=${this.state.selectedCountry.code}&sortBy=popularity&apiKey=34467225a431470ea6415e27c3e56953`)
        .then((res) => {
            this.setState({
                news : res.data.articles
            })
        })
        .catch((err) => console.log(err))
    }

    fetchCasesByCountry = () => {
        axios.get(`https://api.covid19api.com/dayone/country/${this.state.selectedCountry.name}/status/confirmed`)
        .then((res) => {
            this.setState({
                casesByCountry : res.data
            })
        })
        .catch((err) => console.log(err))
    }

    fetchDeathsByCountry = () => {
        axios.get(`https://api.covid19api.com/dayone/country/${this.state.selectedCountry.name}/status/deaths`)
        .then((res) => {
            this.setState({
                deathsByCountry : res.data
            })
        })
        .catch((err) => console.log(err));
    }
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
                                <div className="country-name">{this.state.selectedCountry.name}</div>
                                <Graph data={this.state.casesByCountry} chartName={"cases-overtime-chart"}/>
                            </div>
                            <div className="deaths-overtime">
                                <div className="title">Deaths overtime</div>
                                <div className="country-name">{this.state.selectedCountry.name}</div>
                                <Graph data={this.state.deathsByCountry} chartName={"deaths-overtime-chart"}/>
                            </div>
                        </div>
                        <News data={this.state.news} country={this.state.selectedCountry.name}/>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Home;
