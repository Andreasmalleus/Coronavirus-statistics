import React from "react";
import Map from "./Map.jsx";
import "../../public/styles.css";
import Country from "../components/Country.jsx";

class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render(){

        const data = {
            Country: "Canada",
            CountryCode: "CA",
            Slug: "canada",
            NewConfirmed: 541,
            TotalConfirmed: 12978,
            NewDeaths: 39,
            TotalDeaths: 217,
            NewRecovered: 402,
            TotalRecovered: 2577,
            Date: "2020-04-05T06:37:00Z"
          };

        return (
            <div className="home">
                <div className="header">
                    <div className="title">Coronavirus statistics</div>
                </div>
                <div className="content">
                    <div className="section-one">
                        <Map />
                    </div>
                    <div className="section-two">
                        <Country data={data}/>
                        <div>Cases</div>
                        <div>Cases over time</div>
                        <div>Deaths over time</div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Home;
