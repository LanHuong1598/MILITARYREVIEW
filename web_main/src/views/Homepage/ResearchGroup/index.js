import React, { useState , useEffect} from 'react';
import ContentLabel from 'views/Content/ContentLabel'
import axios from 'axios'
import { Col, Row, Container } from 'reactstrap'
import Slider from "react-slick";
import _researcher from "./researcher.js";
import _researcher2 from "./researcher2.js";
import './style.css';
export default function ResearchGroup() {
    const [ReseacherGroups, setReseacherGroups] = useState([]);
    useEffect(() => {
        // set loading to wait get data
        const requestGroup = `http://27.71.228.19:5004/api/research_group?unit=Home&page=1&size=1000`
        axios.get(requestGroup).then(response => {
            const temp = response.data
            setReseacherGroups(temp)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }, [])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed:3000,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    
    let elements = ReseacherGroups.map((researchergroup, index) => {
        let result = '';
        if (index % 2 === 0)
            result = <_researcher
                key={index}
                id={researchergroup.id}
                image={researchergroup.image}
                name={researchergroup.name}
                title={researchergroup.title}
                page_path={researchergroup.page_path}
            ></_researcher>
        else
            result = <_researcher2
                key={index}
                id={researchergroup.id}
                image={researchergroup.image}
                name={researchergroup.name}
                title={researchergroup.title}
                page_path={researchergroup.page_path}
            ></_researcher2>
        return result;
    });
    return (
        <div id='contentlabelRes' className="researchGroup" >
            <Container>
                <ContentLabel tittle="Research Group" ></ContentLabel>
            </Container>
            <div className="background-white full-width" style={{ marginTop: '2em', }}>
                <Slider {...settings}>
                    {elements}
                </Slider>
            </div>
        </div>
    )
}
