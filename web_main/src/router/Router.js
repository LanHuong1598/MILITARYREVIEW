import React, { Fragment } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from 'react-redux'
// pages
import Index from "views/Index.js";
// others
import Login from "../components/Login/Login"
import CustomPage from "../views/CustomPage";
import DetailOneNew from "../views/News/DetailOneNew"
import AllNews from "../views/News/AllNews";
import Category from "../views/Student/StudentExchange";
import DetailCategory from "../views/Student/DetailCategory";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter.js";
import ListDetailResearch from "../views/Elements/ListReasearch/ListDetailResearch"
import ListDetailPatent from "../views/Elements/ListReasearch/ListDetailPatent"
import ResearchGroup from "../views/Elements/ResearchGroup";
import Partner from "../views/Elements/Partner"

import Sidebar from '../components/Navbars/Sidebar'
import Breadcrumbs from '../components/BreadCrumbs/Breadcrumbs'
import { Container, Row, Col } from 'reactstrap'
import CloseSubmenu from '../utils/CloseSubmenu'
import BackTop from '../utils/BackTop'
import IndexHeader from '../components/Headers/IndexHeader'
import ImageBackground from '../components/Headers/ImageBackground'
import Media from "../views/Media";
import Student from "../views/Student";
import StudentExchange from "../views/Student/StudentExchange";
import ListImage from "../views/Media/ListImage";
import StudentClub from "../views/Student/StudentClub"
import StudentClubOverview from "../views/Student/StudentClubOverview"
import StudentContest from "../views/Student/StudentContest"
import ListImageStudent from "../views/Student/ListImageStudent";
import LecturerDetail from "views/Lecturers/LecturerDetail";
import StudentLife from "views/Student/StudentLife";
import { CareerOpportunities } from "views/Student/CareerOpportunities";
import Volume from "views/Volume/AllNews";
//KVTT
import Homepage from "views/KVTT/Homepage";
import DetailOneBook from "views/Volume/DetailOneBook";

export default function Router() {
  const storeInfo = useSelector(state => state.menu)
  return (
    <BrowserRouter>
      <>
        <IndexNavbar />
        <CloseSubmenu />
        <Switch>
          {/* <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route path="/" exact render={(props) => localStorage.getItem('login') ? <Index {...props} /> : <Redirect to={{ pathname: '/login' }} />} /> */}
          <Route
            path="/"
            exact render={(props) => <Index {...props} />}
          />
          <Route
            path="/kvtt/:id"
            render={(props) => <Homepage {...props} />}
          />
          <Route
            path="/researchgroup/:id"
            render={(props) => <ResearchGroup {...props} />}
          />
          <Route
            path="/media"
            render={(props) => <Media {...props} />}
          />
          <Route
            path="/lecturer"
            render={(props) => <LecturerDetail {...props} />}
          />

          <Route
            path="/student"
            render={(props) => <Student {...props} />}
          />
          <Route
            path="/life"
            render={(props) => <StudentLife {...props} />}
          />
          <Route
            path="/exchange"
            render={(props) => <StudentExchange {...props} />}
          />
          <Route
            path="/career"
            render={(props) => <CareerOpportunities {...props} />}
          />
          <Route
            path="/club"
            render={(props) => <StudentClub {...props} />}
          />
          <Route
            path="/clubs/overview"
            render={(props) => <StudentClubOverview {...props} />}
          />
          <Route
            path="/categorydetail/detail/:id/:type"
            render={(props) => <DetailCategory {...props} />}
          />
          <Fragment>
            <ImageBackground height={500} imgSrc={storeInfo.image} />
            <div style={{ backgroundColor: '#fff', minHeight: '600px' }}>
              <Container>
                <Row className="wp-rowCustompage">
                  <Col md={9} sm={12} className="wp-custompage">
                    <Breadcrumbs></Breadcrumbs>
                    <div className="d-sidebar-none">
                      <Sidebar></Sidebar>
                    </div>
                    <Route
                      path="/page/:text"
                      render={(props) => <CustomPage {...props} />}
                    />
                    <Route
                      path="/listnews/detail/:id"
                      render={(props) => <DetailOneNew {...props} />}
                    />
                    <Route
                      path="/news/:cate/:search?"
                      render={(props) => <AllNews {...props} />}
                    />
                    <Route
                      path="/books/detail/:id"
                      render={(props) => <Volume {...props} />}
                    />
                    <Route
                      path="/volume/detail/:id"
                      render={(props) => <DetailOneBook {...props} />}
                    />
                    {/* <Route
                      path="/news/:cate"
                      render={(props) => <AllNews {...props} />}
                    /> */}
                    <Route
                      path="/research/list"
                      render={(props) => <ListDetailResearch {...props} />}
                    />
                    <Route
                      path="/patent/list"
                      render={(props) => <ListDetailPatent {...props} />}
                    />
                    <Route
                      path="/partner/list"
                      render={(props) => <Partner {...props} />}
                    />
                    <Route
                      path="/list/image/:id?"
                      render={(props) => <ListImage {...props} />}
                    />
                    <Route
                      path="/careerAndContest/contest/:id?"
                      render={(props) => <StudentContest {...props} />}
                    />
                    <Route
                      path="/list/imageStudent/:id?"
                      render={(props) => <ListImageStudent {...props} />}
                    />
                  </Col>
                  <Col md={3} sm={12} className="">
                    <Sidebar></Sidebar>
                  </Col>
                </Row>
              </Container>
            </div>
          </Fragment>
          {/* <Redirect to="/" /> */}

        </Switch>
        <DemoFooter />
        <BackTop />
      </>
    </BrowserRouter>
  )
}
