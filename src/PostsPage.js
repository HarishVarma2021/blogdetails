import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import PostsPageMetaCard from './PostsPageMetaCard';
import PostsPageValueChartCard from './PostsPageValueChartCard';
import PostPageMediumWidget from './PostPageMediumWidget';
import axios from 'axios';
import './App.css';

const API_KEY='8196190b08906dda0ebf6e6f5d'

export default function PostsPage() {

    const [postData,setpostData]=React.useState([])
    const [postDataWithoutMD,setpostDataWithoutMD]=React.useState([])
    const [postDataWithoutFI,setpostDataWithoutFI]=React.useState([])
    const [postDataTooLongURL,setpostDataTooLongURL]=React.useState([])
    const [postDataTooLongMetaData,setpostDataTooLongMetaData]=React.useState([])
    const [postDataTooLongPosts,setpostDataTooLongPosts]=React.useState([])
    const [postDataTooShortPosts,setpostDataTooShortPosts]=React.useState([])

    let fetchPostData=()=>{

        axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key='+API_KEY+'&limit=all')
         .then((res=>{
             let response=res.data.posts;
             let withoutMetaData=[],withoutFeaturedImage=[],shortPosts=[],longPosts=[],longUrl=[],longMetaData=[]

             for(let key in response){
                 
                 if(!response[key]['meta_description']){
                    withoutMetaData.push(response[key])
                 }

                 if(!response[key]['feature_image']){
                    withoutFeaturedImage.push(response[key])
                 }
                 if(response[key]['html']&&response[key]['html'].match(/(\w+)/g).length<250){
                    shortPosts.push(response[key])
                 }
                 if(response[key]['html']&&response[key]['html'].match(/(\w+)/g).length>1500){
                    longPosts.push(response[key])
                 }
                 if(response[key]['url']&&response[key]['url'].length>=100){
                    longUrl.push(response[key])
                 }
                 if(response[key]['meta_description']){
                    if(response[key]['meta_description'].length>250){
                        longMetaData.push(response[key])  
                    } 
                 }
                
             }
          
           setpostData(res.data.posts);
           setpostDataWithoutMD(withoutMetaData);
           setpostDataWithoutFI(withoutFeaturedImage);
           setpostDataTooShortPosts(shortPosts);
           setpostDataTooLongPosts(longPosts);
           setpostDataTooLongURL(longUrl);
           setpostDataTooLongMetaData(longMetaData);
         }))
      }
    React.useEffect(()=>{
        fetchPostData()
    })
    return (
        <div className="dashboard">
            <Row>
                <Col md={4} >
                    <PostsPageMetaCard title='WITHOUT META DESCRIPTION' postsArr={postDataWithoutMD}/>
                </Col>
                <Col md={4} >
                    <PostsPageMetaCard title='WITHOUT FEATURED IMAGE' postsArr={postDataWithoutFI}/>
                </Col>
                <Col md={4} >
                    <PostsPageMetaCard title='TOO SHORT POSTS BELOW 250 WORDS' postsArr={postDataTooShortPosts}/>
                </Col>
            </Row>
            <Row>
                <Col md={4} >
                    <PostsPageValueChartCard title='TOO LONG META DESCRIPTION' postsArr={postDataTooLongMetaData}/>
                </Col>
                <Col md={4} >
                    <PostPageMediumWidget title='TOO LONG URL, MORE THAN 100 CHAR' postsArr={postDataTooLongURL}/>
                </Col>
                <Col md={4} >
                    <PostsPageValueChartCard title='WRONG SLUG' postsArr={[]}/>
                </Col>
            </Row>

        </div>

    )
}
