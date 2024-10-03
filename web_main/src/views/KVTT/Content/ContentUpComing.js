import React from 'react'
import { Link } from 'react-router-dom'
import ContentUpComingItem from './ContentUpComingItem';
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../assets/css/news.css';
export default function ContentUpComing({ infoRelated }) {
    if (infoRelated === undefined) {
        return <></>
    }
    return (
        <div className="unicamp-event-box unicamp-box">
            <div className="box-header">
                <h4 className="box-title">Highlights</h4>
                <div className="tm-button-wrapper">
                    <Link className="button-content-wrapper" to="/news/all">
                        <span className="button-text">
                            View All
                        </span>
                    </Link>
                </div>
            </div>
            <div className="box-body">
                {
                    infoRelated && infoRelated.map((item, index) => {
                        return (
                            <ContentUpComingItem info={item} key={index} ind={index}></ContentUpComingItem>
                        )
                    })
                }
            </div>
        </div>
    )
}
