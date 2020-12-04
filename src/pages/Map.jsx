import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";

class Map extends React.Component{

    constructor(props){
        super(props)
    }

    fetchData = () => {

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

        polygonSeries.data = [
            {
                "Country": "United States of America",
                "id": "US",
                "Slug": "united-states",
                "NewConfirmed": 138903,
                "TotalConfirmed": 13383320,
                "NewDeaths": 826,
                "TotalDeaths": 266873,
                "NewRecovered": 41967,
                "TotalRecovered": 5065030,
                "Date": "2020-11-30T13:33:50Z",
                "value" : 1000
            },
        ]

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
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {TotalConfirmed}\n";
        polygonTemplate.fill = am4core.color("#1a2b50");
        polygonTemplate.stroke = am4core.color("#4b66a6");
        polygonTemplate.strokeDasharray = "2,1";
        polygonTemplate.clickable = true

        //click event
        polygonTemplate.events.on("hit", (e) => this.onClick(e), this)

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