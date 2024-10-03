import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap'
import MegaSearch from './MegaSearch'
// ** international
import { IntlContext } from '../../utils/context/Internationalization'
export default function FirstHeader() {
    const [pathName, setPathname] = useState("")
    useEffect(() => {
        setPathname(window.location.pathname)
    }, [window.location.pathname])
    const context = useContext(IntlContext)
    return (
        <Container className="wp_firstheader">
            <Row>
                    <a href="/">
                        <img src={require('assets/img/custom/logo/logo.jpg').default}
                            className="img-fluid logo_header"
                            alt="image">
                        </img>
                        <img src={require('assets/img/custom/logo/logo_mobile.png').default}
                            className="img-fluid logo_header_mobile"
                            alt="image">
                        </img>
                    </a>
                    {
                        pathName.includes("kvtt") && <span className=' d-inline-block font-weight-bold text-uppercase'>faculty of information and technology</span>
                    }
            </Row>
        </Container>
    )
}
