import React from 'react'
import '../../assets/css/news.css';
import { LazyLoadImage } from 'react-lazy-load-image-component'
export default function ListBook() {
    
    return (
        
                
        <div key={index} className="px-2">
            <LazyLoadImage src={item.src} alt={item.altText} className="img-fluid" style={{minHeight:'22rem'}}></LazyLoadImage>
            
        </div>
                    
            
    )
}
