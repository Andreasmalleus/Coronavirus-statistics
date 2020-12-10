import React from "react";
import Map from "../components/Map.jsx";
import "../../public/styles.css";
import Country from "../components/Country.jsx";
import Cases from "../components/Cases.jsx";
import {data2} from "../../data.js"
import Graph from "../components/Graph.jsx";
import News from "../components/News.jsx";
import logo from "../../public/images/logo.png";
const axios = require('axios');
import ClipLoader from "react-spinners/ClipLoader";

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedCountry : null,
            global : {},
            countries :[],
            deathsByCountry : [],
            casesByCountry : [],
            news : [],
            loading : true
        }
    }

    componentDidMount(){
        this.fetchSummary()
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.selectedCountry !== this.state.selectedCountry){
            this.fetchCasesByCountry();
            this.fetchDeathsByCountry();
            this.fetchNews();
        }
    }

    selectCountry = (country) => {
        if(this.selectedCountry != country){
            this.setState({
                selectedCountry : country
            })
        }
        console.log(this.state.selectedCountry.Slug);

    }
    
    getCountryFromCountriesByName = (countries, name) => {
        return countries.find((country) => country.Country == name);
    }

    fetchSummary = () => {
        axios.get('https://api.covid19api.com/summary')
        .then((res) => {
            res.data.Countries.map((country) => Object.assign(country, {id: country.CountryCode}))
            this.setState({
                global : res.data.Global,
                countries : res.data.Countries,
                selectedCountry : this.getCountryFromCountriesByName(res.data.Countries, "Estonia"),
                loading : false
            })
        })
        .catch((err) => console.log(err))
        .then(() => {
            this.fetchCasesByCountry();
            this.fetchDeathsByCountry();
            this.fetchNews();
        })
    }

    fetchNews = () => {
        axios.get(`http://newsapi.org/v2/top-headlines?q=Coronavirus&country=${this.state.selectedCountry.id}&sortBy=popularity&apiKey=${process.env.API_KEY}`)
        .then((res) => {
            this.setState({
                news : res.data.articles
            })
        })
        .catch((err) => console.log(err))
    }

    fetchCasesByCountry = () => {
        axios.get(`https://api.covid19api.com/dayone/country/${this.state.selectedCountry.Slug}/status/confirmed`)
        .then((res) => {
            this.setState({
                casesByCountry : res.data
            })
        })
        .catch((err) => console.log(err))
    }

    fetchDeathsByCountry = () => {
        axios.get(`https://api.covid19api.com/dayone/country/${this.state.selectedCountry.Slug}/status/deaths`)
        .then((res) => {
            this.setState({
                deathsByCountry : res.data
            })
        })
        .catch((err) => console.log(err));
    }
    render(){
        if(this.state.selectedCountry != null){
            return (
                <div className="home">
                    <div className="header">
                        <img src={logo} alt=""/>
                        <div className="title">Coronavirus statistics</div>
                    </div>
                    <div className="content">
                        <div className="section-one">
                            <Map data={this.state.countries} selectCountry={this.selectCountry}/>
                        </div>
                        <div className="section-two">
                            <div className="statistics">
                                <Country data={this.state.selectedCountry}/>
                                <Cases global={this.state.global} country={this.state.selectedCountry} selectCountry={this.selectCountry}/>
                                <div className="cases-overtime">
                                    <div className="title">Cases overtime</div>
                                    <div className="country-name">{this.state.selectedCountry.Country}</div>
                                    <Graph data={this.state.casesByCountry} chartName={"cases-overtime-chart"}/>
                                </div>
                                <div className="deaths-overtime">
                                    <div className="title">Deaths overtime</div>
                                    <div className="country-name">{this.state.selectedCountry.Country}</div>
                                    <Graph data={this.state.deathsByCountry} chartName={"deaths-overtime-chart"}/>
                                </div>
                            </div>
                            <News data={this.state.news} country={this.state.selectedCountry.Country}/>
                        </div>
                    </div> 
                </div>
            )
        }else{
            return  (
                <div className="loading">
                    <ClipLoader
                        size={100}
                        color={"#1a2b50"}
                        loading={this.state.loading}
                    />
                    Fetching...
                </div>
            )
        }
    }
}

export default Home;
