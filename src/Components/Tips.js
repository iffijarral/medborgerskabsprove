import React from 'react';
import { TipsData } from 'Data/Data';
import parse from 'html-react-parser';
import 'Styles/Tips.css';

export default function Tips() {
    return (
        <div className="tips">
            {parse(TipsData.data)}
        </div> 
    );
}
