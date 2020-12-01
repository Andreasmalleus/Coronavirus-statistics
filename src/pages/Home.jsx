import React from "react";
import Chart from "./Chart.jsx";
import "../../public/styles.css";

class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="home">
                <div className="home-header">
                    <div className="title">Coronavirus statistics</div>
                </div>
                <Chart />
                <div className="table">
                    
                </div>
            </div>
        )
    }
}

export default Home;