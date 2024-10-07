import React from 'react';
import { Link } from "react-router-dom"
import '../../assets/css/news.css';
import { toDateTimeStringEnglish } from '../../utils/utils'
export default function ContentNewsItem({ infoItem }) {
    return (
        <div>
            <div className="post-wrapper unicamp-box">
                <div className="post-feature post-thumbnail unicamp-image">
                    <Link to={`/listnews/detail/${infoItem.title}`}>
                        <img src={`http://27.71.228.19:5004/${infoItem.image_URL}`} alt={infoItem.title}>
                        </img>
                        <div className="tm-button-wrapper post-read-more">
                            <div className="tm-button style-flat tm-button-xs tm-button-full-wide icon-right">
                                <div className="button-content-wrapper mt-2 ml-0">
                                    <span className="">
                                        Xem thêm <i className="nc-icon nc-minimal-right" />
                                    </span>
                                    <span className="button-icon">

                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="post-caption">
                    <div className="post-categories">
                        <Link to={`/news/${infoItem.category.name.toLowerCase()}`}>
                            {infoItem.category.name}
                        </Link>
                    </div>
                    <h3 className="post-title post-title-2-rows">
                        <Link to={`/listnews/detail/${infoItem.title}`} className="news_title_slide">
                            {infoItem.title}
                        </Link>
                    </h3>
                    <div className="post-meta">
                        <div className="inne">
                            <div className="post-meta-author">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <span className="meta-value">
                                        {infoItem.author}
                                    </span>
                                </a>
                            </div>
                            <div className="post-date">
                                <p className="meta-value">
                                    {toDateTimeStringEnglish(infoItem.date_created)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
