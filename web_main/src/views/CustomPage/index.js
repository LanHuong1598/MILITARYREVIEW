import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import HtmlParser from 'react-html-parser';
import Loader from "react-loader-spinner";
// redux
import { updateMenuSelected } from 'redux/actions/menu';
import { useDispatch } from 'react-redux'
import '../News/css/style.css'
export default function CustomPage() {
    const dispatch = useDispatch()
    const [menuItem, setMenuItem] = useState()
    const [loaded, setLoaded] = useState()
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        const pathSplit = window.location.pathname.split('/')
        const unitName = pathSplit[pathSplit.length - 2]
        const pathName = pathSplit[pathSplit.length - 1]
        
        axios.get(`http://27.71.228.19:5004/api/menuItem/${unitName}/${pathName}`).then(response => {
            const temp = response.data
            setMenuItem(temp)
            axios.get(`http://27.71.228.19:5004/api/menuItem/getMenu/${temp.id}`).then(response => {
                const secondtemp = response.data
                axios.get(`http://27.71.228.19:5004/api/banner?type=Menu&unit=home&menu=${secondtemp.title}`).then(response => {
                    
                    dispatch(updateMenuSelected(secondtemp, temp, response.data))
                    setLoaded(true)
                }).catch(error => {
                    console.error("Lỗi gọi API!", error)
                })
                
            }).catch(error => {
                console.error("Lỗi gọi API!", error)
            })
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }, [window.location.pathname])

    return (
        !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
            <>
                <h3 className="customPage_title">{menuItem.title}</h3>
                <div className="customPage_content">
                    {menuItem && HtmlParser(menuItem.content)}
                </div>
            </>
    )
}
