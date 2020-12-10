import React, { useRef, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";

const Map = ({data, selectCountry}) => {

    const map = useRef(null);

    const initializeMap = () =>{
        map.current = am4core.create("chartdiv", am4maps.MapChart);

        map.current.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/worldHigh.json";
        
        //using miller projection
        map.current.projection = new am4maps.projections.Miller();

        //represented as map areas
        var polygonSeries = map.current.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ["AQ"];
        polygonSeries.useGeodata = true;

        polygonSeries.calculateVisualCenter = true;

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.fill = am4core.color("#1a2b50");
        polygonTemplate.stroke = am4core.color("#4b66a6");
        polygonTemplate.strokeDasharray = "2,1";
        polygonTemplate.clickable = true

        //adding visual objects
        let imageSeries = map.current.series.push(new am4maps.MapImageSeries());
        imageSeries.data = data;
        imageSeries.dataFields.value = "TotalConfirmed";

        let imageTemplate = imageSeries.mapImages.template;
        imageTemplate.nonScaling = true

        let circle = imageTemplate.createChild(am4core.Circle);
        circle.fillOpacity = 0.7;

        circle.fill = "#3253b3";
        circle.tooltipText = "{Country}: [bold]{value}[/]";

        imageSeries.heatRules.push({
            "target": circle,
            "property": "radius",
            "min": 5,
            "max": 50,
            "dataField": "value"
        })

        //click event
        imageTemplate.events.on("hit", (e) => {
            let country = e.target.dataItem.dataContext;
            selectCountry(country);
        }, this)

        imageTemplate.adapter.add("latitude", function(latitude, target) {
            let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
            if(polygon){
                return polygon.visualLatitude;
            }
            return latitude;
        })
            
        imageTemplate.adapter.add("longitude", function(longitude, target) {
            let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
            if(polygon){
                return polygon.visualLongitude;
            }
            return longitude;
        })
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