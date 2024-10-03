import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import HtmlParser from 'react-html-parser';
import Loader from "react-loader-spinner";
import { Container, Row, Col } from 'reactstrap';
import Breadcrumbs from '.../../components/BreadCrumbs/Breadcrumbs'
import ContentUpComingItem from './ContentUpComingItem'
import Slider from "react-slick";
import '../News/css/style.css'
// redux
import { updateBreadCrumbNews } from 'redux/actions/menu';
import { useDispatch } from 'react-redux'
export default function StudentLife() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const [infoHighlight, setInfoHighlight] = useState([]);
    const [menuItem, setMenuItem] = useState()
    const [loaded, setLoaded] = useState()
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        vertical: true,
        arrows: false,
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
    useEffect(() => {
        const requestUrl = `http://27.71.228.19:5004/api/studentLink/student-life`;
        axios.get(requestUrl).then(res => {
            const temp = res.data
            const copyTemp = temp.concat();
            copyTemp.push(temp[0]);
            setInfoHighlight(copyTemp)
        }).catch(error => console.log(error));
    }, [])
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        axios.get(`http://27.71.228.19:5004/api/introduction/1`).then(response => {
            setLoaded(true)
            const temp = response.data
            setMenuItem(temp)
            const menuArr = [
                {
                    title: "Home",
                    path: `/`
                },
                {
                    title: 'Students',
                    path: "/student"
                },
                {
                    title: `Student Life`,
                    path: ""
                }
            ]
            dispatch(updateBreadCrumbNews(menuArr))
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })

    }, [window.location.pathname])

    return (
        !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
            <Container style={{ marginTop: '1rem' }}>
                <Row>
                    <Col md="9" style={{ marginTop: '120px' }}>
                        <Breadcrumbs></Breadcrumbs>
                        {
                            menuItem && <>
                                <h3 className="customPage_title">{menuItem.name}</h3>
                                <div className="customPage_content">
                                    {menuItem && HtmlParser(menuItem.content)}
                                   
                                </div></>
                        }
                    </Col>
                    <Col md="3">
                        <div className="unicamp-event-box unicamp-box">
                            <div className="box-header">
                                <h4 className="box-title">Student life</h4>
                                
                            </div>
                            <div className="box-body">
                                {
                                    
                                    infoHighlight && infoHighlight.map((item, index) => {
                                        return (
                                            <ContentUpComingItem info={item} key={index} ind={index}></ContentUpComingItem>
                                        )
                                    })
                                        
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
    )
}
