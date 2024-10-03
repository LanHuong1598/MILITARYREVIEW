import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "react-feather";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
// ** redux
import { updateBreadCrumbNews, updateCategory } from "redux/actions/menu";
import { useDispatch, useSelector } from "react-redux";

import Loader from "react-loader-spinner";
import { Container, Row, Col } from "reactstrap";

export default function DetailOneBook() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [infoNews, setInfoNews] = useState({});
  const [stacks, setStacks] = useState([]);
  const [loaded, setLoaded] = useState();
  useEffect(() => {
    // set loading to wait get data
    setLoaded(false);
    const requestUrl = `http://27.71.228.19:5004/api/book/${id}`;
    axios
      .get(requestUrl)
      .then((response) => {
        const temp = response.data;
        setInfoNews(temp);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Lỗi gọi API!", error);
      });
    setLoaded(false);
    const requestUrl2 = `http://27.71.228.19:5004/api/book_stack/book/${id}`;
    axios
      .get(requestUrl2)
      .then((response) => {
        const temp = response.data;
        setStacks(temp);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Lỗi gọi API!", error);
      });
  }, [id]);

  const validateText = (text) => {
    if (text && text !== "" && text !== "''") {
      return true;
    }
    return false;
  };

  return !loaded ? (
    <Loader type="ThreeDots" color="#285A21" height="100" width="100" />
  ) : (
    <Container>
      <Row>
        <Col md={11}>
          <h3 style={{ fontWeight: 'bold' }}>{infoNews.title}</h3>
          <Row style={{ marginTop: "15px", marginBottom: "20px" }}>
            <Col md={4}>
              <img
                src={`http://27.71.228.19:5004/${infoNews.book_image}`}
                alt={infoNews.title}
                className="img-fluid"
              ></img>
            </Col>
            <Col md={8}>
              <Row>
                <Col md={12}>
                  {validateText(infoNews.author) && (
                    <Row className="mb-2">
                      <Col md={4}>
                        <b className="font-weight-bold">Author/Editor</b>
                      </Col>
                      <Col md={8}>
                        <span>{infoNews.author}</span>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={12}>
                  {validateText(infoNews.ISBN) && (
                    <Row className="mb-2">
                      <Col md={4}>
                        <b className="font-weight-bold">ISBN</b>
                      </Col>
                      <Col md={8}>
                        <span>{infoNews.ISBN}</span>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={12}>
                  {validateText(infoNews.publisher) && (
                    <Row className="mb-2">
                      <Col md={4}>
                        <b className="font-weight-bold">Publisher</b>
                      </Col>
                      <Col md={8}>
                        <span>{infoNews.publisher}</span>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={12}>
                  {validateText(infoNews.year_publisher) && (
                    <Row className="mb-2">
                      <Col md={4}>
                        <b className="font-weight-bold">Year Publish</b>
                      </Col>
                      <Col md={8}>
                        <span>{infoNews.year_publisher}</span>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={12}>
                  {validateText(infoNews.page_number) && (
                    <Row className="mb-2">
                      <Col md={4}>
                        <b className="font-weight-bold">Page number</b>
                      </Col>
                      <Col md={8}>
                        <span>{infoNews.page_number}</span>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={12}>
                  {validateText(infoNews.call_number) && (
                    <Row className="mb-2">
                      <Col md={4}>
                        <b className="font-weight-bold">Call number</b>
                      </Col>
                      <Col md={8}>
                        <span>{infoNews.call_number}</span>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={12}>
                  <Row className="mb-2">
                    <Col md={4}>
                      <b className="font-weight-bold">Stacks</b>
                    </Col>
                    <Col md={8}>
                      {stacks.map((item, index) => {
                        return <div key={index}>{item.stack.name};&ensp;</div>;
                      })}
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Row className="mb-2">
                    <Col md={4}>
                      <b className="font-weight-bold">Detail</b>
                    </Col>
                    <Col md={8}>
                      <a
                        href={`http://27.71.228.19:5004/${infoNews.intro}`}
                        target="_blank"
                      >
                        PDF file
                      </a>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Row className="mb-2">
                    <Col md={12}>
                      <b className="font-weight-bold">Tóm tắt</b>
                    </Col>
                    <Col md={12}>
                      <span>{infoNews.summary}</span>
                    </Col>

                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}
