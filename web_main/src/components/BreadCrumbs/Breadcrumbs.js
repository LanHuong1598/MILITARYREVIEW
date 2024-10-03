import React from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// ** Redux
import { useSelector } from 'react-redux'
// ** Asset css
import 'assets/css/custom.css'
export default function Breadcrumbs() {
    const storeInfo = useSelector(state => state.menu)
    const breadCrumbLength = storeInfo.breadCrumb.length - 1
    return (
        breadCrumbLength <= 0 ? <></> :
        <div>
            <Breadcrumb tag="nav" listTag="div">
                {
                    storeInfo.breadCrumb !== undefined &&
                    storeInfo.breadCrumb.map((item, index) => {
                        if (index === breadCrumbLength) {
                            return (
                                <BreadcrumbItem active tag="span" key={index}>{item.title}</BreadcrumbItem>
                            )
                        }
                        else {
                            return (
                                <BreadcrumbItem tag={Link} to={item.path === "" ? "#" : item.path} key={index}>{item.title}</BreadcrumbItem>
                            )
                        }
                    })
                }
            </Breadcrumb>
        </div>
    )
}
