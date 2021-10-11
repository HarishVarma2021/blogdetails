import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './App.css';
import jQuery from 'jquery'

export default function LinksPageLargeWidget(props) {
    const [externalURLdata, setexternalURLdata] = React.useState([]);
    const [internalURLdata, setinternalURLdata] = React.useState([]);

    React.useEffect(() => {
        let internalData = [], externalData = []
        for (let key in props.urlList) {
          
            urlExists(props.urlList[key], function (exists) {
                if (props.urlList[key].includes('ghost')) {
                    if (!exists) {
                        internalData.push(props.urlList[key])
                    }
                } else {
                    if (!exists) {
                        externalData.push(props.urlList[key])
                    }
                }
               
            });
        }
        setexternalURLdata(externalData);
        setinternalURLdata(internalData)
    })

    function urlExists(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr)
                callback(xhr.status < 400);
            }
        };
        xhr.open('HEAD', url);
        xhr.send();
    }



    if (props.page == 'Internal') {
        return (
            <Card className="ml-0 mt-3 cardColor LinksPageLargeWidget">
                <Card.Title>
                    {props.title ? props.title : ''}
                </Card.Title>
                <Card.Body >
                {internalURLdata&&internalURLdata.length>0?<ol>
                    {Object.keys(internalURLdata).map(key => {
                        return <li>
                           <a href={internalURLdata[key]['url']} target='_blank'> {internalURLdata[key]['title'] ? internalURLdata[key]['title'] : ""} </a>
                        </li>

                    })}
                </ol>:'No Posts Found'}
                </Card.Body>
            </Card>
        )
    } else {
        return (
            <Card className="ml-0 mt-3 cardColor LinksPageLargeWidget">
                <Card.Title>
                    {props.title ? props.title : ''}
                </Card.Title>
                <Card.Body >
                {externalURLdata&&externalURLdata.length>0?<ol>
                    {Object.keys(externalURLdata).map(key => {
                        return <li>
                           <a href={externalURLdata[key]['url']} target='_blank'> {externalURLdata[key]['title'] ? externalURLdata[key]['title'] : ""} </a>
                        </li>

                    })}
                </ol>:'No Posts Found'}
                </Card.Body>
            </Card>
        )
    }

}
