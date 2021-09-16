import React from 'react'
import 'Styles/About.css';
import { useParams } from 'react-router-dom';
import { IntroData } from 'Data/Data';
import parse from 'html-react-parser';

export default function About() {
    const { action } = useParams();

    return (
        <div className="about">
            {
                IntroData.map((data, index) => {
                    
                    if(data.title === action) 
                    {
                        
                        return parse(data.longDescription);
                    }
                }                    
                )

            }
        </div>
    );
}
