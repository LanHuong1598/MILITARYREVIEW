import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Slider from "react-slick";
import Loader from "react-loader-spinner";
import './SlideDepartment.css';

const SlideItem = (props) => {
    const { item } = props;
    
    return (
        <div className="SlideDepartment-item">
            <Link to={`/listnews/detail/${item.title}`} className="SlideDepartmentContainer">
                <img src={`http://27.71.228.19:5004/${item.image}`} alt={item.name} />
                <div className="overlaySlideDepartment">
                    <div className="textSlideDepartment">{item.name}</div>
                </div>
            </Link>
            
        </div>
    )
}

const SlideDepartment = ({infoDepartment}) => {
 
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="SlideDepartment" style={{ marginLeft: '-16px', marginRight: '-16px' }}>
            
            <Slider {...settings}>
                {
                    // data && data.length > 0 && 
                    infoDepartment && infoDepartment.map((item, index) => (
                        <SlideItem key={index} item={item} />
                    ))
                }
                
            </Slider>
        </div>
    );
};


SlideDepartment.propTypes = {

};


export default SlideDepartment;
