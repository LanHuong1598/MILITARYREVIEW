import React from 'react';
import Slider from "react-slick";
import ContentNewsItem from './ContentNewsItem';
import '../../../assets/css/news.css';
// import '../../assets/plugin/slick/slick.min.css';
// import '../../assets/plugin/slick/slick-theme.min.css';

export default function ContentNews({infoLatest}) {
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 4000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 12000,
        initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="news-feed__body">
            <div className="news-feed__items">
                <Slider {...settings}>
                    {
                        infoLatest && infoLatest.map((item, key) => {
                            return (
                                <ContentNewsItem infoItem={item} key={key}></ContentNewsItem>
                            );
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}
