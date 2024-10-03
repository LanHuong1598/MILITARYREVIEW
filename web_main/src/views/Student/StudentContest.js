import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { updateMenuSelected } from 'redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux';
import { toDateTimeStringEnglish, capitalize } from 'utils/utils';
import Loader from "react-loader-spinner";
export default function StudentContest() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [listContest, setListContest] = useState([])
    const [loaded, setLoaded] = useState()
    const [posts, setAllPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    
    const dataMenu1 =
        {
            "count": 4,
            "rows": [
                {
                    "id": 1,
                    "name": "Robocon",
                    "seq": 0,
                    "type": "robocon"
                },
                {
                    "id": 2,
                    "name": "Olympiad",
                    "seq": 1, 
                    "type": "olympiad"
                },
                {
                    "id": 3,
                    "name": "Information Security",
                    "seq": 2,
                    "type": "information-security"
                },
                {
                    "id": 4,
                    "name": "Others",
                    "seq": 3,
                    "type": "others"
                },
                
            ]
        }
    
    const standardAlbum = (dataMenu) => {
        let menu = {
          id: 1,
          title: 'Student Contest',
          type: "INCLUDE",
          path: '/student',
          children: [
          ]
        }
        if (dataMenu1.count > 0) {
          dataMenu1.rows.map((item, index) => {
            let menuItem = {
              id: item.id,
              type: 'CUSTOM_MEDIA',
              title: item.name,
              path: `/careerAndContest/contest/${item.type}`
            }
            menu.children.push(menuItem)
          }
          )
        }
        return menu
      }
      const getPostData = (data, flag) => {
        return (
            !flag ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
                <div className="news-all">
                    {
                        data.map((item) => {
                            return (

                                <div className="news-block">
                                    <div className="left-img">
                                        <Link to={`/categorydetail/detail/${item.id}/contest`}  >
                                            <img src={`http://27.71.228.19:5004/${item.avatar}`} alt="info image"></img>
                                            
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/categorydetail/detail/${item.id}/contest`}>
                                            <div className="news-title">
                                                {item.title}
                                            </div>
                                        </Link>
                                        <div className="news-date">
                                            {toDateTimeStringEnglish(item.date)}
                                        </div>
                                        <div className="news-summary">
                                            {item.short_description}
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
        )
    }
    
      
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        
            const album = standardAlbum(dataMenu1)
            let temp = {
                id: "",
                type: 'CUSTOM_MEDIA',
                title: "",
                path: '#'
            }
            let typeContest = '' + id;
            dataMenu1.rows.map((item, index) => {
                if(item.type == typeContest)
                {
                    temp = {
                        id: item.id,
                        type: 'CUSTOM_MEDIA',
                        title: item.name,
                        path: `/careerAndContest/contest/${item.type}`
                    }
                }

            })
            
            dispatch(updateMenuSelected(album, temp,[]))
            const res =  axios.get(`http://27.71.228.19:5004/api/careerAndContest/contest/${id}?unit=home`).then(res => {
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
                //setPageCount(Math.ceil(total / postsPerPage))
                setLoaded(true)
            }).catch(error => {
                console.error("Lỗi gọi API!", error)
            })
        

    }, [id])
    if (id === undefined) {
        return <div>None of contest</div>
    }
    return (
        !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
            <div>
                <div className="main-app">
                {/* Display all the posts */}
                {posts}
                </div>
            </div>
    )
}
