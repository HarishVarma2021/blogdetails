import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import BarChart from './BarChart';
import './App.css';
const monthData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export class ChartWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            postsList: []
        }

    }
    componentDidMount = () => {
        if (this.props.view === 'list') {
            let data = this.props.postData
            let x = data.slice(0, 4)
            console.log(x, this.props.postData)
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.view === 'list') {
            let data = nextProps.postData
            let postsList = data.slice(0, 5)
            this.setState({ postsList })
        } else {
            let chartData = []
            console.log(nextProps.postData)
            for (let i in nextProps.postData) {
                let p_date = new Date(nextProps.postData[i]['published_at']);
                let current_date = new Date();

                    if (chartData.length == 0) {
                        let chartObj = { 'month': monthData[p_date.getMonth()] + ',' + p_date.getFullYear(), 'posts': 1 }
                        chartData.push(chartObj);
                        this.setState({chartData})
                    } else {
                        let flag = 0;
                       
                        for (let j in chartData) {
            
                            if (chartData[j]['month'] == monthData[p_date.getMonth()] + ',' + p_date.getFullYear()) {
                                chartData[j]['posts'] = chartData[j]['posts'] + 1;
                                this.setState({chartData})
                                flag = 1;
                                break;
                            } else {
                               
                                if (Number(j) == (chartData.length - 1)) {
                                    let chartObj = { 'month': monthData[p_date.getMonth()] + ',' + p_date.getFullYear(), 'posts': 1 }
                                    chartData.push(chartObj);
                                   
                                    this.setState({chartData})
                                }
                            }
                        
                    }
                }

            }
        }
    }
    render() {
       
        if (this.props.view === 'list') {
            return (
                <Card className="ml-0 mt-3 cardColor ChartCard">
                    Latest 5 Published posts List
                    <Card.Body>
                        <ol>
                            {Object.keys(this.state.postsList).map(key => {

                                return <li>
                                    <a href={this.state.postsList[key]['url']} target='_blank'>{this.state.postsList[key]['title']} </a>
                                </li>

                            })
                            }
                        </ol>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card className="ml-0 mt-3 cardColor ChartCard">
        Posts Per Month
                    <Card.Body>

                        <BarChart chartData={this.state.chartData} />

                    </Card.Body>
                </Card>
            )
        }

    }
}

export default ChartWidget
