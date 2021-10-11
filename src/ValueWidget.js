import React, { Component } from 'react';
import {Row,Col,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export class ValueWidget extends Component {
    render() {
        return (
            <Card className="ml-0 mt-3 cardColor ValueCard">
               
                <Card.Body>
                  
                    <Card.Text>
                       No Data Found
                    </Card.Text>
                    
                </Card.Body>
            </Card>
        )
    }
}

export default ValueWidget
