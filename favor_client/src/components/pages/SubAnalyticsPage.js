import React from 'react'
import BackToTop from './../shared/BackToTop';
import Navbar from '../shared/navbar/Navbar';
import WaffleChart from './../WaffleChart';



export default function ContentDisplayPage({ savedItems, subreddits }) {
    return (
        <BackToTop>
            <Navbar link="/" linkLabel={"Back to Content Page"} />

            <WaffleChart subreddits={subreddits} />

        </BackToTop>
    )
}


