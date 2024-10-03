import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Breadcrumbs from 'components/BreadCrumbs/Breadcrumbs'
import { Container, Row, Col } from 'reactstrap'
// ** redux
import { updateBreadCrumbNews, updateCategory } from 'redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux'
import ImageBackground from 'components/Headers/ImageBackground.js'

export default function LecturerDetail() {
    const dispatch = useDispatch()
    useEffect(() => {
        // update breadcrumbs
        const menuArr = [
            {
                title: "Home",
                path: `/`
            },
            {
                title: 'Lecturer',
                path: ""
            },
            {
                title:'Đỗ Phan Thuận',
                path: ""
            },
        ]
        dispatch(updateBreadCrumbNews(menuArr))
    }, [])
    const imgLink = [
        {
          src: require('assets/img/custom/slide/55nam.jpg').default,
          altText: 'MTA Image'
        },
      ]
    return (
        <Fragment>
        <ImageBackground height={500} imgSrc={imgLink} />
        <Container className="wp-lecturer">
            <Row>
                <Col md={12} style={{marginBottom:'3rem'}}>
                    <Breadcrumbs></Breadcrumbs>
                    
                </Col>
                <Col md={4}>
                
                    <a href='#'target="_blank">
                        <img style={{width: '100%'}} src={require('assets/img/researchImages/research-slide2.png').default} className="img-lecturer"></img>
                    </a>
                    <h3>
                        <span>
                            <strong>Đỗ Phan Thuận</strong>
                        </span>
                    </h3>
                    <p style={{textAlign: 'justify'}}>Phó giáo sư, Khoa Khoa học Máy tính</p>
                    <p style={{textAlign: 'justify'}}>Tiến sĩ (Khoa học máy tính, Đại học tổng hợp Burgundy, CH Pháp, 2008)
                    Thạc sĩ (Khoa học máy tính, Đại học Paris 7, CH Pháp, 2005)
                    Kỹ sư (Công nghệ thông tin, Đại học Bách khoa Hà Nội, 1998)</p>
                    <p style={{textAlign: 'justify'}}>Email: thuandp@soict.hust.edu.vn</p>
                    <h4>
                        <span>
                            <strong>Giải thưởng, khen thưởng</strong>
                        </span>
                    </h4>
                    <ul style={{textAlign: 'justify'}}>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                    </ul>
                </Col>
                
                <Col md={8}>
                    <h4>
                        <span>
                            <strong>Giới thiệu</strong>
                        </span>
                    </h4>
                    <p style={{textAlign: 'justify'}}>
                        <span >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</span>
                    </p>
                    <h4>
                        <span>
                            <strong>Lĩnh vực nghiên cứu</strong>
                        </span>
                    </h4>
                    <ul style={{textAlign: 'justify'}}>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                    </ul>
                    <h4>
                        <span>
                            <strong>Hướng chuyên sâu</strong>
                        </span>
                    </h4>
                    <ul style={{textAlign: 'justify'}}>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                    </ul>
                    <h4>
                        <span>
                            <strong>Hoạt động trong nước</strong>
                        </span>
                    </h4>
                    <ul style={{textAlign: 'justify'}}>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                    </ul>
                    <h4>
                        <span>
                            <strong>Hoạt động trông ISI/SCOPUS</strong>
                        </span>
                    </h4>
                    <ul style={{textAlign: 'justify'}}>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                    </ul>

                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h4>
                        <span>
                            <strong>Danh sách bài báo</strong>
                        </span>
                    </h4>
                    <ul style={{textAlign: 'justify'}}>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                    </ul>
                    <h4>
                        <span>
                            <strong>DS SHTT</strong>
                        </span>
                    </h4>
                    <ul style={{textAlign: 'justify'}}>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                        <li >Le Quy Don Technical University (LQDTU) is one of the leading universities of science and technology in Viet Nam, which offers multidisciplinary undergraduate and postgraduate education in engineering and management.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
        </Fragment>
    )

}