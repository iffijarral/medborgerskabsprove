import React from 'react'
import Hero from 'Components/Hero';
import Testimonials from "Components/Testimonials";
import Banner from 'Components/Banner';
import Blocks from 'Components/Blocks';
import Info from 'Components/Info';
import Facts from 'Components/Facts';

export default function Home() {
    
    return (
        <>            
            <Hero />
            <Info />            
            <Blocks />
            <Facts />          
            <Testimonials />
            
            <Banner />
        </>
    );
}
