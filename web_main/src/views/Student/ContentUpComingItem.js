import React from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/news.css';
export default function ContentUpComingItem({ info, ind }) {
    return (
        <div className={`post-item ${ind === 3 ? "" : "line-post-item"}`} style={{padding: '0px 0px'}}>
            <div className="event-caption">
                <div className="right-box">
                    <h3 className="post-title-relate post-title-relate-2-rows title-has-link" >
                        <a href={`${info.link}`} target="_blank" style={{fontWeight: '300'}}>{info.title}</a>
                    </h3>
                </div>
            </div>
        </div>
    )
}
