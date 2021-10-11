import React from 'react';
import './App.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import ValueChartWidget from './ValueChartWidget';
import ChartWidget from './ChartWidget';
import ValueWidget from './ValueWidget';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY='8196190b08906dda0ebf6e6f5d'

function App() {

  const [postData,setpostData]=React.useState([]);
  const [pageData,setpageData]=React.useState([]);
  const [authorData,setauthorData]=React.useState([])
  const [tagsData,settagsData]=React.useState([])

  const fetchPostData=()=>{
    axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key='+API_KEY+'&&include=count.posts&limit=all&fields=title,url,created_at,published_at&published_at DESC')
     .then((res=>{
      
       setpostData(res.data.posts)
     }))
  }

  const fetchPageData=()=>{
    axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/pages/?key='+API_KEY+'&limit=all&fields=id,url,title')
     .then((res=>{
      setpageData(res.data.pages)
     }))
  }

  const fetchAuthorData=()=>{
    axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/authors/?key='+API_KEY+'&limit=all&fields=id,name')
     .then((res=>{
       setauthorData(res.data.authors)
     }))
  }
  const fetchTagsData=()=>{
    axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/tags/?key='+API_KEY+'&limit=all&fields=id,name')
     .then((res=>{
      settagsData(res.data.tags)
     }))
  }
  React.useEffect(() => {
    fetchPostData();
    fetchPageData();
    fetchAuthorData();
    fetchTagsData();
  },[])
  return (
    <div className="dashboard">
      <Row>
        <Col md={3} className='cardLeft'>
          <ValueChartWidget title='Total Posts' totalValue={postData?postData.length:0}/>
        </Col>
        <Col md={3}>
          <ValueChartWidget title='Total tags' totalValue={tagsData?tagsData.length:0}/>
        </Col>
        <Col md={3}>
          <ValueChartWidget title='Total Authors' totalValue={authorData?authorData.length:0}/>
        </Col>
        <Col className='cardRight' md={3}>
          <ValueChartWidget title='Total Pages' totalValue={pageData?pageData.length:0}/>
        </Col>
      </Row>
      <Row>
        <Col md={6} className='cardLeft'>
          <ChartWidget postData={postData} view='list'/>
        </Col>
        <Col md={6}>
          <ChartWidget postData={postData} view='chart'/>
        </Col>
      </Row>

      <Row>
        <Col md={2} className='cardLeft'>
          <ValueWidget />
        </Col>
        <Col md={2}>
          <ValueWidget />
        </Col>
        <Col md={2}>
          <ValueWidget />
        </Col>

        <Col md={3}>
          <ValueChartWidget />
        </Col>
        <Col md={3}>
          <ValueChartWidget />
        </Col>

      </Row>

    </div>
  );
}

export default App;
