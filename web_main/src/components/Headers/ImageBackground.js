import React, { useRef, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from 'react-responsive'
// reactstrap components
import {
    Card,
    Carousel,
    CarouselItem,
    CarouselIndicators,
} from "reactstrap";

function ImageBackground(props) {
    const height = props.height
    const items = props.imgSrc
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);
    const onExiting = () => {
        setAnimating(true);
    };
    const onExited = () => {
        setAnimating(false);
    };
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };
    return (
        <>
            <div id="carousel">
                <div className="w-100">
                    <Card className="page-carousel mb-0" style={{ borderRadius: '0 !important' }}>
                        <Carousel
                            activeIndex={activeIndex}
                            draggable={true}
                            next={next}
                            previous={previous}
                            interval={10000}
                        >
                            <CarouselIndicators
                                items={items}
                                activeIndex={activeIndex}
                                onClickHandler={goToIndex}
                            />
                            {items.map((item) => {
                                return (
                                    <CarouselItem
                                        onExiting={onExiting}
                                        onExited={onExited}
                                        key={item.url}
                                    >
                                        {
                                            isMobile ? <img  src={`http://27.71.228.19:5004/${item.url}`} alt={item.altText} style={{ maxHeight: `${height}px`, width: '100%' }} /> : <img src={`http://27.71.228.19:5004/${item.url}`} alt={item.altText} style={{ height: `${height}px`, width: '100%'}} />
                                        }
                                    </CarouselItem>
                                );
                            })}
                            <a
                                className="left carousel-control carousel-control-prev"
                                data-slide="prev"
                                href="#pablo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    previous();
                                }}
                                role="button"
                            >
                                <span className="fa fa-angle-left" />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="right carousel-control carousel-control-next"
                                data-slide="next"
                                href="#pablo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    next();
                                }}
                                role="button"
                            >
                                <span className="fa fa-angle-right" />
                                <span className="sr-only">Next</span>
                            </a>
                        </Carousel>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default ImageBackground;
