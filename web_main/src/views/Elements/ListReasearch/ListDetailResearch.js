import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Input, Row, Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import ReactHtmlParser from 'react-html-parser'
import '../../News/css/newsAll.css'
// ** redux
import { updateBreadCrumbNews, updateSelecteDetail, updateMenuResearch } from 'redux/actions/menu';
import { useDispatch } from 'react-redux'
// ** PDF
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import './style.css'
export default function ListDetailResearch() {
    const dispatch = useDispatch()
    const currentYear = new Date().getFullYear()
    let arrYear = []
    for (var i = 2007; i <= Number(currentYear); i++) {
        arrYear.push(i)
    }
    arrYear = arrYear.reverse()
    const [yearIndex, setYearIndex] = useState(currentYear)

    const [postsPerPage] = useState(10);
    const [offset, setOffset] = useState(1);
    const [posts, setAllPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0)

    //search text
    const handleUserInput = (e) => {
        if (e.target.value === '') {
            //display task
            document.querySelector(".wp_task_research").classList.remove("d-none")

            const requestUrl = `http://27.71.228.19:5004/api/publications/getByDate?page=${offset}&size=${postsPerPage}&type=publication&year=${yearIndex}&unit=Home`
            axios.get(requestUrl).then((res) => {
                const total = res.headers["content-range"]
                const data = res.data;
                // For displaying Data
                const postData = getPostData(data, total)

                // Using Hooks to set value
                setAllPosts(postData)
                setPageCount(Math.ceil(total / postsPerPage))
                setOffset(1)
            })
        }
    };
    const onHandleSearch = () => {
        const textSearch = document.getElementById("searchInput").value
        if (textSearch !== "") {
            const reqSearchUrl = `http://27.71.228.19:5004/api/publications/searchClient?searchText=${textSearch}&unit=Home&page=${offset}&size=${postsPerPage}`
            axios.get(reqSearchUrl).then((res) => {
                const totalSearchNum = res.headers["content-range"]
                const dataSearch = res.data;
                // For displaying Data
                const postDataSearch = getPostData(dataSearch, totalSearchNum)

                // Using Hooks to set value
                setAllPosts(postDataSearch)
                setPageCount(Math.ceil(totalSearchNum / postsPerPage))
            }).catch((error) => {
                const postDataSearch = getPostData([], 0)

                // Using Hooks to set value
                setAllPosts(postDataSearch)
                setPageCount(0)
            })
            //hide task
            document.querySelector(".wp_task_research").classList.add("d-none")
        }
    }
    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {

            onHandleSearch()
        }
    }
    //end search
    const getPostData = (data, total) => {
        return (
            <div>
                <Row className="row_title_custom">
                    <Col md="8" className="pl-0">
                        <span className="research_title_custom">ISI, Scopus Collection</span>
                    </Col>
                    <Col md="4" style={{ margin: 'auto', padding: '0' }}>
                        <div className="wp-search">
                            <input type="search" id="searchInput" placeholder="Type search here" name="search" pattern=".*\S.*" onChange={handleUserInput} required onKeyPress={handleKeyPress} />
                            <input title="Search" value="" type="submit" className="btn_search" onClick={onHandleSearch} />
                        </div>
                    </Col>
                </Row>
                <div className="wp_task_research">
                    <div className="d-flex">
                        <div className="d-flex">
                            <p style={{ margin: 'auto auto', paddingLeft: '3rem', paddingRight: '1rem' }}>Year</p>
                            <Input type="select" name="select" id="exampleSelect" onChange={handleOnChange}>
                                {
                                    arrYear.map((item, index) => {
                                        return (
                                            <option value={item} key={index}>{item}</option>
                                        )
                                    })
                                }
                                <option value="0">All</option>
                            </Input>
                        </div>
                        <p className="total">Total: <b>{total}</b></p>
                    </div>
                    <div className="btn_download">
                        <Button id="btnDownloadPublish" style={{ backgroundColor: '#e81d1d', 'color': '#ffffff' }} onClick={handleOnDownload}>Download PDF</Button>
                    </div>
                </div>
                {/* <Row className="wp_task_research">
                    <Col md="3" sm="6" className='year'>

                    </Col>
                    <Col md="3" sm="6" className="total">
                        
                    </Col>
                    <Col md="6" sm="12" className="text-right download" >
                       
                    </Col>
                </Row> */}
                <ul className="list_research list-unstyled">
                    {
                        data.map((item, index) => {
                            let pubDate = item.publish_date === 0 ? "" : `${item.publish_date}.`
                            let pubMonth = item.publish_month === 0 ? "" : `${item.publish_month}.`
                            return (
                                <li key={index} className="right-box-research-other">
                                    <span style={{ fontSize: '1rem' }}>{(offset - 1) * postsPerPage + index + 1}.</span>  {ReactHtmlParser(item.authors)},"{ReactHtmlParser(item.title)}", {item.resource && item.resource.includes("<p>") ? ReactHtmlParser(item.resource) : <p>{item.resource}</p>}, <p>{pubDate}{pubMonth}{item.publish_year}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )

    }

    const getAllPosts = () => {
        const requestUrl = `http://27.71.228.19:5004/api/publications/getByDate?page=${offset}&size=${postsPerPage}&type=publication&year=${yearIndex}&unit=Home`
        axios.get(requestUrl).then((res) => {
            const total = res.headers["content-range"]
            const data = res.data;

            // For displaying Data
            const postData = getPostData(data, total)
            // Using Hooks to set value
            setAllPosts(postData)
            setPageCount(Math.ceil(total / postsPerPage))
        })
        const textSearch = document.getElementById("searchInput")
        console.log(textSearch)
        if (textSearch) {
            if(textSearch.value!==""){
                const reqSearchUrl = `http://27.71.228.19:5004/api/publications/searchClient?searchText=${textSearch.value}&unit=Home&page=${offset}&size=${postsPerPage}`
                axios.get(reqSearchUrl).then((res) => {
                    const totalSearchNum = res.headers["content-range"]
                    const dataSearch = res.data;
                    // For displaying Data
                    const postDataSearch = getPostData(dataSearch, totalSearchNum)
                    // Using Hooks to set value
                    setAllPosts(postDataSearch)
                    setPageCount(Math.ceil(totalSearchNum / postsPerPage))
                }).catch((error) => {
                    const postDataSearch = getPostData([], 0)
                    // Using Hooks to set value
                    setAllPosts(postDataSearch)
                    setPageCount(0)
                })
                //hide task
                // document.querySelector(".wp_task_research").classList.add("d-none")
            }
            
        }
    }
    const handleOnChange = e => {
        setYearIndex(e.target.value)
        setOffset(1)
    }
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    };
    useEffect(() => {
        axios.get('http://27.71.228.19:5004/api/menuItem/1').then((res) => {
            const menuResearch = res.data.find(item => item.title == 'Research')
            dispatch(updateMenuResearch(menuResearch))
        })
        const menuArr = [
            {
                title: "Research",
                path: `#`
            },
            {
                title: 'ISI, Scopus Collection',
                path: ""
            }
        ]
        dispatch(updateBreadCrumbNews(menuArr))
        dispatch(updateSelecteDetail({ id: 1234 }))
    }, [])
    useEffect(() => {
        getAllPosts()
    }, [offset, yearIndex])

    // PDF file
    const handleOnDownload = () => {
        const requestUrl = yearIndex === '0' ? `http://27.71.228.19:5004/api/publications/all?type=publication&unit=Home` : `http://27.71.228.19:5004/api/publications/all?publish_year=${yearIndex}&type=publication&unit=Home`
        axios.get(requestUrl).then((res) => {
            const data = res.data;
            printDocument(handleConvertDataToHtml(data))
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleConvertDataToHtml = listData => {
        let htmlContext = ""
        if (yearIndex === '0') {//list all
            listData.map((perYear, ind) => {
                if (ind === 0) {
                    htmlContext += `<h3>${perYear.publish_year}</h3>`
                }
                else {
                    htmlContext += `<h3 class="pdf-pagebreak-before">${perYear.publish_year}</h3>`
                }
                perYear.data.map((item, index) => {
                    let pubDate = item.publish_date === 0 ? "" : `${item.publish_date}.`
                    let pubMonth = item.publish_month === 0 ? "" : `${item.publish_month}.`
                    htmlContext += `<div key=${index}>
                    ${index + 1}.  ${item.authors},"${item.title}", ${item.resource && item.resource.trim()}, <p>${pubDate}${pubMonth}${item.publish_year}</p>
                </div>`
                })
            })
        }
        else {
            listData.data.map((item, index) => {
                let pubDate = item.publish_date === 0 ? "" : `${item.publish_date}.`
                let pubMonth = item.publish_month === 0 ? "" : `${item.publish_month}.`
                htmlContext += `<div key=${index}>
                ${index + 1}.  ${item.authors},"${item.title}", ${item.resource && item.resource.trim()}, <p>${pubDate}${pubMonth}${item.publish_year}</p>
            </div>`
            })
        }
        //standard context
        htmlContext = htmlContext.replaceAll("<p>", "<span>").replaceAll("</p>", "</span>")
        return htmlContext
    }
    const printDocument = (pdfTable) => {
        //const input = document.getElementById('divToPrint');
        // const doc = new jsPDF();
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
                    { text: `LQDTU's ISI, Scopus Collection`, alignment: 'left', margin: [10, 10, 10, 10] },
                    { text: yearIndex === '0' ? "" : yearIndex, alignment: 'right', margin: [10, 10, 10, 10] }
                ]
            },
            defaultStyle: {
                alignment: 'justify'
            },
            pageBreakBefore: function (currentNode) {
                return currentNode.style && currentNode.style.indexOf('pdf-pagebreak-before') > -1;
            }
        };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open()
    }
    return (
        <div className="main-app">
            {/* Display all the posts */}
            {posts}
            {/* Using React Paginate */}
            <ReactPaginate
                previousLabel={"Previous"}
                previousClassName={offset === 1 ? "d-none" : ""}
                nextLabel={"Next"}
                nextClassName={offset === pageCount ? "d-none" : ""}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination ml-5"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                forcePage={offset - 1} />
        </div>
    );
}
