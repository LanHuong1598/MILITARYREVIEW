import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft } from 'react-feather'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { toDateTimeStringEnglish } from 'utils/utils'
// ** redux
import { updateBreadCrumbNews, updateCategory } from 'redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux'

import Loader from "react-loader-spinner";
import '../../assets/css/news.css';
import './css/newsDetail.css'
import './css/style.css'
export default function DetailOneNew() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [infoNews, setInfoNews] = useState({})
    const [moreNews, setMoreNews] = useState([])
    const [loaded, setLoaded] = useState()
    useEffect(() => {
        axios.get(`http://27.71.228.19:5004/api/news_categories`).then(response => {
            const temp = response.data
            temp.unshift({
                id: 123456789,
                name: "All",
                seq:1,
            })
            
            dispatch(updateCategory(standardCategoryMenu(temp), standardCategorySelected(temp)))
            const menuArr = [
                {
                    title: "News",
                    path: `/news/all`
                },
                {
                    title: "Detail",
                    path: ""
                }
            ]
            dispatch(updateBreadCrumbNews(menuArr))
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
        // set loading to wait get data
        setLoaded(false)
        const requestUrl = `http://27.71.228.19:5004/api/news/${id}`
        axios.get(requestUrl).then(response => {
            const temp = response.data
            setInfoNews(temp)
            const reqUrl = temp.category_id === 3 ? `http://27.71.228.19:5004/api/news/getByCategoryName?page=1&size=3&unit=Home&categoryName=Research` : `http://27.71.228.19:5004/api/news?unit=Home&page=1&size=3`
            axios.get(reqUrl).then(response => {
                const temp = response.data
                setMoreNews(temp)
                setLoaded(true)
            }).catch(error => {
                console.error('There was an error!', error);
            })
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }, [id])
    
    const standardCategoryMenu = (categoryData) => {
        const categoryArr = []
        categoryData.map((item, index) => {
            const cateTemp = {
                id: item.id,
                title: item.name,
                type: "CUSTOM_NEWS",
                path: `/news/${item.name.toLowerCase()}`
            }
            categoryArr.push(cateTemp)
        })
        const categoryAll = {
            title: 'News',
            type: "INCLUDE",
            path: `/news/all`,
            children: categoryArr
        }
        return categoryAll
    }
    const standardCategorySelected = (dataTemp) => {
        return {
            id: 123456789,
            name: "All"
        }
    }
    return (
        !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> : <div>
            <div className="left-box">
                <div className="post-categories">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                        {/* <span className="cat-shape" >
                        </span> */}
                        <span className="cat-name">
                            {infoNews.category ? infoNews.category.name : "Research"}
                        </span>
                    </a>
                </div>
            </div>
            <div className="news_title" >
                <h4>{infoNews.title}</h4>
            </div>
            <div className="d-flex justify-content-start mb-5">
                <span className="mr-3 font-weight-bold">{infoNews.author}</span>
                <span className="mr-3">{toDateTimeStringEnglish(infoNews.date_created)}</span>
            </div>
            <div className="news_body" >
                {ReactHtmlParser(infoNews.content)}
            </div>
            <Link to='/news/all' className="mb-1 d-inline-block"><ArrowLeft />Return news</Link>
            <div className="news_footer">
                <h3>Xem thêm</h3>
                <ul className="ml-3">
                    {
                        moreNews.map((item, index) => {
                            return (
                                <li key={index}><Link to={`/listnews/detail/${item.title}`}>{item.title}</Link></li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
