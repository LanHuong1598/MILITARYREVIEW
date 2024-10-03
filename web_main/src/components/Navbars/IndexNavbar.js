import React, {useEffect, useState} from "react";
// nodejs library that concatenates strings
// reactstrap components
import { useSelector } from 'react-redux'

import ExamplesNavbar from "./ExamplesNavbar";
import FirstHeader from "./FirstHeader";
import IndexHeader from "../Headers/IndexHeader";
function IndexNavbar() {
  const storeInfo = useSelector(state => state.login)
  return (
    // storeInfo.login ?
    <div
      color-on-scroll="300"
      expand="lg"
      id="navMenu"
    >  
      <FirstHeader></FirstHeader>
      <ExamplesNavbar></ExamplesNavbar>
      {/* <IndexHeader></IndexHeader> */}
    </div>
    // : <div></div>
  );
}
export default IndexNavbar;
