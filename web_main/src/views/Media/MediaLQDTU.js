import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ContentLabel from 'views/Content/ContentLabel';
import { Container, Row, Col } from 'reactstrap';
import Intro from "./Intro.js";
export default function MediaLQDTU() {
    const introMedia = [
        {
            title: "Internal bulletin",
            content: "Internal e-publications on LQDTU activities",
            image: require('assets/img/custom/media/Group 72.png').default,
            imgtil: "BULLETIN",
            linkSrc:'#nolink'
        },
        {
            title: "Brand identity system",
            content: "Design samples of publications and media products of LQDTU",
            image: require('assets/img/custom/media/Group 71.png').default,
            imgtil: "BRANDING",
            linkSrc:'#nolink'
        }
    ];
    const multiMedia = [
        {
            title: "Image",
            content: "Images of campus, facilities, students and activities of LQDTU",
            image: require('assets/img/custom/media/Group 75.png').default,
            imgtil: "IMAGE",
            linkSrc:'/list/image/5'
        },
        {
            title: "Video",
            content: "Videos of activities, science & technnology products of LQDTU",
            image: require('assets/img/custom/media/Group 76.png').default,
            imgtil: "VIDEO",
            linkSrc:'https://www.youtube.com/channel/UCGmbHJQJj91jUeiCe_zoaBg'
        }
    ];
    let Introduction = introMedia.map((item, index) => {
        return <Intro
                key={index}
                info = {item}
        ></Intro>
       
    });
    let Multi = multiMedia.map((item, index) => {
        return <Intro
                key={index}
                info = {item}
        ></Intro>
    });
    return (
        <>
            <Row className='media-Intro'>
                <Col md='12' sm='12'>
                    <ContentLabel tittle="LQDTU Introduction publication " ></ContentLabel>
                </Col>
            </Row>
            <Row>
                {Introduction}
            </Row>
            <p className='p-border' style={{width:'100%',borderBottom: '1px solid #E5E5E5', marginTop:'40px', marginBottom: '40px'}}></p>
            <Row className='media-Multil'>
                <Col md='12' sm='12'>
                    <ContentLabel tittle="LQDTU Multimedia"></ContentLabel>
                </Col>
            </Row>
            <Row>
                {Multi}
            </Row>
            <p className='p-border' style={{width:'100%',borderBottom: '1px solid #E5E5E5', marginTop:'44px', marginBottom: '150px'}}></p>
        </>

    )
}
