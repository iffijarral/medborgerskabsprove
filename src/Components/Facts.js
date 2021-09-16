import React from "react";
import Carousel from "react-elastic-carousel";
import { FactsData } from 'Data/Data';
import 'Styles/Facts.css';

export default function Facts() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
    ];    

    return (
        <section>
            <h2 style={{ textAlign: 'center' }}>Some Interesting Facts About Denmark</h2>

            <div className="carouselStyles">
                
                <div className="factsWrapper">

                    <Carousel breakPoints={breakPoints}>

                        {
                            FactsData.map((data, index) => (
                                <Fact key={index} {...data} />
                            ))
                        }

                    </Carousel>
                </div>
            </div>

        </section>
    );
}

const Fact = (props) => {

    return (

        <div className="innerWrapper"
            style={{
                backgroundImage: `url(${props.pic})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}

        >
            <div className="factTitle">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
            </div>
        </div>

    );
}