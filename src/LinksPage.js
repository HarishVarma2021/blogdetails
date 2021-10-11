import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import LinksPageLargeWidget from './LinksPageLargeWidget';
import LinksPageSmallWidget from './LinksPageSmallWidget';
import axios from 'axios';
import './App.css'


const API_KEY = '8196190b08906dda0ebf6e6f5d'


export default function LinksPage() {
    const [postData, setpostData] = React.useState([]);
    const [urlList, seturlList] = React.useState([]);

    function urlify(text) {
        let urlData = urlList;
        // var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        // //var urlRegex = /(https?:\/\/[^\s]+)/g;
        // return text.replace(urlRegex, function(url,b,c) {
        //     var url2 = (c == 'www.') ?  'http://' +url : url;

        //    urlData.push(url)
        //    seturlList(urlData)
        //    // return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
        // }) 

        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function (url) {

            urlData.push(url)
            seturlList(urlData)
            // return '<a href="' + url + '">' + url + '</a>';
        });
    }

    let fetchPostData = () => {
        axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=' + API_KEY + '&limit=all&fields=title,html,created_at,published_at&published_at DESC')
            .then(res => {
                let response = res.data.posts, urlData = [];
                setpostData(res.data.posts)
                seturlList([])
                for (let i in response) {
                    let htmlString = response[i]['html']

                    urlify(htmlString)


                }
            })
    }
    React.useState(() => {
        fetchPostData()
    })
    //console.log(urlList)

    //let uniqueChars = [...new Set(urlList)];
    for (let i in urlList) {
        console.log(urlList[i])
    }
    //console.log(uniqueChars);
    return (
        <div className="dashboard">
            <Row>
                <Col md={4}>
                    <LinksPageSmallWidget urlList={urlList}/>
                </Col>
                <Col md={4}>
                    <LinksPageLargeWidget urlList={urlList} title='BROKEN INTERNAL LINKS' page='Internal'/>
                </Col>
                <Col md={4}>
                    <LinksPageLargeWidget urlList={urlList} title='BROKEN EXTERNAL LINKS' page='External'/>
                </Col>
            </Row>
        </div>


    )
}
