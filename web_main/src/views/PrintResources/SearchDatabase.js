import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Button, Container, Row, Col } from 'reactstrap'
import { Search } from 'react-feather'
import axios from "axios"
import './style.css'
export default function SearchDatabase() {
    const [statisticDb, setStatisticDb] = useState();
    useEffect(() => {
        const requestUrl = `${process.env.REACT_APP_API_URL}api/catalog_db/countByDocumentFormat`
        axios.get(requestUrl).then(response => {
            let documentAmount = {
                "Books": 0,
                "Reference Books": 0,
                "Graduation thesis": 0,
                "Textbooks": 0,
                "Theses": 0,
                "Dissertations": 0
            }
            response.data.map((item) => {
                switch (item.document_format) {
                    case "ĐA":
                        documentAmount["Graduation thesis"] = item.total;
                        break;
                    case "GT":
                        documentAmount["Textbooks"] = item.total;
                        break;
                    case "LA":
                        documentAmount["Theses"] = item.total;
                        break;
                    case "LATS":
                        documentAmount["Dissertations"] = item.total;
                        break;
                    case "SH":
                    case "462p.":
                    case "pdf":
                    case "VA":
                        documentAmount["Books"] += item.total;
                        break;
                    case "TK":
                    case "TK#08/03/2012":
                    case "TK#TK":
                        documentAmount["Reference Books"] += item.total;
                        break;
                    default:
                        break;
                }
            })
            let str = "";
            Object.keys(documentAmount).map((key, index) => {
                str += `${key}: ${documentAmount[key]} ${index === Object.keys(documentAmount).length - 1 ? "" : "| "}`
                setStatisticDb(str)
            })
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        });
    }, []);
    const history = useHistory();
    const _handleSearchCatalog = () => {
        const textSearch = document.getElementById("searchTextEngine").value;
        history.push(`/catalog?search=${textSearch}`);
        document.getElementById("searchTextEngine").value = "";
    }
    const _handleSearch = (e) => {
        if (e.key == 'Enter') {
            _handleSearchCatalog();
        }
    }
    return (
        <Container className="resource_database">
            <Row className='resource-Multil'>
                <Col md='12' sm='12'>
                    <h4 className="tittleContentLabel">
                        <span className="contentLabel">Catalog Databases</span>
                    </h4>
                    {/* <h4 className="tittleContentLabelCata">
                        <span className="contentLabel text-uppercase">Catalog Databases</span>
                    </h4> */}
                    {
                        statisticDb &&
                        <p className='decriptionSearch w-100'>{statisticDb}</p>
                    }
                </Col>
            </Row>
            {/* <img src={require('assets/img/custom/resource/CatalogDatabase.png').default} className="img-fluid" /> */}

            <Row className="resource_select">
                <Col md='10' sm='9' className='d-flex'>
                    <Input type="Search" id="searchTextEngine" placeholder="Search books, journals, articles, and more..." className="inputS" onKeyPress={(e) => _handleSearch(e)}></Input>
                </Col>
                <Col md="2" sm='3' className='d-flex justify-content-end w-100'>
                    <Button className='btnSearch px-4 d-flex'
                        onClick={() => {
                            _handleSearchCatalog();
                        }} ><i className="fa fa-search m-auto"></i><span className='ml-1'>Search</span></Button>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <p className='decriptionSearch w-100'>Provide cataloge databases of available materials at the library of LQDTU, support to find materials on demand, to borrow - return books from afar and to send a letter of request,...</p>
                </Col>
            </Row>
        </Container>
    )
}
