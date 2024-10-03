import React, { useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classnames from "classnames";
import {
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getMenu } from 'redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
// ** international
import { IntlContext } from '../../utils/context/Internationalization'
import { FormattedMessage } from 'react-intl'
function ExamplesNavbar() {
  const dispatch = useDispatch()
  const context = useContext(IntlContext)
  const storeInfo = useSelector(state => state.menu)
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const idUnit = 1; // Homepage
  useEffect(() => {
    dispatch(
      getMenu(idUnit)
    )
  }, [])
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  const hideNavbarCollapse = () => {
    setNavbarCollapse(false);
    document.documentElement.classList.remove("nav-open");
  };
  return (
    <Navbar expand="lg">
      <Container>
        <div className="navbar-translate">
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-center"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <div className="d-flex justify-content-between" style={{ paddingBottom: '16px', borderBottom: '1px solid #CCCCCC' }}>
              {
                isMobile &&
                <div>
                  Language:<span onClick={(e) => {
                    e.preventDefault()
                    context.switchLanguage('vn')
                  }}>
                    <img src={require('assets/img/custom/logo/vn.png').default}
                      className="img-fluid mx-2"
                      alt="image"
                      style={{ width: '28px', cursor: 'pointer' }}>
                    </img>
                  </span>
                  <span onClick={(e) => {
                    e.preventDefault()
                    context.switchLanguage('en')
                  }}>
                    <img src={require('assets/img/custom/logo/eng.png').default}
                      className="img-fluid"
                      alt="image"
                      style={{ width: '31px', cursor: 'pointer' }}>
                    </img>
                  </span>
                </div>
              }
              <button
                aria-expanded={navbarCollapse}
                className={classnames("navbar-toggler", {
                  toggled: navbarCollapse,
                })}
                onClick={toggleNavbarCollapse}
              >
                <span className="navbar-toggler-bar bar1 nhan1" />
                <span className="navbar-toggler-bar bar2 nhan2" />
                <span className="navbar-toggler-bar bar3 nhan3" />
              </button>
            </div>
            {

              storeInfo.menu.map((item, index) => {
                if (item.title.toLowerCase() === "libraries") {
                  return (
                    <NavItem key={index} >
                      <NavLink
                        data-placement="bottom"
                        to={{ pathname: '' }}
                        className="nav-link"
                        onClick={(e) => e.preventDefault()}>
                        {<FormattedMessage id={item.title} />}
                      </NavLink>
                    </NavItem>
                  )
                }
                if (item.title.toLowerCase() === "students") {
                  return (
                    <NavItem key={index} >
                      <NavLink
                        data-placement="bottom"
                        to={{ pathname: '/student' }}
                        className="nav-link"
                        target={'_blank'}
                        >
                        {<FormattedMessage id={item.title} />}
                      </NavLink>
                    </NavItem>
                  )
                }
                else if (item.type === "REMOTE_URL") {
                  return (
                    <NavItem key={index} >
                      <NavLink
                        data-placement="bottom"
                        to={{ pathname: item.url }}
                        className="nav-link"
                        onClick={hideNavbarCollapse}
                        target="_blank">
                        {<FormattedMessage id={item.title} />}
                      </NavLink>
                    </NavItem>
                  )
                }
                else if (item.type === "CUSTOM_URL") {
                  return (
                    <NavItem key={index} >
                      <NavLink
                        data-placement="bottom"
                        to={{ pathname: item.url }}
                        className="nav-link"
                        onClick={hideNavbarCollapse}>
                        {<FormattedMessage id={item.title} />}
                      </NavLink>
                    </NavItem>
                  )
                }
                else {
                  return (
                    <UncontrolledDropdown nav inNavbar key={index} className='MuiTen'>
                      {
                        isMobile ? <DropdownToggle nav>
                          {<FormattedMessage id={item.title} />}
                        </DropdownToggle>
                          :
                          <DropdownToggle nav tag={Link} to={item.path} onClick={hideNavbarCollapse}>
                            {<FormattedMessage id={item.title} />}
                          </DropdownToggle>
                      }
                      <DropdownMenu right>
                        {
                          item.children.map((ele, ind) => {
                            if (ele.type === "REMOTE_URL") {
                              return (
                                <>
                                  <DropdownItem >
                                    <a href={`${ele.url}`} className="menuItem_link" onClick={hideNavbarCollapse}>{<FormattedMessage id={ele.title} />}</a>
                                  </DropdownItem>
                                  {ind === item.children.length - 1 ? "" : <DropdownItem divider />}
                                </>
                              )
                            }
                            else {
                              return (
                                <>
                                  <DropdownItem >
                                    <Link to={`${ele.path}`} className="" onClick={hideNavbarCollapse}>{<FormattedMessage id={ele.title} />}</Link>
                                  </DropdownItem>
                                  {ind === item.children.length - 1 ? "" : <DropdownItem divider />}
                                </>
                              )
                            }
                          })
                        }
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )
                }
              })
            }
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;
