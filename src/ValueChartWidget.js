import React from 'react';
import {Row,Col,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function ValueChartWidget(props) {
    return (
       
            <Card className="ml-0 mt-3 cardColor ValueChartCard">
               
                {props.title?props.title:""}
               
                <Card.Body >
                   
                    <h2 className="valueCardText">{props.totalValue?props.totalValue:""} </h2>
                   
                   
                </Card.Body>
            </Card>
       
    )
}

export default ValueChartWidget
