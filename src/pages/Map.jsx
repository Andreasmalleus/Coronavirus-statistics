import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
const axios = require('axios');

class Map extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            countries : []
        }
    }

    fetchCountries = () => {
        return axios.get('https://api.covid19api.com/summary')
        .then((res) => {
            return res.data.Countries
        })
    }

    onClick = (e) => {
        //e.target.series.chart.zoomToMapObject(e.target);
        console.log(e.target.dataItem.dataContext.name);
    }

    componentDidMount(){

        let map = am4core.create("chartdiv", am4maps.MapChart);

        map.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/worldHigh.json";
        
        //using miller projection
        map.projection = new am4maps.projections.Miller();

        //polygonseries in order to draw the map
        let polygonSeries = new am4maps.MapPolygonSeries();

        map.zoomControl = new am4maps.ZoomControl();
        map.zoomControl.valign = "top";

        //data for the polygonseries
        polygonSeries.useGeodata = true;

        this.fetchCountries().then((res) => {
            res.map((country) => Object.assign(country, {id: country.CountryCode}))
            polygonSeries.data = res;
        })

        console.log(this.state);

        map.series.push(polygonSeries);

        polygonSeries.heatRules.push({
            "property": "fill",
            "target": polygonSeries.mapPolygons.template,
            "min": am4core.color("#ffffff"),
            "max": am4core.color("#AAAA00"),
            "logarithmic": true
        });

        /*let heatLegend = map.createChild(am4maps.HeatLegend);
        heatLegend.valign = "bottom";
        heatLegend.width = 200
        heatLegend.orientation = "horizontal";
        heatLegend.series = polygonSeries;
        heatLegend.width = am4core.percent(100);
        heatLegend.valueAxis.renderer.minGridDistance = 30;
        heatLegend.markerContainer.height = 20;
        heatLegend.markerCount = 10;*/

        // Configure series
        // "{name}\nTotal Cases : {TotalConfirmed}\n Deaths {TotalDeaths}";
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}\nTotal Cases : {TotalConfirmed}\n Deaths {TotalDeaths}";
        polygonTemplate.fill = am4core.color("#1a2b50");
        polygonTemplate.stroke = am4core.color("#4b66a6");
        polygonTemplate.strokeDasharray = "2,1";
        polygonTemplate.clickable = true

        //click event
        polygonTemplate.events.on("hit", (e) => {
            let country = e.target.dataItem.dataContext.name;
            this.props.selectCountry(country);
        }, this)

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#3a559a");

        polygonSeries.exclude = ["AQ"];

        //zoom to estonia
        map.events.on("ready", function(ev) {
            map.zoomToMapObject(polygonSeries.getPolygonById("EE"));
          });

        this.map = map;
    }

    componentWillUnmount(){
        if(this.map){
            this.map.dispose();
        }
    }

    render(){
        return (
            <div id="chartdiv" className="map"></div>
        )
    }
}

export default Map;