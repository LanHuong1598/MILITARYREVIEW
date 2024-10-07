import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap'
export default function MediaLQDTU(props) {
    const info = props.info
    return (
        <>
            {
                info.title === "Video" ? <>
                    <Col md='3' sm='6' className="me-image" className={info.imgtil} style={{ backgroundImage: ``, backgroundSize: '100% 100%' }}>
                        <a href={info.linkSrc} target="_blank">
                            <img src={info.image} className="img-media"></img>
                        </a>
                        <p style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '700', marginTop: '5px' }}>{info.imgtil}</p>
                    </Col>
                    <Col md="3" sm="6" className="me-info" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                        <p className="me-info-1" style={{ color: '#e81d1d', fontWeight: '700', fontSize: '24px', marginBottom: '0.3em', lineHeight: '167%' }}>
                            <a href={info.linkSrc} target="_blank" style={{ color: '#e81d1d', fontWeight: '700', marginBottom: '0.3em', fontSize: '24px' }}>{info.title}</a>
                        </p>
                        <p style={{ color: '#161616;', fontSize: '18px', fontWeight: '400', marginBottom: '1em', lineHeight: '163.68%' }}>{info.content}</p>
                        <a target="_blank" style={{ color: '#e81d1d', fontSize: '16px', fontWeight: '700', marginBottom: '4px', textDecorationLine: 'underline' }} href={info.linkSrc}>Xem thêm</a>
                    </Col>
                </> : <>
                    <Col md='3' sm='6' className="me-image" className={info.imgtil} style={{ backgroundImage: ``, backgroundSize: '100% 100%' }}>
                        <Link to={info.linkSrc}>
                            <img src={info.image} className="img-media"></img>
                        </Link>
                        <p style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '700', marginTop: '5px' }}>{info.imgtil}</p>
                    </Col>
                    <Col md="3" sm="6" className="me-info" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                        <p className="me-info-1" style={{ color: '#e81d1d', fontWeight: '700', fontSize: '24px', marginBottom: '0.3em', lineHeight: '167%' }}>
                            <Link to={info.linkSrc} style={{ color: '#e81d1d', fontWeight: '700', marginBottom: '0.3em', fontSize: '24px' }}>{info.title}</Link>
                        </p>
                        <p style={{ color: '#161616;', fontSize: '18px', fontWeight: '400', marginBottom: '1em', lineHeight: '163.68%' }}>{info.content}</p>
                        <Link style={{ color: '#e81d1d', fontSize: '16px', fontWeight: '700', marginBottom: '4px', textDecorationLine: 'underline' }} to={info.linkSrc}>Xem thêm</Link>
                    </Col>
                </>
            }
        </>
    )
}