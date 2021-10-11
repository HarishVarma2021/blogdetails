import React, { useState, useEffect, useRef } from 'react';
import App from './App';
import PostsPage from './PostsPage';
import LinksPage from './LinksPage';

export default function MainComponent() {
    const [selectedPage, setSelectedPage] = useState('Dashboard Page');
    const [hideButton, sethideButton] = useState(false);

    useEffect(() => {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        sethideButton(false);
    }, []);

    function openNav() {
        sethideButton(true);
        document.getElementById("mySidebar").style.width = "250px";
        // document.getElementById("main").style.marginLeft = "250px";
    }

    function closeNav() {

        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        sethideButton(false)
    }

    let handleDashboardChange = (page) => {
        closeNav();
        setSelectedPage(page);
    }
    let checkSelected = () => {
        if (selectedPage == 'Dashboard Page') {
            return <App />
        } else if (selectedPage == 'Posts Page') {
            return <PostsPage />
        } else {
            return <LinksPage />
        }
    }
    let componentTobeRendered = checkSelected()
    return (
        <div>
            <div id="mySidebar" class="sidebar">
                <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>×</a>
                <a href="javascript:void(0)" onClick={() => handleDashboardChange('Dashboard Page')}>Dashboard Page</a>
                <a href="javascript:void(0)" onClick={() => handleDashboardChange('Posts Page')}>Posts Page</a>
                <a href="javascript:void(0)" onClick={() => handleDashboardChange('Links Page')}>Links Page</a>

            </div>
            <div id="main">
                <button class="openbtn" onClick={openNav}>☰ </button>

            </div>


            {componentTobeRendered}

        </div>
    )
}
