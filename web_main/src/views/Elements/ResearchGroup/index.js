import React, {useState, useEffect} from 'react'
import axios from 'axios'
import HtmlParser from 'react-html-parser';
import { updateBreadCrumbNews, updateMenuPatent, updateSelecteDetail,  } from 'redux/actions/menu';
import { useParams } from 'react-router';
// ** Loader
import Loader from "react-loader-spinner";
import './style.css';
import { Col, Container, Row,Table } from 'reactstrap';
export default function ResearchGroup() {
    const {id} = useParams();  
    const [infoGroup, setinfoGroup] = useState([])
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestGroup = `http://27.71.228.19:5004/api/research_group/${id}`
        axios.get(requestGroup).then(response => {
            const temp = response.data
            setinfoGroup(temp)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
        
    }, [])
    
    
    return (
        <Container>
        <div className='staffPage' style={{marginTop: '60px'}}>
            <Row>
                <Col md={4} sm={12}>
                    <img alt="img" src={`http://27.71.228.19:5004/${infoGroup.image}`} style={{width:'370px',height:'270px'}}></img>
                </Col>
                <Col md={8} sm={12}>
                    <h1 style={{fontSize: 34, fontWeight: 'bold', color:'#e81d1d', marginLeft:'30px'}}>{infoGroup.name}</h1>
                </Col>
            </Row>
            <div className='staff-item' style={{marginTop:'30px'}}>
                <div className='staffbody'>
                    {infoGroup && HtmlParser(infoGroup.content)}
                </div>
            </div>
        </div>
        </Container>
    )
}
