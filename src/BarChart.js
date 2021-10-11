import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function BarChart(props) {

    React.useEffect(()=>{
        let chart = am4core.create("barchart", am4charts.XYChart);
         chart.data=props.chartData;
        
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "month";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.grid.disabled=true;
        categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
          if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy ;
          }
          return dy;
        });
        
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeWidth = 0;
        categoryAxis.renderer.grid.template.strokeWidth = 0;

       
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "posts";
        series.dataFields.categoryX = "month";
        series.name = "posts";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .4;
        
        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
        series.columns.template.width = am4core.percent(50);
       
    })

    return (
        <div id='barchart' style={{height:'100%',width: '100%'}}>
            
        </div>
    )
}

export default BarChart
