import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router';
import { updateMenuSelected } from 'redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux'
import Loader from "react-loader-spinner";
// ** import gallery
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
export default function ListImageStudent() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [listImage, setListImage] = useState([])
    const [loaded, setLoaded] = useState()
    const standardImage = (listImageArr) => {
        let imgArr = []
        listImageArr.map((item, index) => {
            const tempImg = {
                original: `http://27.71.228.19:5004/${item.image}`,
                thumbnail: `http://27.71.228.19:5004/${item.image}`
            }
            imgArr.push(tempImg)
        })
        return imgArr
    }
    const standardAlbum = (dataMenu) => {
        let menu = {
            id: 1,
            title: 'Student',
            type: "INCLUDE",
            path: '/student',
            children: [
            ]
        }
        dataMenu.map((item, index) => {
            let menuItem = {
                id: item.id,
                type: 'CUSTOM_MEDIA',
                title: item.name,
                path: `/list/imageStudent/${item.id}`
            }
            menu.children.push(menuItem)
        }
        )
        return menu
    }
    useEffect(() => {
        axios.get(`http://27.71.228.19:5004/api/studentAlbum?unit=home`).then(res => {
            const albumMenu = standardAlbum(res.data)
            dispatch(updateMenuSelected(albumMenu, {},[]))
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }, [])
    useEffect(() => {
        // set loading to wait get data
        setLoaded(false)
        axios.get(`http://27.71.228.19:5004/api/studentImage/${id}/album?page=1&size=25`).then(res => {
            setListImage(standardImage(res.data))
            setLoaded(true)
        }).catch(error => {
            console.error("Lỗi gọi API!", error)
        })
    }, [id])
    if (id === undefined) {
        return <div>None of image</div>
    }
    return (
        !loaded ? <Loader type="ThreeDots" color="#e81d1d" height="100" width="100" /> :
            <div>
                <ImageGallery
                    items={listImage}
                    lazyLoad={true}
                />
            </div>
    )
}
