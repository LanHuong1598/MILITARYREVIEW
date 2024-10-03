import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Row, Col } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'
import '../../News/css/newsAll.css'
// ** redux
import { updateBreadCrumbNews, updateSelecteDetail, updateMenuPatent } from 'redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux'
// ** Loader
import Loader from "react-loader-spinner";

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

export default function ListDetailPatent() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState()

    const [infoPatent, setInfoPatent] = useState([])
    const [numTotal, setNumTotal] = useState(5)
    useEffect(() => {
        setLoaded(false)
        const requestUrl = "http://27.71.228.19:5004/api/publications/all?type=patent&unit=Home"
        axios.get(requestUrl).then((res) => {
            const total = res.headers["content-range"]
            const data = res.data;
            setInfoPatent(data)
            setNumTotal(total)
            setLoaded(true)
        })
        axios.get('http://27.71.228.19:5004/api/menuItem/1').then((res) => {
            const menuResearch = res.data.find(item => item.title == 'Research')
            dispatch(updateMenuPatent(menuResearch))
        })
        const menuArr = [
            {
                title: "Research",
                path: `#`
            },
            {
                title: 'Intellectual Property',
                path: ""
            }
        ]
        dispatch(updateBreadCrumbNews(menuArr))
        dispatch(updateSelecteDetail({ id: 5678 }))
    }, [])
    // PDF file
    const handleOnDownload = (data) => {
        printDocument(handleConvertDataToHtml(data))
    }
    const handleConvertDataToHtml = listData => {
        let htmlContext = ""
        listData.map((item, index) => {
            let pubDate = item.publish_date == 0 ? "" : `${item.publish_date}.`
            let pubMonth = item.publish_month == 0 ? "" : `${item.publish_month}.`
            htmlContext += `<div key=${index}>
            ${index + 1}.  ${item.authors}, "${item.title}", ${item.patent_number}, ${item.decision_number}, ${item.resource.trim()}, <p>${pubDate}${pubMonth}${item.publish_year}</p>
        </div>`
        })
        htmlContext += `</div>`
        //standard context
        htmlContext = htmlContext.replaceAll("<p>", "<span>").replaceAll("</p>", "</span>")
        return htmlContext
    }
    const printDocument = (pdfTable) => {
        //const input = document.getElementById('divToPrint');
        const doc = new jsPDF();
        //html to pdf format
        // var html = htmlToPdfmake(pdfTable.innerHTML);
        var html = htmlToPdfmake(pdfTable);
        const documentDefinition = {
            info: {
                title: "LQDTU’s Intellectual Property Collection",
                author: 'LQDTU'
            },
            content: html,
            header: {
                columns: [
                    { text: `LQDTU’s Intellectual Property Collection`, alignment: 'left', margin: [10, 10, 10, 10] },
                    // { text: "All", alignment: 'right', margin: [10, 10, 10, 10] }
                ]
            },
            defaultStyle: {
                alignment: 'justify'
            }
        };
        const fileName = "LQDTU’s Intellectual Property Collection"
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();
    }
    return (
        infoPatent &&
            !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
            <div className="main-app">
                <div>
                    <Row className="row_title_custom">
                        <Col md="12" className="pl-0">
                            <span className="research_title_custom">Intellectual Property</span>
                        </Col>
                    </Row>
                    <div className="btn_download_patent d-flex">
                        <Button id="btnDownloadPublish" style={{ backgroundColor: '#e81d1d' }} onClick={() => handleOnDownload(infoPatent)}>Download PDF</Button>
                    </div>
                    <ul className="list-unstyled list_research">
                        {
                            infoPatent.map((item, index) => {
                                let pubDate = item.publish_date == 0 ? "" : `${item.publish_date}.`
                                let pubMonth = item.publish_month == 0 ? "" : `${item.publish_month}.`
                                return (
                                    <li key={index} className="right-box-research-other">
                                        <span style={{ fontSize: '1rem' }}>{index + 1}</span>.  {ReactHtmlParser(item.authors)},"{ReactHtmlParser(item.title)}", <span style={{ fontSize: '1rem' }}>{item.patent_number}, {item.decision_number},</span> {item.resource.includes("<p>") ? ReactHtmlParser(item.resource) : <p>{item.resource}</p>}, <p>{pubDate}{pubMonth}{item.publish_year}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
    );
}
