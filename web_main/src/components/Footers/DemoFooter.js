/*eslint-disable*/
import React from "react";
import 'assets/css/footer.css';
import { Link } from 'react-router-dom'
// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import { faYoutube, faFacebook, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
function DemoFooter() {
  const storeInfo = useSelector(state => state.login)
  return (
    // storeInfo.login ?
    <footer className="site-footer" >
      <Container style={{ paddingBottom: '55px' }}>
        <Row>
          <Col md={12} sm={12}>
            <p className="text-uppercase titleSchool" style={{ textAlign: 'center' }}>TẠP CHÍ LỊCH SỬ QUÂN SỰ</p>
            <p style={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> <span className="addressUniver"> 1B Nguyen Tri Phuong, Ba Đinh, Ha Nội</span>
            </p>
            <p style={{ textAlign: 'center' }}>
              <span className="addressUniver">Giấy phép số 377/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 22/6/2021</span>
            </p>
            <p style={{ textAlign: 'center' }}>
              <span className="addressUniver">Điện thoại: (04) 37334883</span>
            </p>
            <p style={{ textAlign: 'center' }}>
              <span className="addressUniver">Fax : 84-4-37334883</span>
            </p>
          </Col>

        </Row>
      </Container>
      <p className="mb-0 text-center copyright">
        © 2021 bản quyền thuộc Tạp chí Lịch sử quân sự
      </p>
    </footer>
    // : <></>
  );
}

export default DemoFooter;
