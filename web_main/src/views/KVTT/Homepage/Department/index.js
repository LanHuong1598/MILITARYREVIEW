import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Row } from 'reactstrap';
import Loader from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser'
import SlideDepartment from './SlideDepartment/SlideDepartment';
//optimize image
// import Img from 'react-optimized-image';
import StartImg from 'assets/img/researchImages/star.png';
import ResearchLogo from 'assets/img/researchImages/research-logo.png';
import ISIImg from 'assets/img/researchImages/ISI-background.jpeg';
import IPCImg from 'assets/img/researchImages/IPC-background.jpeg';

import './style.css';

export default function Academics({unit}) {
    const [infoDepartment, setinfoDepartment] = useState([])
    
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestUrlDepartment = `http://27.71.228.19:5004/api/department?unit=${unit}&page=1&size=3`
        
        axios.get(requestUrlDepartment).then(response => {
            const temp = response.data
            setinfoDepartment(temp)
            setLoaded(true)
            
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
       
    }, [])
    return (
        <Container className="wp-research">
            <h2 className="research-title">DEPARTMENTS</h2>
            {
                !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                    <div>
                        
                        <SlideDepartment infoDepartment={infoDepartment}/>
                    </div>
            }

        </Container>
    )
}
