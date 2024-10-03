import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from "react-loader-spinner";
import style from './style.css';
import { Container, Row, Col } from 'reactstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toDateTimeStringEnglish } from '../../../../utils/utils'
export default function Cooperation({unit}) {
    
    const [infoCoop, setInfoCoop] = useState()
    const [loaded, setLoaded] = useState()
   
    useEffect(() => {
        setLoaded(false)
        const requestUrl = `http://27.71.228.19:5004/api/partners?page=1&size=20&unit=${unit}`;
        
        axios.get(requestUrl).then(response => {
            const temp = response.data
            setInfoCoop(temp)
            setLoaded(true)
            
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }, [])
    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 6000,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (

        <div className="wp-cooperation">

            <div className="cooperation">
                <Container>
                    <Row >
                        <Col md="12">
                            <div className="co-title">
                                <p style={{ color: '#FFFFFF', fontWeight: '700' }}>Cooperation</p>
                                <div className="co-view">
                                    <Link to={`/partner/list`}>View All</Link>
                                </div>

                            </div>
                        </Col>
                        <Col md="12" id='coorperationSlider'>
                       
                            <Slider {...settings} >
                                {
                                    infoCoop && infoCoop.map((item, index) => 
                                         (
                                            <div key={index} id="scroller_img">
                                                <a href={item.link} className="mg-aa" key={index} target="_blank">
                                                    <LazyLoadImage src={`http://27.71.228.19:5004/${item.image}`} alt={item.title} className=" mg-center"></LazyLoadImage>
                                                    <div className="overlay-img overlay">
                                                <h4 className="text-center text-white" style={{margin:'auto', fontSize:'1em', wordBreak:'break-word', lineHeight:'1em'}}>{item.title}</h4>
                                            </div>
                                                </a>
                                            </div>
                                        )
                                    )
                                    
                                }
                            </Slider>
                        </Col>
                    </Row>
                    
                </Container>
            </div>

        </div>


    )
}
