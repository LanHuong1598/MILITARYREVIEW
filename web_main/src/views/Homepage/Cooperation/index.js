import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from "react-loader-spinner";
import style from './style.css';
import { Container, Row, Col } from 'reactstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toDateTimeStringEnglish } from '../../../utils/utils'
export default function Cooperation() {
    const listImage = [
        {
            srcImg: require('assets/img/custom/cooperation/pic1.png').default,
            name: "Тульский университет",
            linkTarget: "https://tsu.tula.ru/",
            altText: "Pic 1"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic2.png').default,
            name: "Peter the Great St.Petersburg Polytechnic University",
            linkTarget: "http://www.spbstu.ru/",
            altText: "Pic 2"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic3.png').default,
            name: "Moscow Automobile and Road Construction University",
            linkTarget: "http://en.madi.ru/",
            altText: "Pic 3"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic5.png').default,
            name: "Kookmin University",
            linkTarget: "https://english.kookmin.ac.kr/",
            altText: "Pic 4"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic4.png').default,
            name: "Tokyo University",
            linkTarget: "https://www.u-tokyo.ac.jp/en/index.html",
            altText: "Pic 5"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic6.png').default,
            name: "University of Waikato",
            linkTarget: "https://www.waikato.ac.nz/",
            altText: "Pic 6"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic7.png').default,
            name: "Kalinga Institute of Industrial Technology",
            linkTarget: "http://kiit.ac.in",
            altText: "Pic 7"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic8.png').default,
            name: "Санкт-Петербургский государственный электротехнический университет",
            linkTarget: "http://www.eltech.ru",
            altText: "Pic 8"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic9.jpg').default,
            name: "Tsinghua University",
            linkTarget: "http://www.xjtu.edu.cn",
            altText: "Pic 9"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic10.png').default,
            name: "Xi'An Jiaotong University",
            linkTarget: "http://www.xjtu.edu.cn",
            altText: "Pic 10"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic11.png').default,
            name: "Peiking University",
            linkTarget: "http://www.pku.edu.cn/",
            altText: "Pic 11"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic12.jpg').default,
            name: "University of Technology Sydney",
            linkTarget: "https://www.uts.edu.au/",
            altText: "Pic 12"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic13.jpg').default,
            name: "Japan Advanced Institute of Science and Technology",
            linkTarget: "http://www.jaist.ac.jp",
            altText: "Pic 13"
        },
        {
            srcImg: require('assets/img/custom/cooperation/pic14.jpg').default,
            name: "Victoria University ",
            linkTarget: "http://www.victoria.ac.nz/",
            altText: "Pic 14"
        }
    ]
    const [infoCoop, setInfoCoop] = useState({})
    const [loaded, setLoaded] = useState()
    const [linkImage, setLinkImage] = useState("");
    useEffect(() => {
        setLoaded(false)
        const requestUrl = `http://27.71.228.19:5004/api/news/227`;
        axios.get(requestUrl).then(response => {
            setInfoCoop(response.data)
            setLinkImage(response.data['image_URL'])
            setLoaded(true)
        }).catch(error => {
            console.error('There was an error!', error);
        })
    }, [])
    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 8,
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
                    <Row>
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
                                    listImage && listImage.map((item, index) => {
                                        return (
                                            <div key={index} id="scroller_img">
                                                <a href={item.linkTarget} className="mg-aa" key={index} target="_blank">
                                                    <LazyLoadImage src={item.srcImg} alt={item.altText} className=" mg-center"></LazyLoadImage>
                                                    <div className="overlay-img overlay">
                                                <h4 className="text-center text-white" style={{margin:'auto', fontSize:'1em', wordBreak:'break-word', lineHeight:'1em'}}>{item.name}</h4>
                                            </div>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </Col>
                    </Row>
                    <Row className="wp-info">
                        {
                            !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                                <>
                                                                        
                                    <Col md="3" sm="12" className="co-banner" >
                                        
                                        <a className="image-with-hover-overlay image-hover-zoom" href={`/listnews/detail/${infoCoop.title}`} title="" style ={{ width:'100%', height: '100%'}}>
                                            <img src={`http://27.71.228.19:5004/${linkImage}`} className="full-img" style ={{ width:'100%', height: '100%'}}/>
                                        </a>

                                    </Col>
                                    
                                    <Col md="9" sm="12" className="co-info">
                                    
                                        <p className="co-info-1" style={{ color: '#FFFFFF', fontWeight: '700', marginBottom: '0.3em' }}><Link  to={`/listnews/detail/${infoCoop.title}`} style={{ color: '#FFFFFF', fontWeight: '700', marginBottom: '0.3em', fontSize: '24px' }}>{infoCoop.title}</Link></p>
                                        <p style={{ color: '#FABD03', fontSize: '13px', fontWeight: '400', marginBottom: '1em' }}>{toDateTimeStringEnglish(infoCoop.date_created)}</p>
                                        <p className="co-info-2" ><Link  to={`/listnews/detail/${infoCoop.title}`} style={{ color: '#FFFFFF', fontWeight: '400', marginBottom: '0.9em' }}>{infoCoop.description}</Link></p>
                                        <Link style={{ color: '#FABD03', fontSize: '16px', fontWeight: '700', marginBottom: '4px', textDecorationLine: 'underline' }} to={`/news/cooperation`}>View All</Link>
                                    </Col>
                                </>
                        }
                    </Row>
                </Container>
            </div>

        </div>


    )
}
