import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap';
import Loader from "react-loader-spinner";
import ContentNews from './ContentNews';
import ContentLabel from './ContentLabel';
import ContentUpComing from './ContentUpComing';
export default function News({unit}) {

    const [infoLatest, setInfoLatest] = useState()
    const [infoRelated, setInfoRelated] = useState()
    const [loaded, setLoaded] = useState()
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestUrl_1 = `http://27.71.228.19:5004/api/news?unit=${unit}&page=1&size=5`;
        const requestUrl_2 = `http://27.71.228.19:5004/api/news/getBySpotlight?unit=${unit}`;
        axios.all([axios.get(requestUrl_1),
        axios.get(requestUrl_2)])
            .then(axios.spread((firstResponse, secondResponse) => {
                setInfoLatest(firstResponse.data)
                setInfoRelated(secondResponse.data)
                setLoaded(true)
            }))
            .catch(error => console.log(error));
    }, [])

    return (
        <div className="bg-contentNew">
            <Container>
                {
                    !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                        <Row>
                            <Col md={8} sm={12}>
                                <ContentLabel tittle="Latest News"></ContentLabel>
                                <ContentNews infoLatest={infoLatest}></ContentNews>
                            </Col>
                            <Col md={4} sm={12}>
                                <ContentUpComing infoRelated={infoRelated}></ContentUpComing>
                            </Col>
                        </Row>
                }

            </Container>
        </div>

    )
}
