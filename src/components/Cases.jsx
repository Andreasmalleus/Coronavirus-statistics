import React, { useEffect, useState } from "react";

const Cases = ({global, country}) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        setCountries(
            [
                ...countries,
                country
            ]
        )
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
                        <th>New cases (lifetime)</th>
                        <th>Deaths</th>
                        <th>New Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Woldwide</td>
                        <td>{global.TotalConfirmed}</td>
                        <td>{global.NewConfirmed}</td>
                        <td>Graph</td>
                        <td>{global.TotalDeaths}</td>
                        <td>{global.NewDeaths}</td>
                    </tr>
                    {countries != [] ?
                        countries.map((country) => (
                                <tr key={country.CountryCode}>
                                    <td>{country.Country}</td>
                                    <td>{country.TotalConfirmed}</td>
                                    <td>{country.NewConfirmed}</td>
                                    <td>Graph</td>
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


