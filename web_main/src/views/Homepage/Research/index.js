import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Row } from 'reactstrap';
import Loader from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser'
import SlideResearch from './SlideResearch/SlideResearch';
//optimize image
// import Img from 'react-optimized-image';
import StartImg from 'assets/img/researchImages/star.png';
import ResearchLogo from 'assets/img/researchImages/research-logo.png';
import ISIImg from 'assets/img/researchImages/ISI-background.jpeg';
import IPCImg from 'assets/img/researchImages/IPC-background.jpeg';

import './style.css';

export default function Research() {
    const [infoNewsPublication, setinfoNewsPublication] = useState([])
    const [infoNewsPatent, setinfoNewsPatent] = useState([])
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestUrlPublication = `http://27.71.228.19:5004/api/publications?page=1&size=2&type=publication&isFeatured=1&unit=Home`
        const requestUrlPatent = `http://27.71.228.19:5004/api/publications?page=1&size=2&type=patent&isFeatured=1&unit=Home`
        axios.get(requestUrlPublication).then(response => {
            const temp = response.data
            setinfoNewsPublication(temp)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
        axios.get(requestUrlPatent).then(response => {
            const temp = response.data
            setinfoNewsPatent(temp)
            setLoaded(true)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })

    }, [])
    return (
        <Container className="wp-research">
            <h2 className="research-title">Research</h2>
            {
                !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                    <div>
                        <Row className="Research" style={{ marginRight: '0px', marginLeft: '0px' }}>
                            <div className="research-lable">
                                <img src={StartImg} alt="img" />
                                <h3>ISI, Scopus & Intellectual Property Collection</h3>
                                <img className="research-logo" src={ResearchLogo} alt="img" />
                            </div>
                            <div className="reseach-body">
                                <div className="research-item">
                                    <img src={ISIImg} alt="img"></img>
                                    <div className="ISI-item research-content">
                                        <h4>ISI, Scopus Collection</h4>
                                        <div className="ISI-body">
                                            {infoNewsPublication.map((item, index) => {
                                                return (
                                                    <ul>
                                                        <li>
                                                            <div className="infoCollection">
                                                                {ReactHtmlParser(item.authors)},"{ReactHtmlParser(item.title)}", {item.resource.includes("<p>") ? ReactHtmlParser(item.resource) : <p>{item.resource}</p>}, <p>{item.publish_month == 0 ? "" : `${item.publish_month}.`}{item.publish_year}</p>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                )
                                            })
                                            }
                                        </div>
                                        <Link to={`/research/list`} className="viewAllCollection">Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="research-item">
                                    <img src={IPCImg} alt="img"></img>
                                    <div className="IPC-item research-content">
                                        <h4>Intellectual Property Collection</h4>
                                        <div className="ISI-body">
                                            {infoNewsPatent.map((item, index) => {
                                                return (
                                                    <ul>
                                                        <li>
                                                            <div className="infoCollection">
                                                                {ReactHtmlParser(item.authors)},"{ReactHtmlParser(item.title)}", {item.resource.includes("<p>") ? ReactHtmlParser(item.resource) : <p>{item.resource}</p>}, <p>{item.publish_month == 0 ? "" : `${item.publish_month}.`}{item.publish_year}</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                            }
                                        </div>
                                        <Link to={`/patent/list`} className="viewAllCollection">Xem thêm</Link>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <SlideResearch />
                    </div>
            }

        </Container>
    )
}
