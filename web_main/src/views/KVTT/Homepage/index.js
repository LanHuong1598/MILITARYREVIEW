import React, {useEffect} from 'react'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { Container } from "reactstrap";
// index sections
import News from "../Content/News";

import Cooperation from "./Cooperation";
import Research from "./Research";
import Academics from "./Academics";
import Department from "./Department";
import Video from "./Video";
import { getMenu } from 'redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux'
// css 
import "../../../assets/css/custom.css";
import { useParams } from 'react-router';
export default function Homepage() {
  const dispatch = useDispatch();
  const {id} = useParams();
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    dispatch(
      getMenu(5) //kvtt
    )
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexHeader height={840}></IndexHeader>
      <News unit={id}></News>
      <Academics unit={id}></Academics>
      <Research unit={id}></Research>
      <Department unit={id}></Department>
      <Cooperation unit={id}></Cooperation>
     <Video unit={id}></Video>
    </>
  )
}
