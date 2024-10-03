import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap';
export default function MediaLQDTU() {
    const [Introduction, setIntroduction] = useState()
    const [loaded, setLoaded] = useState()
    const titleRef1 = useRef(null)
    useEffect(() => {
        titleRef1.current?.scrollIntoView({ behavior: 'smooth' });
        const introMedia = [
            {
                title: "Student Life",
                image: require('assets/img/custom/student/student_life.jpg').default,
                linkSrc: `/life`,
                name: 'life',
                content: "LQDTU learning environment and some attractions",
            },
            {
                title: "Student Contests",
                image: require('assets/img/custom/student/student_contest.jpg').default,
                linkSrc: '/careerAndContest/contest/robocon',
                name: 'contests',
                content: "Contest participation and achievement",
            },
            {
                title: "Student Exchange",
                image: require('assets/img/custom/student/student_exchange.jpg').default,
                linkSrc: `/exchange`,
                name: 'exchange',
                content: "LQDTU students abroad and international students at LQDTU",
            },
            {
                title: "Career Opportunities",
                image: require('assets/img/custom/student/career_oppo.jpg').default,
                linkSrc: '/career',
                name: 'career',
                content: "Career information for students",
            },
            {
                title: "Student Clubs",
                image: require('assets/img/custom/student/student_club.jpg').default,
                linkSrc: '/clubs/overview',
                name: 'club',
                content: "Clubs and activities",
            },
            {
                title: "Image",
                image: require('assets/img/custom/student/image_media.jpg').default,
                linkSrc: '/list/imageStudent/1',
                name: 'image',
                content: "Student activities by media",
            },
        ];
        setIntroduction(introMedia)
    }, [])

    return (
        <Row className='my-5' ref={titleRef1}>
            {
                Introduction && Introduction.map((info, key) => {
                    return (
                        <>
                            <Col md="3" className="studentMediaimage">
                                <Link to={info.linkSrc} className="listStudentElement" target={'_blank'}>
                                    <img src={info.image} style={{ width: '250px', height: '250px' }}></img>
                                </Link>
                            </Col>
                            <Col md="3" sm="6" className="student-info" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                <p className="me-info-1" style={{ color: '#e81d1d', fontWeight: '700', fontSize: '24px', marginBottom: '0.3em', lineHeight: '167%' }}>
                                    <Link to={info.linkSrc} style={{ color: '#e81d1d', fontWeight: '700', marginBottom: '0.3em', fontSize: '24px' }} target={'_blank'}>{info.title}</Link>
                                </p>
                                <p style={{ color: '#161616;', fontSize: '18px', fontWeight: '400', marginBottom: '1em', lineHeight: '163.68%' }}>{info.content}</p>
                                <Link style={{ color: '#e81d1d', fontSize: '16px', fontWeight: '700', marginBottom: '4px', textDecorationLine: 'underline' }} to={info.linkSrc} target={'_blank'}>Read more</Link>
                            </Col>
                        </>
                    )
                })
            }
        </Row>
    )
}
