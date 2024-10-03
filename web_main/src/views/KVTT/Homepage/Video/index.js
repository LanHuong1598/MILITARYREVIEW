import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { Container, Row, Col } from 'reactstrap';
import Loader from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser'
import { LazyLoadImage } from 'react-lazy-load-image-component';
//optimize image

import './style.css';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
export default function Video({unit}) {
    const [inforVideos, setinfoVideo] = useState([])
    
    const [loaded, setLoaded] = useState()
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestUrlVideo = `http://27.71.228.19:5004/api/video?unit=${unit}`
        
        axios.get(requestUrlVideo).then(response => {
            const temp = response.data
            setinfoVideo(temp)
            setLoaded(true)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
       

    }, [])
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
        <Container className="wp-academic">
            <h2 className="academic-title" style={{textAlign:'center'}}>VIDEO</h2>
            {
                !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                <div>
                    
                    <Slider {...settings}>
                        {
                             inforVideos && inforVideos.map((item, index) => (
                                <LightGallery plugins={[lgVideo]} mode="lg-fade" style={{with:'240px', height:'30%'}}>
                                    <a data-lg-size="1280-720" data-pinterest-text="Pin it3" data-tweet-text="lightGallery slide  4" data-src={item.url} data-poster={`http://27.71.228.19:5004/${item.image_URL}`} data-sub-html="<h4>Thank You!</h4><p> Sample Wistia video </p>">
                                        <img className="img-responsive" src={`http://27.71.228.19:5004/${item.image_URL}`} style={{width:'100%', padding:'10px'}}/>
                                    </a>
                                </LightGallery>
                            ))
                        }
                        
                        
                    </Slider>
                </div>
            }

        </Container>
    )
}
