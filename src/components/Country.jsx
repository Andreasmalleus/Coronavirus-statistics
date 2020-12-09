import React from "react";
import Graph from "./Graph.jsx";

const Country = ({data}) => {

    return (
        <div className="country">
            <div className="title">{data.Country}</div>
            <div className="country-row">
                <div className="country-col">
                    <div className="">Total Cases</div>
                    <div className="country-total">{data.TotalConfirmed}</div>
                    <div className="country-reported">
                        <div>Reported yesterday: +</div>
                        <div className="country-new-confirmed">{data.NewConfirmed}</div>
                    </div>
                    <div>Updated: {data.Date}</div>
                </div>
                <div className="country-col">
                    <div className="country-graph">
                        Graph
                    </div>
                </div>
                <div className="country-col">
                    <div>Deaths</div>
                    <div className="country-total">{data.TotalDeaths}</div>
                    <div className="country-reported">
                        <div>Reported yesterday: </div>
                        <div className="country-new-confirmed">+{data.NewDeaths}</div>
                    </div>
                    <div>Updated: {data.Date}</div>
                </div>
            </div>
        </div>
    )
}

export default Country;