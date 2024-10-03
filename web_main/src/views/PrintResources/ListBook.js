
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import Loader from "react-loader-spinner";
import '../../assets/css/news.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
export default function ListBook() {
    const [books, setBooks] = useState([]);
    const [loaded, setLoaded] = useState()
    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 6000,
        initialSlide: 0,
        arrows: true,
        rows: 3,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const requestUrl = `http://27.71.228.19:5004/api/volume`
        axios.get(requestUrl).then(response => {
            const temp = response.data
            setBooks(temp)
            setLoaded(true)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        });

    }, [])
    return (
        <Slider {...settings}>
            {
                !loaded ? <Loader type="ThreeDots" color="#285A21" height="100" width="100" /> :
                    books && books.map((item, index) => {
                        return (
                            <div key={index} className="px-2 wp-shadowBook">
                                <Link to={`/books/detail/${item.id}`}>
                                    <img src={`http://27.71.228.19:5004/${item.image}`} alt={item.title} className="img-book" ></img>
                                    <div className={`shadowBook shadowBook-color-${index % 4}`}>


                                    </div>
                                </Link>
                                {/* <h3 className="book-title book-title-2-rows">
                                <Link to={`#`} className="book_title_resource">{item.title}</Link>
                            </h3>
                            <Link className='author' to={`#`}>{item.author}</Link> */}
                            </div>
                        );
                    })
            }
        </Slider>
    )
}
