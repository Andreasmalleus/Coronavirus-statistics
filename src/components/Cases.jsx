import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import worldwide from "../../public/images/worldwide.png";

const Cases = ({global, country, selectCountry}) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if(!countries.includes(country)){
            setCountries(
                [
                    ...countries,
                    country
                ]
            )
        }
    }, [country])

    return (
        <div className="cases">
            <div className="title">Cases</div>
            <table className="cases-table">
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Total Cases</th>
                        <th>New Cases (1 day)</th>
                        <th>Deaths</th>
                        <th>New Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="country-cell">
                            <img src={worldwide} className="worldwide-icon"/>
                            WorldWide
                        </td>
                        <td>{global.TotalConfirmed}</td>
                        <td>{global.NewConfirmed}</td>
                        <td>{global.TotalDeaths}</td>
                        <td>{global.NewDeaths}</td>
                    </tr>
                    {countries != [] ?
                        countries.map((country) => (
                                <tr key={country.CountryCode} className="cases-row" onClick={() => selectCountry(country)}>
                                    <td className="country-cell">
                                        <ReactCountryFlag 
                                            countryCode={country.CountryCode} 
                                            svg 
                                            style={{
                                                marginRight : "2px"
                                            }}
                                        />
                                        {country.Country}
                                    </td>
                                    <td>{country.TotalConfirmed}</td>
                                    <td>{country.NewConfirmed}</td>
                                    <td>{country.TotalDeaths}</td>
                                    <td>{country.NewDeaths}</td>
                                </tr>
                            )
                        )
                    :
                    null}
                </tbody>
            </table>
        </div>
    )
}

export default Cases;


