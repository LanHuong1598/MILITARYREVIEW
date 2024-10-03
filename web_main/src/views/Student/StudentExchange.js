import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Container, Row, Col } from 'reactstrap';
import ContentUpComingItem from './ContentUpComingItem'
// ** redux
import { updateBreadCrumbNews, updateCategory } from 'redux/actions/menu';
import { useDispatch } from 'react-redux'
import Breadcrumbs from 'components/BreadCrumbs/Breadcrumbs'
import { toDateTimeStringEnglish, capitalize } from 'utils/utils'
import Loader from "react-loader-spinner";
import Slider from "react-slick";
import '../News/css/newsAll.css'
import '../../assets/css/news.css';
function StudentExchange() {
    const [infoHighlight, setInfoHighlight] = useState([]);
    const dispatch = useDispatch();
    const [postsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [posts, setAllPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: infoHighlight.length - 1,
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
    const getPostData = (data, flag) => {
        return (
            !flag ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                <div className="news-all">
                    {
                        data.map((item) => {
                            return (

                                <div className="news-block">
                                    <div className="left-img">
                                        <Link to={`/categorydetail/detail/${item.id}/exchange`}  >
                                            <img src={`http://27.71.228.19:5004/${item.avatar}`} alt="info image"></img>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/categorydetail/detail/${item.id}/exchange`}>
                                            <div className="news-title">
                                                {item.title}
                                            </div>
                                        </Link>
                                        <div className="news-date">
                                            {toDateTimeStringEnglish(item.date)}

                                        </div>
                                        <div className="news-summary">
                                            {item.short_description}
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
        )
    }

    const getAllPosts = async () => {
        const requestUrl = `http://27.71.228.19:5004/api/careerAndContest?page=${offset}&size=${postsPerPage}&unit=Home&type=exchange`
        const res = await axios.get(requestUrl)
        const total = res.headers["content-range"]
        const data = res.data;
        let flag = false;
        if (res !== null) {
            flag = true;
        }
        // For displaying Data
        const postData = getPostData(data, flag)
        // Using Hooks to set value
        setAllPosts(postData)
        setPageCount(Math.ceil(total / postsPerPage))
    }

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    };
    useEffect(() => {
        const requestUrl = `http://27.71.228.19:5004/api/studentLink/student-exchanges`;
        axios.get(requestUrl).then(res => {
            const temp = res.data
            setInfoHighlight(temp);
        }).catch(error => console.log(error));
        const menuArr = [
            {
                title: "Home",
                path: `/`
            },
            {
                title: "Students",
                path: `/student`
            },
            {
                title: "Exchange",
                path: ""
            }
        ]
        dispatch(updateBreadCrumbNews(menuArr))
    }, [])
    useEffect(() => {
        setOffset(1)
    }, [window.location.pathname])
    useEffect(() => {
        getAllPosts()
        // window.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // })
    }, [offset, window.location.pathname])

    return (
        <Container>
            <Row>
                <Col md="9" style={{ marginTop: '120px' }}>
                    <Breadcrumbs></Breadcrumbs>
                    <div className="main-app">
                        {/* Display all the posts */}
                        {posts}

                        {/* Using React Paginate */}
                        <ReactPaginate
                            previousLabel={"Previous"}
                            previousClassName={offset === 1 ? "d-none" : ""}
                            nextLabel={"Next"}
                            nextClassName={offset === pageCount || pageCount === 0 ? "d-none" : ""}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            forcePage={offset - 1}
                        />
                    </div>
                </Col>

                <Col md="3">
                    <div className="unicamp-event-box unicamp-box">
                        <div className="box-header">
                            <h4 className="box-title">Student Exchange</h4>
                        </div>
                        <div className="box-body" style={{ paddingTop: '30px' }}>
                            {
                                infoHighlight && infoHighlight.map((item, index) => {
                                    return (
                                        <div className={`post-item ${index === 3 ? "" : "line-post-item"}`} style={{ padding: '0px 0px' }}>
                                            <div className="event-caption">
                                                <div className="right-box">
                                                    <h3 className="post-title-relate post-title-relate-2-rows title-has-link" >
                                                        <Link to={item.link.slice(23, item.link.length)} style={{ fontWeight: '300' }}>{item.title}</Link>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentExchange;