import React from "react";
import Map from "./Map.jsx";
import "../../public/styles.css";
import Country from "../components/Country.jsx";
import Cases from "../components/Cases.jsx";
import {data, data2, data3} from "../../data.js"
import Graph from "../components/Graph.jsx";

class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render(){

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
                        <div className="statistics">
                            <Country data={data}/>
                            <Cases {...data2}/>
                            <div className="cases-overtime">
                                <div className="title">Cases overtime</div>
                                <Graph data={data3} chartName={"cases-overtime-chart"}/>
                            </div>
                            <div>Deaths over time</div>
                        </div>
                        <div className="news">
                            News
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Home;
