import React, { useRef, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";

const Map = ({data, selectCountry}) => {

    const map = useRef(null);

    function initializeMap(){
        map.current = am4core.create("chartdiv", am4maps.MapChart);

        map.current.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/worldHigh.json";
        
        //using miller projection
        map.current.projection = new am4maps.projections.Miller();

        //polygonseries in order to draw the map
        let polygonSeries = new am4maps.MapPolygonSeries();

        map.current.zoomControl = new am4maps.ZoomControl();
        map.current.zoomControl.valign = "top";

        //data for the polygonseries
        polygonSeries.useGeodata = true;

        polygonSeries.data = data;

        map.current.series.push(polygonSeries);

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}\nTotal Cases : {TotalConfirmed}\n Deaths {TotalDeaths}";
        polygonTemplate.fill = am4core.color("#1a2b50");
        polygonTemplate.stroke = am4core.color("#4b66a6");
        polygonTemplate.strokeDasharray = "2,1";
        polygonTemplate.clickable = true

        //click event
        polygonTemplate.events.on("hit", (e) => {
            console.log(e.target.dataItem.dataContext);
            let country = {
                name: e.target.dataItem.dataContext.name,
                code : e.target.dataItem.dataContext.CountryCode
            };
            selectCountry(country);
        }, this)

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#3a559a");

        polygonSeries.exclude = ["AQ"];

        //zoom to estonia
        map.current.events.on("ready", function(ev) {
            map.current.zoomToMapObject(polygonSeries.getPolygonById("EE"));
          });
    }

    useEffect(() => {
        if(!map.current){
            initializeMap()
        }
        return () => {
            map.current && map.current.dispose();
        };
    }, []);
  
    useEffect(() => {
        if(map.current){
            map.current.dispose();
            initializeMap()
        }
    }, [data])
  
    useEffect(() => {
        return () => {
            map.current && map.current.dispose();
        }
    }, [])

    return (
        <div id="chartdiv" className="map"></div>
    )

}


export default Map;