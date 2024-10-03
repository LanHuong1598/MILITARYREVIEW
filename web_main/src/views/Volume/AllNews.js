import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
// ** redux
import { updateBreadCrumbNews, updateCategory } from 'redux/actions/menu';
import { store } from 'redux/storeConfig/store'
import { useDispatch, useSelector } from 'react-redux'

import ReactHtmlParser from 'react-html-parser'
import { toDateTimeStringEnglish, capitalize } from 'utils/utils'
import Loader from "react-loader-spinner";
import './css/book.css'
function Volume() {
    const { id, cate, search } = useParams()
    const dispatch = useDispatch()
    const [postsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [posts, setAllPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const getPostData = (data, flag) => {
        return (
            !flag ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                <div className="book-all">
                    {
                        data.map((item) => {
                            return (
                                <div className="book-block">
                                    <div className="left-img">
                                        <Link to={`/volume/detail/${item.volume_id}`}  >
                                            <img src={`http://27.71.228.19:5004/${item.book_image}`} alt="info image"></img>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/volume/detail/${item.volume_id}`}>
                                            <div className="book-title">
                                                {item.title}
                                            </div>
                                        </Link>

                                        <div className="book-summary">
                                            Author: {item.author}
                                        </div>
                                        <div className="book-date">
                                            Page: {item.page_number}
                                        </div>
                                        <div className="book-summary">
                                            Type: {item.type}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
        )
    }

    const getAllPosts = async () => {
        let requestUrl = `http://27.71.228.19:5004/api/book/volume/${id}?size=1000&PAGE=1`;

        const res = await axios.get(requestUrl)
        const total = res.headers["content-range"]
        const data = res.data;
        console.log(data)
        let flag = false;
        if (res !== null) {
            flag = true;
        }
        // For displaying Data
        const postData = getPostData(data, flag)
        // Using Hooks to set value
        setAllPosts(postData)
        setPageCount(Math.ceil(total / postsPerPage))
    }

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    };
    useEffect(() => {
        setOffset(1)
        const requestUrl = `http://27.71.228.19:5004/api/news_categories`
        axios.get(requestUrl).then(response => {
            const temp = response.data
            temp.unshift({
                id: 123456789,
                name: "All",
                seq: 1
            });
            dispatch(updateCategory(standardCategoryMenu(temp), standardCategorySelected(temp)))
            let tempPath;
            tempPath = `/books/detail`
            const menuArr = [
                {
                    title: "BOOK",
                    path: tempPath
                },
                {
                    title: capitalize(cate),
                    path: ""
                }
            ]
            dispatch(updateBreadCrumbNews(menuArr))
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })

    }, [window.location.pathname])
    useEffect(() => {
        getAllPosts()
        // window.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // })
    }, [offset, window.location.pathname])
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
        let tempPath2;
        if (search != null) {
            tempPath2 = `/news/${cate}/${search}`
        }
        else {
            tempPath2 = `/news/${cate}`
        }
        const categoryAll = {
            title: 'News',
            type: "INCLUDE",
            path: tempPath2,
            children: categoryArr
        }
        return categoryAll
    }
    const standardCategorySelected = (dataTemp) => {
        const [cateDetail] = dataTemp.filter(item => item.name.toLowerCase() === cate)
        return cateDetail
    }
    return (
        <div className="main-app">
            {/* Display all the posts */}
            {posts}

            {/* Using React Paginate */}
        </div>
    );
}

export default Volume;