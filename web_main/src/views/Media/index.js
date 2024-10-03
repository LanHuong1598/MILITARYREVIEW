import React, { useState, useEffect, Fragment } from 'react'
import { updateBreadCrumbNews } from 'redux/actions/menu'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from 'components/BreadCrumbs/Breadcrumbs'
import { Container, Row, Col } from 'reactstrap'
import MediaLQDTU from './MediaLQDTU.js'
import ImageBackground from 'components/Headers/ImageBackground.js'
import axios from 'axios'
export default function Media() {
    const [infoBanner, setinfoBanner] = React.useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        // update breadcrumbs
        const menuArr = [
            {
                title: "Home",
                path: `/`
            },
            {
                title: 'Media',
                path: ""
            }
        ]
        dispatch(updateBreadCrumbNews(menuArr))
    }, [])
    useEffect(() => {
        // set loading to wait get data
        const requestUrlBanner = `http://27.71.228.19:5004/api/banner?type=Menu&unit=home&menu=media`
        
        axios.get(requestUrlBanner).then(response => {
            const temp = response.data
            setinfoBanner(temp)
            
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }
    )
    return (
        <Fragment>
            <ImageBackground height={500} imgSrc={infoBanner} />
            <Container className="wp-media">
                <Row>
                    <Col md={12}>
                        <Breadcrumbs></Breadcrumbs>
                        <MediaLQDTU></MediaLQDTU>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
