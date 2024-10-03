import React, { useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux'
import 'assets/scss/custom-sidebar.scss';
export default function Sidebar() {
    const storeInfo = useSelector(state => state.menu)
    
    const titleRef = useRef(null)
    useEffect(() => {
        //scroll to element
        titleRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [window.location.pathname])
    return (
        storeInfo.menuSelected !== undefined && storeInfo.menuSelected !== null &&
        <div className="wp-sidebar" ref={titleRef}>
            <ProSidebar>
                <p className="tittle_sidebar mb-0">{storeInfo.menuSelected.title}</p>
                <Menu iconShape="square">
                    {
                        storeInfo.menuSelected.children !== undefined && storeInfo.menuSelected.children.map((item, index) => {
                            
                            if (item.type === "INCLUDE" && item.children !== undefined) {
                                return (
                                    <SubMenu title={item.title} key={index} open={true}>
                                        {
                                            item.children.map((ele, ind) => {
                                                return (
                                                    <MenuItem key={ind}>
                                                        {ele.type === "REMOTE_URL" && <a href={`${ele.url}`} target="_blank" className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</a>}
                                                        {ele.type === "CUSTOM_URL" && <Link to={`${ele.path}`} className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</Link>}
                                                        {ele.type === "CUSTOM_PAGE" && <Link to={`/page/Home/${ele.path}`} className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</Link>}
                                                        {ele.type === "CUSTOM_NEWS" && <Link to={`${ele.path}`} className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</Link>}
                                                        {ele.type === "NEWS_URL" && <Link to={`${ele.path}`} className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</Link>}
                                                        {ele.type === "CUSTOM_MEDIA" && <Link to={`${ele.path}`} className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</Link>}
                                                        {ele.type === "PUBLICATION_COLLECTIONS" && <Link to={`/research/list`} className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</Link>}
                                                        {ele.type === "PATENTS_COLLECTIONS" && <Link to={`/patent/list`} className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</Link>}
                                                        {ele.type === "PARTNER_COLLECTIONS" && <Link to={`/partner/list`} className={ele.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{ele.title}</Link>}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            }
                            else {
                                return (
                                    <MenuItem key={index}>
                                        {item.type === "REMOTE_URL" && <a href={`${item.url}`} target="_blank" className={item.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{item.title}</a>}
                                        {item.type === "CUSTOM_URL" && <Link to={`${item.path}`} className={item.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{item.title}</Link>}
                                        {item.type === "CUSTOM_PAGE" && <Link to={`/page/Home/${item.path}`} className={item.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{item.title}</Link>}
                                        {item.type === "CUSTOM_NEWS" && <Link to={`${item.path}`} className={item.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{item.title}</Link>}
                                        {item.type === "NEWS_URL" && <Link to={`${item.path}`} className={item.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{item.title}</Link>}
                                        {item.type === "CUSTOM_MEDIA" && <Link to={`${item.path}`} className={item.id === storeInfo.selectedDetail.id ? 'text-subgreen' : ''}>{item.title}</Link>}
                                        {item.type === "PUBLICATION_COLLECTIONS" && <Link to={`/research/list`} className={storeInfo.selectedDetail.id == 1234 ? 'text-subgreen' : ''}>{item.title}</Link>}
                                        {item.type === "PATENTS_COLLECTIONS" && <Link to={`/patent/list`} className={storeInfo.selectedDetail.id == 5678 ? 'text-subgreen' : ''}>{item.title}</Link>}
                                        {item.type === "PARTNER_COLLECTIONS" && <Link to={`/partner/list`} className={storeInfo.selectedDetail.id == 1357 ? 'text-subgreen' : ''}>{item.title}</Link>}
                                    </MenuItem>
                                )
                            }
                        })
                    }
                </Menu>
            </ProSidebar>
        </div>
    )
}
