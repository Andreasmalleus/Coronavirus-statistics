import React from "react";

const Cases = ({Global, Countries}) => {
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
                        <td>{Global.TotalConfirmed}</td>
                        <td>{Global.NewConfirmed}</td>
                        <td>Graph</td>
                        <td>{Global.TotalDeaths}</td>
                        <td>{Global.NewDeaths}</td>
                    </tr>
                    {Countries != null ?
                        Countries.map((country) => (
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


