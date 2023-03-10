import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Nav from "../Nav";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { myDeleteRoute } from "../utils/APIRoutes";
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #0f0e17;
  }
`;

const Main = styled.main`
  background-color: white;
  justify-content: center;
  align-items: center;
  margin: 5% 5% 32px 32px;
  width: 56%;
  max-height: 550px;
  min-height: 550px;
  color: #0f0e17;
  border-radius: 8px;
  overflow: auto;
  &::-webkit-scrollbar-thumb {
    background: gray;
  }

  font-family: "Noto Sans KR", sans-serif;
`;

const Wrapper = styled.div`
  position: fixed;
  align-items: center;
  height: 72px;
  width: 100%;
  top: 0px;
  z-index: 5;
  color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);

  h2 {
    color: white;
    text-align: center;
    margin-left: 20px;
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

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 70px 0;
  color: #a7a9be;
  font-size: 1.5rem;
  font-family: sans-serif;

  .Cal {
    width: 450px;
  }

  .row {
    height: 350px;
    width: 500px;
    overflow: auto;

    &::-webkit-scrollbar {
      background: none;
    }
  }

  .bodybtn {
    diplay: flex;
    width: 50px;
    height: 30px;
    color: var(#ffffff);
    background: var(#161616);
    align-items: right;
    font-size: 15px;
    border-radius: 30px;
    float: right;
    margin-right: 18px;

    &:hover {
      background: black;
      color: white;
    }
  }
`;

const body = styled.div`
  top: 3000px;
`;

const { mymemoRoute, mainRoute, mmyRoute } = require("../utils/APIRoutes");

function Mymemo() {

  //const { email } = useParams();  

  const params = useParams();

  useEffect(() => {
    //console.log(params.date);
  },[params.date]); //?????? ????????? ???????????? ??????????

  const clickDay = (value) => { //??????????????? ??????????????? ????????????
    const date = moment(value).format("YYYY-MM-DD");
    navigate(`/user/${usemail}/${date}`);
  }

  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month  + '-' + day;


  const [dataList, setdataList] = useState(null);
  const item = JSON.parse(localStorage.getItem("memo-app-user"));

  const usemail = JSON.parse(localStorage.getItem("memo-app-user")).email;

  const navigate = useNavigate();

  const GetData = async () => {
    const response = await axios.post(mymemoRoute);
    setdataList(response.data);
  };

  useEffect(() => {
    GetData();
  }, []);

  // ????????? ?????? ???????????? ?????? ??????
  const [content, setContent] = useState([]);

  //????????? ??????
  const handleClickButton = (e) => {
    const { name } = e.target;
    setContent(name.split(","));
    console.log(name);
  };

    const newArrays = [];
    const mes = dataList?.content
      .filter((e) => e.writer === content[0] && e.title === content[1] && e.content === content[2])
      .map((e) => {
        newArrays.push(e._id, e.title, e.writer, e.content, e.time);
      });

  const mos = {
    _id : newArrays[0],
    title: newArrays[1],
    writer: newArrays[2],
    content: newArrays[3],
    time: dateString,
  }; // ????????? ?????????
  console.log(content)


  const onSubmit = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(mymemoRoute, mos);
      if (data.status === false) {
        console.log("data err");
      }
      if (data.status === true) {
        //navigate("/");
        navigate(`/${dateString}`);

      }
    }
  };

  const handleValidation = () => {
    if (mos.title === "") {
      console.log("err");
      return false;
    } else if (mos.writer === "") {
      console.log("writer err");
      return false;
    } else if (mos.content === "") {
      console.log("content err");
      return false;
    } else if (mos.time === "") {
      console.log("time err");
      return false;
    }
    return true;
  };

  const HOME = () => {
    navigate(`/${dateString}`);
  };

  const Write = async () => {
    navigate("/write");
  };

  const view = decodeURIComponent(mos.content);

  const DelData = async (id) => {
    await axios.delete(`${myDeleteRoute}/${id}`);
    window.location.reload();
  }

  return (
    <Nav>
      <Wrapper>
        {item === null ? (
          <h2 style={{ color: "white" }}>???????????? ???????????????.</h2>
        ) : (
          <h2 style={{ color: "white" }}>{item.email}'s memo</h2>
        )}
        <button onClick={HOME}> MAIN PAGE </button>
        <button onClick={Write}>?????????</button>
      </Wrapper>
      <Layout>
        <GlobalStyle />
        <Nav.List className="body">
          <br></br>
          <Nav.Item>
            <Calendar
              className="Cal"
              onClickDay={clickDay}
            />
            <br></br>
            <div className="row">
              {dataList?.content !== undefined
                ? dataList?.content
                    .filter(
                      (e) =>
                        e.time.slice(0, 10) === params.date && e.writer === usemail
                    )
                    .map((e, index) => (
                      <div className={index}>
                        <Nav.Link key={index}>
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {e.title.length < 20
                                ? e.title
                                : e.title.slice(0, 15) + "..."}
                            </TableCell>
                            <TableCell>
                              <button
                                className="bodybtn"
                                onClick={handleClickButton}
                                name={[e.writer, e.title, e.content]}
                                key={index}
                              >
                                ??????
                              </button>{" "}
                            </TableCell>
                            <TableCell>
                              <button className="bodybtn" onClick={onSubmit}>
                                {" "}
                                ??????{" "}
                              </button>
                            </TableCell>
                            <TableCell>
                              <div>
                               
                                <button className="bodybtn" onClick={() => DelData(e._id)}>
                                {" "}
                                ??????{" "}
                              </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </Nav.Link>
                      </div>
                    ))
                : null}
            </div>
          </Nav.Item>
        </Nav.List>
        <Main className="content">
          <h3>?????? : {mos.title}</h3>
          <br />
          {view.split("\n").map((data) => (
            <div>
              {data}
              <br />
            </div>
          ))}
        </Main>
      </Layout>
    </Nav>
  );
}

export default Mymemo;