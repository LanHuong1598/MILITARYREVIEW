import React from 'react';

import ListBook from './ListBook';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap'

export default function Resources() {
    return (
        <div className="bg-contentNew">
            <Container className="books">
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={9}>
                                <h4 className="tittleContentLabel">
                                    <span className="contentLabel">Các số đã xuất bản</span>
                                </h4>
                            </Col>
                            <Col md={3} >
                                <div className="tm-button-wrapper" style={{ textAlign: 'right' }}>
                                    <Link className="button-content-wrapper" to="/books/all">
                                        <span className="button-text">
                                            Xem thêm
                                        </span>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                        <p className='p-border' style={{ width: '100%', borderBottom: '1px solid #BDBDBD', marginTop: '16px', marginBottom: '38px' }}></p>
                        {/* <span className="introlabel">Giới thiệu các giáo trình và tài liệu tham khảo điển hình dạng in theo từng lĩnh vực</span> */}
                        <ListBook></ListBook>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
