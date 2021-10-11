import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './App.css';

export default function PostPageMediumWidget(props) {
    return (
        <Card className="ml-0 mt-3 cardColor PostPageMediumWidget">
            <Card.Title>
                {props.title ? props.title : ""}
            </Card.Title>
            <Card.Body>

                <Card.Text>
                    {props.postsArr && props.postsArr.length > 0 ? <ol>
                        {Object.keys(props.postsArr).map(key => {
                            return <li>
                               <a href={props.postsArr[key]['url']} target='_blank'> {props.postsArr[key]['title'] ? props.postsArr[key]['title'] : ""}</a>
                            </li>

                        })}
                    </ol> : 'No Posts Found'}
                </Card.Text>

            </Card.Body>
        </Card>
    )
}
