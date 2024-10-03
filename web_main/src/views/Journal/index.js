import React from 'react'
import ContentLabel from 'views/Content/ContentLabel'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import HtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom'
import './style.css'
export default function Research() {
    const [infoJST, setinfoJST] = useState([])
    const [infoAnnouc, setinfoAnnouc] = useState([])
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        // set loading to wait get data
        const requestUrlPublication = `http://27.71.228.19:5004/api/jst_cover/active?unit=Home`
        const requestUrlPatent = `http://27.71.228.19:5004/api/jst_announcements?unit=Home`
        axios.get(requestUrlPublication).then(response => {
            console.log(response)
            const temp = response.data
            setinfoJST(temp)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
        axios.get(requestUrlPatent).then(response => {
            const temp = response.data
            setinfoAnnouc(temp)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })

    }, [])
    const infoJournal = [
        {
            title: "LQDTU JST Call for Paper",
            content: "LQDTU Journal of Science & Technique (LQDTU-JST) is managed and published by Le Quy Don Technical University …",
            link: "https://jst.lqdtu.edu.vn/index.php/jst/announcement/view/31"
        },
        {
            title: "LQDTU JST-ICT Call for Paper",
            content: "Section of Information and Communication Technology (ICT) is a special edition of the Journal of Science and Technology published by …",
            link: "https://jst.lqdtu.edu.vn/index.php/ict/announcement/view/26"
        }
    ]
    return (
        <div className="journal">
            <Container >
                <Row>
                    <Col md='12' sm='12'>
                        <ContentLabel tittle="Journal of Science and Technique"></ContentLabel>
                    </Col>
                </Row>
                <Row style={{ marginTop: '35px' }}>
                    <Col md='3' sm='6'>
                        <a href={infoJST.current_issue} target="_blank">
                            <img src={`http://27.71.228.19:5004/${infoJST.image}`} className="img-fluid">
                            </img>
                        </a>

                        <a href={infoJST.current_issue} target="_blank" className="currentIssue">Current Issue</a>
                    </Col>
                    <Col md='3' sm='6'>
                        {/* <a href="https://jst.lqdtu.edu.vn/index.php/jst/AS" target="_blank">
                            <img src={require('assets/img/custom/research/about.png').default} className="img-fluid">
                            </img>
                        </a> */}
                        <a href="https://jst.lqdtu.edu.vn/index.php/jst/AS" className="about_link_journal" target="_blank">
                            <div className="topic">
                                <div className="topic_header">
                                    <span>About LQDTU-JST</span>
                                </div>
                                <div className="topic_content">
                                    <p className="topic_title">Welcome to Journal of Science & Technique of Le Quy Don Technical</p>
                                    <p className="topic_description">LQDTU-JST is a peer-reviewed double-blind journal with international publication code ISSN 1859-0209 for issue of 12 annual editions.</p>
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col md='6' sm='12'>
                        <div className="announcement">
                            <div className="announcement_header">
                                <span>Announcements</span>
                            </div>
                            {
                                infoAnnouc.map((item, index) => {
                                    return (
                                        <div className="announcement_content">
                                            <div className={`post-item ${index === 0 ? 'line-post-item' : 'pb-0'}`}>
                                                <div className="event-caption">
                                                    <div className="left-box">
                                                        <div className="post-categories">
                                                            <span className="cat-shape-journal">
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="right-box">
                                                        <a href={item.link} target="_blank" className="topic_title_announce">{item.title}</a>
                                                        <p className="topic_description_announce">{HtmlParser(item.content)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
