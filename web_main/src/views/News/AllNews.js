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
import './css/newsAll.css'
function AllNews() {
    const { cate, search } = useParams()
    const dispatch = useDispatch()
    const [postsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [posts, setAllPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const getPostData = (data, flag) => {
        return (
            !flag ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                <div className="news-all">
                    {
                        data.map((item) => {
                            return (
                                <div className="news-block">
                                    <div className="left-img">
                                        <Link to={`/listnews/detail/${item.title}`}  >
                                            <img src={`http://27.71.228.19:5004/${item.image_URL}`} alt="info image"></img>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/listnews/detail/${item.title}`}>
                                            <div className="news-title">
                                                {item.title}
                                            </div>
                                        </Link>
                                        <div className="news-date">
                                            {toDateTimeStringEnglish(item.date_created)}
                                        </div>
                                        <div className="news-summary">
                                            {item.description}
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
        let  requestUrl;
        if(search != null)
        {
            requestUrl = cate === "all" ? `http://27.71.228.19:5004/api/news/search?unit=Home&keySearch=${search}&page=${offset}&size=${postsPerPage}` : `http://27.71.228.19:5004/api/news/getByCategoryName?&page=${offset}&size=${postsPerPage}&unit=Home&categoryName=${capitalize(cate)}`
        }
        else 
        {
            requestUrl = cate === "all" ? `http://27.71.228.19:5004/api/news?unit=Home&page=${offset}&size=${postsPerPage}` : `http://27.71.228.19:5004/api/news/getByCategoryName?&page=${offset}&size=${postsPerPage}&unit=Home&categoryName=${capitalize(cate)}`
        }
        
        const res = await axios.get(requestUrl)
        const total = res.headers["content-range"]
        const data = res.data;
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
            if(search != null)
            {
                tempPath = `/news/${cate}/${search}`
            }
            else
            {
                tempPath = `/news/${cate}`
            }
            const menuArr = [
                {
                    title: "News",
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
    }, [offset, window.location.pathname,search ])
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
            if(search != null)
            {
                tempPath2 = `/news/${cate}/${search}`
            }
            else
            {
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
            <ReactPaginate
                previousLabel={"Previous"}
                previousClassName={offset === 1 ? "d-none" : ""}
                nextLabel={"Next"}
                nextClassName={offset === pageCount || pageCount === 0 ? "d-none" : ""}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                forcePage={offset - 1}
            />
        </div>
    );
}

export default AllNews;