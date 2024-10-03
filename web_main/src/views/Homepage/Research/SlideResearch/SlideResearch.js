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
            <Link to={`/listnews/detail/${item.title}`} className="SlideResearchContainer">
                <img src={item.image} alt={item.title} />
                <div className="overlaySlideResearch">
                    <div className="textSlideResearch">{item.description}</div>
                </div>
            </Link>
            <Link to={`/listnews/detail/${item.title}`}>{item.title}</Link>
        </div>
    )
}

const SlideResearch = (props) => {
    // const [researchInfo, setResearchInfo] = useState()
    const [loaded, setLoaded] = useState()
    // useEffect(() => {
    //     // set loading to wait get data
    //     setLoaded(false)
    //     const researchArr = []
    //     const requestUrl_1 = `http://27.71.228.19:5004/api/news/38`;
    //     const requestUrl_2 = `http://27.71.228.19:5004/api/news/34`;
    //     const requestUrl_3 = `http://27.71.228.19:5004/api/news/38`;
    //     const requestUrl_4 = `http://27.71.228.19:5004/api/news/34`;
    //     const requestUrl_5 = `http://27.71.228.19:5004/api/news/38`;
    //     const requestUrl_6 = `http://27.71.228.19:5004/api/news/34`;
    //     axios.all([axios.get(requestUrl_1),
    //     axios.get(requestUrl_2), axios.get(requestUrl_3),
    //     axios.get(requestUrl_4), axios.get(requestUrl_5),
    //     axios.get(requestUrl_6) ])
    //         .then(axios.spread((firstResponse, secondResponse, thirdResponse, fourResponse, fiveResponse, sixResponse) => {
    //             researchArr.push(firstResponse.data, secondResponse.data, thirdResponse.data, fourResponse.data, fiveResponse.data, sixResponse.data)
    //             setResearchInfo(researchArr)
    //             setLoaded(true)
    //         }))
    //         .catch(error => console.log(error));

    // }, [])
    /*useEffect(() => {
        // set loading to wait get data
            setLoaded(false)
        
        
            
            
            axios.get(`api.lqdtu.edu.vn/api/news/getBySpotlight`).then(response => {
                const temp = response.data
                setResearchInfo(temp)
                setLoaded(true)
            }).catch(error => {
                console.error("Lỗi gọi API!", error)
            
        
        })
    }, [])*/
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
        slidesToShow: 2,
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
        <div className="SlideResearch" style={{ marginLeft: '-16px', marginRight: '-16px' }}>
            {/* {
                !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                    <Slider {...settings}>
                        {
                            // data && data.length > 0 && 
                            inforResearch && inforResearch.map((item, index) => (
                                <SlideItem key={index} item={item} />
                            ))
                        }
                    </Slider>
            } */}
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
