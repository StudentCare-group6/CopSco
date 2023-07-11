import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Traffic police/Home';
// import ProfileData from './data/profileData.js';
import './index.css';


function Page(){

    return (
        <div className = 'page'>
            {/* <MiniDrawer /> */}
            <Home/>
        </div>

        
    )
}

ReactDOM.render(<Page />,document.getElementById('root'));