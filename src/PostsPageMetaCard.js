import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './App.css'

export default function postsPageMetaCard(props) {
   let classBasedOnLength=props.postsArr&&props.postsArr.length>5?'ml-0 mt-3 cardColor postsPageMetaCard fontSize-decre':"ml-0 mt-3 cardColor postsPageMetaCard";

    return (
        <Card className={classBasedOnLength}>
            <Card.Title>
                {props.title ? props.title : ""}
            </Card.Title>
            <Card.Body >
                {props.postsArr&&props.postsArr.length>0?<ol>
                    {Object.keys(props.postsArr).map(key => {
                        return <li>
                           <a href={props.postsArr[key]['url']} target='_blank'> {props.postsArr[key]['title'] ? props.postsArr[key]['title'] : ""} </a>
                        </li>

                    })}
                </ol>:'No Posts Found'}
                
            </Card.Body>
        </Card>
    )
}
