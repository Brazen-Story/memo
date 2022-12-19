import React, { useState, useEffect, Component, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import Nav from "../Nav";
import { useNavigate, NavLink } from "react-router-dom";
import "moment/locale/ko";
import { createGlobalStyle } from "styled-components";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./cal.css";
import { Tab, Table } from "@material-ui/core";
import moment from "moment";
const { mymemoRoute, mainRoute } = require("../utils/APIRoutes");
const HTMLDecoderEncoder = require("html-encoder-decoder");
<link
  href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
  rel="stylesheet"
></link>;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #0f0e17;
  }
`;

const Main = styled.main`
  justify-content: center;
  align-items: center;
  margin: 32px;
  width: 100%;
  min-height: 200px;
  background: #fffffe;
  color: #0f0e17;
  border-radius: 8px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 70px 0;
  color: #a7a9be;
  font-size: 1.5rem;
  font-family: sans-serif;
`;

const Wrapper = styled.div`
  position: fixed;
  align-items: center;
  height: 72px;
  width: 100%;
  top: 0px;
  z-index: 5;

  background: gray;
  color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);

  h2 {
    color: white;
    text-align: center;
    font-family: "Dancing Script", cursive;
  }

  button {
    diplay: flex;
    width: 100px;
    height: 30px;
    color: var(#ffffff);
    background: var(#161616);
    align-items: right;
    font-size: 15px;
    border-radius: 30px;
    float: right;

    &:hover {
      background: black;
      color: white;
    }
  }
`;

const body = styled.div`
  top: 3000px;
`;

function isActive(path) {
  return window.location.pathname.startsWith(path);
}

function Memo() {
  const navigate = useNavigate();
  const [dataList, setdataList] = useState(null);
  const [delList, setdelList] = userState();
  console.log(dataList);
  const item = JSON.parse(localStorage.getItem("memo-app-user"));

  const GetData = async () => {
    // const pusemail = await axios.post(mymemoRoute, usemail);
    const response = await axios.post(mainRoute);
    //  console.log(response.data.content);
    //console.log(response.data.content.filter((time) => time === date));
    setdataList(response.data);
    console.log("success");
  };

  useEffect(() => {
    GetData();
  }, []);

  const login = () => {
    navigate("/login");
    return false;
  };

  const logOut = () => {
    localStorage.removeItem("memo-app-user");
    navigate("/login");
  };

  const write = () => {
    navigate("/write");
    return false;
  };
  const [list, setContent] = useState([]);
  // const [arr, setArr] = useState([]);

  const onSubmit = (e) => {
    const { name } = e.target;
    setContent(name.split(","));
    // const { writer } = e.target;
    // setWriter(writer);
    const deldatas = {
      title: list[0],
      time: list[1],
      writer: list[2],
      contentBody: list[3],
    };

    deldatas.user = item.email;
  };
  console.log(list);
  // // console.log(list);

  const DelData = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(mainRoute, deldatas);
      if (data.status === false) {
        console.log("data err");
      }
      if (data.status === true) {
        window.location.reload();
      }
    }
  };

  const handleValidation = () => {
    if (
      deldatas.title === "" &&
      deldatas.title !== JSON.parse(localStorage.getItem("memo-app-user")).email
    ) {
      console.log("err");
      return false;
    } else if (deldatas.writer === "") {
      console.log("writer err");
      return false;
    } else if (deldatas.contentBody === "") {
      console.log("content err");
      return false;
    } else if (deldatas.time === "") {
      console.log("time err");
      return false;
    }
    return true;
  };
  const [selectedDayRange, setSelectedDayRange] = useState(new Date());
  const date = moment(selectedDayRange).format("YYYY-MM-DD");
  console.log(date);

  //console.log(localDate.slice(0, 10));
  //<button>달력</button>
  return (
    <Nav>
      <Wrapper>
        {item === null ? (
          <h2 id="title">로그인이 필요합니다.</h2>
        ) : (
          <h2 id="title">{item.email}님의 메모</h2>
        )}

        <NavLink to={`/user/${item.email}`}>
          <button id="btn">My memo</button>
        </NavLink>

        <button id="btn" onClick={write}>
          글쓰기
        </button>

        {item === null ? (
          <button id="btn" onClick={login}>
            login
          </button>
        ) : (
          <button id="btn" onClick={logOut}>
            logOut
          </button>
        )}
      </Wrapper>
      <Layout>
        <GlobalStyle />
        <Nav.List className="body">
          <br></br>
          <Nav.Item>
            <Calendar onChange={setSelectedDayRange} value={selectedDayRange} />
            <br></br>
            {dataList?.content !== undefined
              ? dataList?.content
                  .filter((e) => e.time.slice(0, 10) === date)
                  .map((e, index) => (
                    <div className={index}>
                      <Nav.Link key={index}>
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {e.title.length < 20
                              ? e.title
                              : e.title.slice(0, 10) + "..."}
                          </TableCell>
                          <TableCell>{e.writer}</TableCell>
                          <TableCell>
                            <input
                              type="checkbox"
                              onClick={onSubmit}
                              name={[e.title, e.time, e.writer, e.content]}
                            />{" "}
                            체크{" "}
                          </TableCell>
                          <TableCell>
                            <button type="checkbox" value="a" onClick={DelData}>
                              a{" "}
                            </button>
                          </TableCell>
                        </TableRow>
                      </Nav.Link>
                    </div>
                  ))
              : null}
          </Nav.Item>
        </Nav.List>
        <Main>
          <h3>{deldatas.contentBody}</h3>
        </Main>
      </Layout>
    </Nav>
  );
}

export default Memo;
