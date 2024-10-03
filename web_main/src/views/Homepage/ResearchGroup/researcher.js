import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class researcher extends Component  {
    render()
    {
        if(this.props.page_path!==''){
            return (
                <a href={this.props.page_path} target='_blank'>
                    <div className="s-12 m-6 l-five" >
                        <div className="image-with-hover-overlay image-hover-zoom" title="Portfolio Image">
                            <img src={`http://27.71.228.19:5004/${this.props.image}`} className="full-img"/>
                        </div>
                        <div className="p-4 tm-bg-white tm-catalog-item-description" style={{position:'relative'}}>
                            <h3 className="tm-text-primary mb-3 tm-catalog-item-title"></h3>
                            
                            <p className="tm-catalog-item-text"> <span className="tm-text-secondary"></span> 
                                {this.props.name}</p>
                                
                            <div className="arrow-up"></div>    
                        </div>	
                    </div>
                </a>
            )
        }
        else{
            return (
                <Link to={`/researchgroup/${this.props.id}`}>
                    <div className="s-12 m-6 l-five" >
                        <div className="image-with-hover-overlay image-hover-zoom"  title="Portfolio Image">
                            <img src={`http://27.71.228.19:5004/${this.props.image}`} className="full-img"/>
                        </div>
                        <div className="p-4 tm-bg-white tm-catalog-item-description" style={{position:'relative'}}>
                            <h3 className="tm-text-primary mb-3 tm-catalog-item-title"></h3>
                            
                            <p className="tm-catalog-item-text"> <span className="tm-text-secondary"></span> 
                                {this.props.name}</p>
                                
                            <div className="arrow-up"></div>    
                        </div>	
                    </div>
                </Link>
            )
        }
        
    }
}
export default researcher;