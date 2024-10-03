import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { useDispatch} from 'react-redux'
import { updateBreadCrumbNews, updateMenuPatent, updateSelecteDetail } from 'redux/actions/menu';
// ** Loader
import Loader from "react-loader-spinner";
import './style.css';
export default function Partner() {
    const dispatch = useDispatch()
    const [offset, setOffset] = useState(1);
    const [partners, setPartners] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const requestUrl = `http://27.71.228.19:5004/api/partners?page=${offset}&size=20&unit=Home`
        axios.get(requestUrl).then(response => {
           console.log(response)
            // response.data
            setPartners(response.data);
            setPageCount(Math.ceil(response.headers["content-range"] / 20))   
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
        axios.get('http://27.71.228.19:5004/api/menuItem/1').then((res) => {
            const menuCooperation = res.data.find(item=>item.title=='Cooperation')
            dispatch(updateMenuPatent(menuCooperation))
        })
        const menuArr = [
            {
                title: "HOME",
                path: `/`
            },
            {
                title: "COOPERATION",
                path: `#`
            },
            {
                title: 'Partners',
                path: ""
            }
        ]
        dispatch(updateBreadCrumbNews(menuArr))
        dispatch(updateSelecteDetail({id:1357}))
    }, [offset])

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    };

    return (
        <div className="partnerPage">
            <h3 className="customPage_title">Partners</h3>
            <div className="partner-content">
                {
                    partners && partners.length > 0 &&
                    partners.map((partner, index) => (
                        <div className="partner-item">
                            <div className="partner-item-img"><img alt="img" src={`http://27.71.228.19:5004/${partner.image}`}></img></div>
                            <div className="grow"></div>
                            <a href={partner.link}>{partner.title}</a>
                        </div>
                    ))
                }
            </div>
            <ReactPaginate
                previousLabel={"Previous"}
                previousClassName={offset === 1 ? "d-none" : ""}
                nextLabel={"Next"}
                nextClassName={offset === pageCount || pageCount === 0 ? "d-none" : ""}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                forcePage={offset -1}
            />
        </div>
    )
}
