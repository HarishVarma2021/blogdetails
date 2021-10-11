import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import './App.css';

export default function LinksPageSmallWidget(props) {



    const [internalURLdata, setinternalURLdata] = React.useState([]);

    React.useEffect(() => {
        let internalData = []
        for (let key in props.urlList) {
          
            urlExists(props.urlList[key], function (exists) {
                    if (!exists) {
                        internalData.push(props.urlList[key])
                    }
            });
        }
        
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

    return (
        <Card className="ml-0 mt-3 cardColor LinksPageSmallWidget">
            
                <Card.Body >
                <h6>Total links with any issue :</h6> {internalURLdata&&internalURLdata.length?internalURLdata.length:'0'}
                <h6>Last check completed at :</h6> Not Available
                <h6>Check Frequency :</h6> Not Available
               
                </Card.Body>
            </Card>
    )
}
