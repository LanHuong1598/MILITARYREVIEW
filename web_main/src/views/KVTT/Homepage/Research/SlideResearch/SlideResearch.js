import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Slider from "react-slick";
import Loader from "react-loader-spinner";
import './SlideResearch.css';

const SlideItem = (props) => {
    const { item } = props;
    return (
        <div className="SlideResearch-item">
            <Link to={`/listnews/detail/${item.title}`} className="SlideResearchContainer" style={{height:'440px'}}>
                <img src={item.image} alt={item.title}  />
                <div className="overlaySlideResearch">
                    <div className="textSlideResearch">{item.description}</div>
                </div>
            </Link>
            <Link to={`/listnews/detail/${item.title}`}>{item.title}</Link>
        </div>
    )
}

const SlideResearch = (props) => {
    const [loaded, setLoaded] = useState()
    var inforResearch = [
        {
            title: 'Plastic radiation detector',
            image: require('assets/img/custom/research/1.jpg').default,
            description: 'Ensuring the radiation safety and controlling an environmental radiation level of radiation facilities.',
            id: "234",
        },
        {
            title: 'Plate heat exchange',
            image: require('assets/img/custom/research/2.jpg').default,
            description: 'Plate heat exchanger helps to exchange heat between the cooling liquid and the outside environment in order to maintain stable operating temperature of the engine.',
            id: "235",
        },
        {
            title: 'Autonomous mobile robots for hospital logistics in quarantine areas – Vibot',
            image: require('assets/img/custom/research/3.jpg').default,
            description: 'Support logistics (goods, supplies, medicine...) in quarantine areas or in potential toxic areas.',
            id: "236",
        },
        {
            title: 'Automatic rubber scraper',
            image: require('assets/img/custom/research/4.jpg').default,
            description: 'Proposing new solutions to productivity, quality and origin of rubber latex management.',
            id: "237",
        },
    ]

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
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
        <div className="SlideResearch" style={{padding: '0px'}}>
            <Slider {...settings}>
                {
                    // data && data.length > 0 && 
                    inforResearch && inforResearch.map((item, index) => (
                        <SlideItem key={index} item={item} />
                    ))
                }
            </Slider>
        </div>
    );
};
SlideResearch.propTypes = {

};
export default SlideResearch;
