import React from 'react'
import 'Styles/Banner.css';
import { Link } from 'react-router-dom';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

export default function Banner() {    
    return (
        <div className="mainDiv">            
            <div className="title">
                <h1>Register now, and start your preparation.</h1>
                <hr />
                <p>
                    Pass this exam, and come closer to your PR  <InsertEmoticonIcon />
                </p>
                <Link to="/packages">START NOW</Link>
            </div>
        </div>
    );
}