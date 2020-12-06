import React, { useRef, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const Chart = ({chartName, data}) => {

  const chart = useRef(null);

  useEffect(() => {
    if(!chart.current){
      chart.current = am4core.create(chartName, am4charts.XYChart);

      chart.current.paddingRight = 20;

      chart.current.data = [];
  
      let dateAxis = chart.current.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
  
      let valueAxis = chart.current.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
  
      let lineSeries = chart.current.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.dateX = "Date";
      lineSeries.dataFields.valueY = "Cases";
      lineSeries.tooltipText = "{Cases : valueY.Cases\n Date : dateX.Date}";
      lineSeries.tooltip.pointerOrientation = "vertical";
  
      chart.current.cursor = new am4charts.XYCursor();
    }

    return () => {
      chart.current && chart.current.dispose();
    };
  }, []);

  useEffect(() => {
    if(chart.current){
      chart.current.data = data
    }
  }, [data])

  useEffect(() => {
    return () => {
      chart.current && chart.current.dispose();
    }
  }, [])

  return (
    <div id={chartName} style={{ width: "100%", height: "250px" }}></div>
  );
}

export default Chart;