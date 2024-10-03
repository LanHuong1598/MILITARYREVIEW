import React from "react";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { Container, Col, Row } from "reactstrap";
// index sections
import News from "./Content/News";
// import Cooperation from "./Cooperation";
// import Research from "./Research";
import PrintResources from "./PrintResources";
import Video from "./Homepage/Video";

// css 
import "../assets/css/custom.css"
function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  
  return (
    <>
      {/* <IndexHeader height={830} ></IndexHeader> */}
      <News></News>
      <PrintResources></PrintResources>
      <Video></Video>

      {/* <Research></Research> */}
       {/* <Cooperation></Cooperation>
      <Journal style={{marginBottom:'3rem'}}></Journal>
      <ResearchGroup></ResearchGroup> */}
      
    </>
  );
}

export default Index;
