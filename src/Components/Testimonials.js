import React from "react";
import Carousel from "react-elastic-carousel";
import { TestimonialData } from 'Data/Data';
import parse from 'html-react-parser';
import 'Styles/Testimonial.css';

export default function Testimonials() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 2 },
        { width: 1200, itemsToShow: 4 }
    ];
    return (
        <section className="testimonials">

            <h2 style={{ textAlign: 'center' }}>Testimonials</h2>
            <div className="carouselStyles">
                <Carousel breakPoints={breakPoints}>

                    {
                        TestimonialData.map((data, index) => (
                            <Testimonial key={index} {...data} />
                        ))
                    }

                </Carousel>
            </div>

        </section>
    );
}

function Testimonial(props) {
    return (
        <>
            <div className="testimonialMain">
                <div className="testimonial">
                    <img src={props.pic} alt="Person" />
                    <div>
                        <blockquote>" {parse(props.comments)}  " </blockquote>
                        <cite>- {props.name} </cite>
                    </div>
                </div>
            </div>
        </>
    );
}