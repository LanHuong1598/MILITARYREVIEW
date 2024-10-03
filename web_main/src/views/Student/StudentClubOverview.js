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
import { toDateTimeStringEnglish, capitalize } from 'utils/utils';
import HtmlParser from 'react-html-parser';
import Loader from "react-loader-spinner";
import '../News/css/newsAll.css'
import '../../assets/css/news.css';
export default function StudentClubOverview() {
    const dispatch = useDispatch()
    const [menuItem, setMenuItem] = useState()
    const [loaded, setLoaded] = useState()
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const pathSplit = window.location.pathname.split('/')
        const unitName = pathSplit[pathSplit.length - 2]
        const pathName = pathSplit[pathSplit.length - 1]
        axios.get(`http://27.71.228.19:5004/api/introduction/3`).then(response => {
            const temp = response.data
            setMenuItem(temp)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }, [window.location.pathname])
    useEffect(() => {
    
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
                title: "Student Clubs",
                path: ""
            },
            ,
            {
                title: "Overview",
                path: ""
            }

        ]
        dispatch(updateBreadCrumbNews(menuArr))
    }, [])
    
    

    return (
        <Container>
            <Row>
                <Col md="9" style={{ marginTop: '120px' }}>
                <Breadcrumbs></Breadcrumbs>
                <>
                    <h3 className="customPage_title">Clubs</h3>
                    <div className="customPage_content">
                        {menuItem && HtmlParser(menuItem.content)}
                    </div>
                </>
                </Col>

                <Col md="3">
                    <div className="unicamp-event-box unicamp-box">
                        <div className="box-header">
                            <h4 className="box-title">Student Club</h4>
                        </div>
                        <div className="box-body" style={{ paddingTop: '30px' }}>    
                            <div className='' style={{ padding: '0px 0px' }}>
                                <div className="event-caption">
                                    <div className="right-box">
                                        <h3 className="post-title-relate post-title-relate-2-rows title-has-link" >
                                            <a className='text-subgreen' href='/clubs/overview' >Overview</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>                                
                            <div  style={{ padding: '0px 0px' }}>
                                <div className="event-caption">
                                    <div className="right-box">
                                        <h3 className="post-title-relate post-title-relate-2-rows title-has-link" >
                                            <a  href='/club' style={{ fontWeight: '300' }} >News</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>                              
                        </div>
                        
                    </div>
                </Col>
            </Row>
        </Container>
    );
}