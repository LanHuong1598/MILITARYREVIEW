import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Row } from 'reactstrap';
import Loader from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser'
import SlideResearch from './SlideResearch/SlideResearch';
//optimize image
// import Img from 'react-optimized-image';

import ISIImg from 'assets/img/researchImages/ISI-background.jpeg';


import './style.css';

export default function Research(props) {
    const unit = props.unit;
    const [infoNewsPublication, setinfoNewsPublication] = useState([])
    const [infoNewsPatent, setinfoNewsPatent] = useState([])
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestUrlPublication = `http://27.71.228.19:5004/api/publications?page=1&size=2&type=publication&isFeatured=1&unit=${unit}`
        const requestUrlPatent = `http://27.71.228.19:5004/api/publications?page=1&size=2&type=patent&isFeatured=1&unit=${unit}`
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
                            
                            <div className="reseach-body">
                                <div className="research-item" style={{marginRight:'30px'}}>
                                    <img src={ISIImg} alt="img"></img>
                                    <div className="ISI-item research-content">
                                        <h4>ISI, Scopus Collection</h4>
                                        <div className="ISI-body">
                                            {infoNewsPublication.map((item, index) => {
                                                return (
                                                    <ul>
                                                        <li>
                                                            <p className="infoCollection">
                                                                {ReactHtmlParser(item.authors)},"{ReactHtmlParser(item.title)}", {item.resource.includes("<p>") ? ReactHtmlParser(item.resource) : <p>{item.resource}</p>}, <p>{item.publish_month == 0 ? "" : `${item.publish_month}.`}{item.publish_year}</p>
                                                            </p>
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
                                    <div className="research-content" style={{paddingTop: '0px'}}>
                                        <SlideResearch/>
                                    </div>
                                </div>
                            </div>
                        </Row>
                       
                    </div>
            }

        </Container>
    )
}
