import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Traffic police/Home';
// import ProfileData from './data/profileData.js';
import './index.css';
import Test from './components/Traffic police/QR_Scanner.jsx';


function Page(){

    return (
        <div className = 'page'>
            {/* <MiniDrawer /> */}
            {/* <Home/> */}
            <Home/>
        </div>

        
    )
}

ReactDOM.render(<Page />,document.getElementById('root'));