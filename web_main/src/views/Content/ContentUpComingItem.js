import React from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/news.css';
export default function ContentUpComingItem({ info, ind }) {
    return (
        <div className={`post-item ${ind === 3 ? "" : "line-post-item"}`}>
            <div className="event-caption">
                <div className="left-box">
                    <div className="post-categories">
                            <span className="cat-shape">
                            </span>
                    </div>
                </div>
                <div className="right-box">
                    <h3 className="post-title-relate post-title-relate-2-rows title-has-link">
                        <Link to={`/listnews/detail/${info.title}`}>{info.title}</Link>
                    </h3>
                    <div className="event-meta">
                        <div className="event-time">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
