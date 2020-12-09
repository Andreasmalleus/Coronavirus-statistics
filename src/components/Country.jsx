import React from "react";

const Country = ({data}) => {

    return (
        <div className="country">
            <div className="title">{data.Country}</div>
            <div className="country-row">
                <div className="country-col">
                    <div>Total Cases</div>
                    <div className="country-total">{data.TotalConfirmed}</div>
                    <div className="country-reported">
                        <div>Reported yesterday: +</div>
                        <div className="country-new-confirmed">{data.NewConfirmed}</div>
                    </div>
                </div>
                <div className="country-col">
                    <div>Recovered</div>
                    <div className="country-total">{data.TotalRecovered}</div>
                    <div className="country-reported">
                        <div>Reported yesterday:</div>
                        <div className="country-new-confirmed">+{data.NewRecovered}</div>
                    </div>
                </div>
                <div className="country-col">
                    <div>Deaths</div>
                    <div className="country-total">{data.TotalDeaths}</div>
                    <div className="country-reported">
                        <div>Reported yesterday: </div>
                        <div className="country-new-confirmed">+{data.NewDeaths}</div>
                    </div>
                </div>
            </div>
            <div className="update-date">Updated: {data.Date}</div>
        </div>
    )
}

export default Country;