import React from 'react'
import BackToTop from "react-back-to-top-button";
import { ArrowUp } from 'react-feather';
export default function BackTop() {
    return (
        <BackToTop
            
            showAt={100}
            speed={1500}
            easing="easeInOutSine"
        >
            <ArrowUp style={{borderRadius:'2rem', border:'2px solid #e81d1d', backgroundColor:'#e81d1d', color:'#fff'}} />
        </BackToTop>
    )
}
