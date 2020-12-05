import React from "react";

const Country = ({data}) => {

    return (
        <div className="country">
            <div className="country-title">{data.Country}</div>
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
                    <div>Graph</div>
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
            <div className="country-updated">Updated: {data.Date} Source Postman</div>
        </div>
    )
}

export default Country;