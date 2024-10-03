import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft } from 'react-feather'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { toDateTimeStringEnglish } from 'utils/utils'
import { Container, Row, Col } from 'reactstrap'
import Breadcrumbs from 'components/BreadCrumbs/Breadcrumbs'
// ** redux
import { updateBreadCrumbNews, updateCategory } from 'redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux'
import ContentUpComingItem from './ContentUpComingItem'
import Slider from "react-slick";
import Loader from "react-loader-spinner";
import '../../assets/css/news.css';
import '../News/css/newsDetail.css'
import '../News/css/style.css'
export default function DetailContest() {
    const dispatch = useDispatch()
    const { id, type } = useParams()
    const [infoHighlight, setInfoHighlight] = useState([]);
    const [infoNews, setInfoNews] = useState({})
    const [loaded, setLoaded] = useState()
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        vertical: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    useEffect(() => {
        const requestUrl = `http://27.71.228.19:5004/api/careerAndContest/spotlight?type=${type}&unit=Home`;
        axios.get(requestUrl).then(res => {
            const temp = res.data
            // const copyTemp = temp.concat();
            // copyTemp.push(temp[0]);
            setInfoHighlight(temp)
        }).catch(error => console.log(error));
        // update breadcrumbs
        const menuArr = [
            {
                title: "Home",
                path: `/`
            },
            {
                title: 'Student',
                path: "/student"
            },
            {
                title: 'Detail',
                path: ""
            },
        ]
        dispatch(updateBreadCrumbNews(menuArr))
    }, [])
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestUrl = `http://27.71.228.19:5004/api/careerAndContest/${id}`
        axios.get(requestUrl).then(response => {
            const temp = response.data
            setInfoNews(temp)
            setLoaded(true)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }, [id])
    return (
        !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> : <Container>
            <Row>
                <Col md={9} style={{ marginTop: '120px' }}>
                    <Breadcrumbs></Breadcrumbs>
                    <div className="left-box">
                        <div className="post-categories">

                        </div>
                    </div>
                    <div className="news_title" >
                        <h4>{infoNews.title}</h4>
                    </div>

                    <div className="d-flex justify-content-start mb-5">

                        <span className="mr-3">{toDateTimeStringEnglish(infoNews.date)}</span>
                    </div>
                    {/* <div className="image_resized">
                        <img src={`http://27.71.228.19:5004/${infoNews.avatar}`} alt="info image" style={{ width: '400px' }}></img>
                    </div> */}
                    <div className="news_body" style={{ fontSize: '16px' }}>
                        {ReactHtmlParser(infoNews.description)}
                    </div>
                    <Link to='/category/Contest' className="mb-1 d-inline-block"><ArrowLeft />Return</Link>
                </Col>
                <Col md="3">
                    <div className="unicamp-event-box unicamp-box">
                        <div className="box-header">
                            <h4 className="box-title">Highlights</h4>
                            <div className="tm-button-wrapper">
                                <Link className="button-content-wrapper" to={`${infoNews.type === "contest" ? `/careerAndContest/contest/${infoNews.typeContest}` : `/${infoNews.type}`}`}>
                                    <span className="button-text">
                                        View All
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="box-body">
                            {
                                <Slider {...settings}>
                                    {
                                        infoHighlight && infoHighlight.map((item, index) => {
                                            return (
                                                <div className={`post-item  line-post-item`} style={{ padding: '0px 0px' }}>
                                                    <div className="event-caption">
                                                        <div className="right-box">
                                                            <h3 className="post-title-relate post-title-relate-2-rows title-has-link" >
                                                                <Link to={`/categorydetail/detail/${item.id}/${type}`} style={{ fontWeight: '300' }}>{item.title}</Link>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>

                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
