import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  Row,
  Col,
  Layout,
  Select,
  Menu,
  Input,
  Tooltip,
  message,
  BackTop,
  Button,
  Pagination,
} from "antd";
import classnames from "classnames";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import backendService from "../api/BackendService";
import { Link } from "react-router-dom";
import { setValue } from "../redux";
import store from "../redux/store";

const { Option } = Select;
const { Sider } = Layout;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
const Character = ({ count }) => {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [broken, setBroken] = useState(true);
  const [pages, setPages] = useState();
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleStatus = (val) => {
    setStatus(val);
  };
  const handleGender = (val) => {
    setGender(val);
  };
  const handleInput = (val) => {
    setName(val);
  };
  const handleBreak = (val) => {
    setBroken(val);
  };
  useEffect(() => {
    localStorage.setItem("page", count.page);
    backendService
      .getCharacters(count.page)
      .then((res) => {
        console.log(res);
        setPages(res.data && res.data.info.pages);
        setCharacters(res.data && res.data.results);
      })
      .catch((err) => console.log(err));
  }, [count]);
  useEffect(() => {
    (name !== "") | (status !== "") | (gender !== "") &&
      backendService
        .getFilterCharacter({
          name: name ? name : "",
          status: status ? status : "",
          gender: gender ? gender : "",
        })
        .then((res) => {
          setCharacters(res.data.results);
        })
        .catch((err) => {
          message.error({
            content: "No Character with searched features exists.",
          });
        });
  }, [name, status, gender]);
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          zIndex: "1",
          position: "fixed",
          height: "100%",
        }}
        onBreakpoint={(broken) => {
          handleBreak(broken);
        }}
      >
        <Menu theme="dark">
          <Tooltip title="Press ENTER after typing name." placement="rightTop">
            <Input
              placeholder="Type name here"
              prefix={<SearchOutlined />}
              style={{ margin: "10px", maxWidth: "fit-content" }}
              onPressEnter={(e) => handleInput(e.target.value)}
            />
          </Tooltip>
          <Select
            defaultValue="Status"
            style={{
              width: "90%",
              height: "100%",
              position: "relative",
              margin: "10px",
            }}
            listHeight={128}
            onChange={(val) => {
              handleStatus(val);
            }}
          >
            <Option value="unknown">Unknown</Option>
            <Option value="alive">Alive</Option>
            <Option value="dead">Dead</Option>
          </Select>
          <Select
            defaultValue="Gender Filter "
            style={{
              width: "90%",
              height: "100%",
              position: "relative",
              margin: "10px",
            }}
            listHeight={128}
            onChange={(val) => {
              handleGender(val);
            }}
          >
            <Option value="unknown">Unknown</Option>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Menu>
      </Sider>

      <div
        className={classnames({
          "sider-open": !broken,
          "sider-close": broken,
          "small-screen": (windowDimensions.width<=650)===true
        })}
      >
        {console.log(windowDimensions.width<=650)}
        <Row type="flex">
          {characters.map &&
            characters.map((item) => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card
                  hoverable
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    margin: "10px",
                    border: "solid",
                    cursor: "default",
                    minHeight: "30rem",
                  }}
                  bordered={true}
                  cover={
                    <img
                      alt="example"
                      src={item.image}
                      style={{ padding: "10px" }}
                    />
                  }
                >
                  <span style={{ padding: "1px" }}>
                    <div style={{ fontSize: "1.5rem" }}>{item.name}</div>
                    <div style={{ fontSize: "1.2rem" }}>{item.species}</div>
                    <div style={{ fontSize: "1.2rem" }}>{item.status}</div>
                  </span>
                  <Link to={"/characters/" + item.id}>
                    <Button
                      style={{
                        width: "100%",
                        lineHeight: "20px",
                        borderRadius: 4,
                        backgroundColor: "gray",
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 14,
                        marginTop: "20px",
                      }}
                    >
                      Details
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
        <Row>
          <BackTop>
            <div
              style={{
                height: 40,
                width: 100,
                lineHeight: "40px",
                borderRadius: 4,
                backgroundColor: "gray",
                color: "#fff",
                textAlign: "center",
                fontSize: 14,
                position: "fixed",
                left: "15rem",
              }}
            >
              Go Top
            </div>
          </BackTop>
        </Row>
        {(name === "") & (status === "") & (gender === "") ? (
          <Pagination
            simple
            current={count.page}
            total={pages * 10}
            onChange={(page) => store.dispatch(setValue(page))}
          />
        ) : (
          <div />
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.counter,
  };
};

export default connect(mapStateToProps)(Character);
