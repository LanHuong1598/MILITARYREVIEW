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
export default function Video() {
    const [inforVideos, setinfoVideo] = useState([])
    const [inforImage, setinforImage] = useState([])
    const [loaded, setLoaded] = useState()
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestUrlAlbum = `http://27.71.228.19:5004/api/image/highlight`
       
        axios.get(requestUrlAlbum).then(response => {
            const temp = response.data
            setinforImage(temp.rows)
            setLoaded(true)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })


    }, [])

    const settingsImage = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]
    };
    const settingsVideo = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
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
        <Container className="wp-video">
            <h2 className="video-title" style={{ color: 'black' }}>Media</h2>
            {
                !loaded ? <Loader type="ThreeDots" color="#285A21" height="100" width="100" /> :
                    <Row>
                        <Col md='12' sm='12'>
                            <Slider {...settingsImage} className='VideoSlide'>
                                {
                                    inforImage && inforImage.map((item, index) => (

                                        <Link to={`/list/image/${item.id_album}`} className='video-item'>
                                            <div className='box' style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <img src={`http://27.71.228.19:5004/${item.url}`} style={{ width: '100%', padding: '10px' }} />
                                            </div>
                                        </Link>


                                    ))
                                }
                            </Slider>
                        </Col>
                    </Row>
            }

        </Container >
    )
}
