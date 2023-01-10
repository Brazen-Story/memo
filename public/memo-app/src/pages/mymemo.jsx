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
const HTMLDecoderEncoder = require("html-encoder-decoder");

function Mymemo() {
  const { email } = useParams();

  const [dataList, setdataList] = useState(null);
  const item = JSON.parse(localStorage.getItem("memo-app-user"));

  const usemail = JSON.parse(localStorage.getItem("memo-app-user")).email;

  const navigate = useNavigate();

  const GetData = async () => {
    const response = await axios.post(mymemoRoute);
    setdataList(response.data);

    console.log(response.data);
    console.log(response);
  };

  useEffect(() => {
    GetData();
  }, []);
  // const list = JSON.stringify(dataList);
  // 제목과 같은 콘텐츠를 옆에 출력
  const [content, setContent] = useState([]);
  console.log(content);

  //누르면 생성
  const handleClickButton = (e) => {
    const { name } = e.target;
    setContent(name.split(","));
  };

    const newArrays = [];
    const mes = dataList?.content
      .filter((e) => e.writer === content[0] && e.title === content[1])
      .map((e) => {
        newArrays.push(e._id, e.title, e.writer, e.content, e.time);
      });

  console.log(mes);

  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month  + '-' + day;

  const mos = {
    _id : newArrays[0],
    title: newArrays[1],
    writer: newArrays[2],
    content: newArrays[3],
    time: dateString,
  }; // 새로운 데이터

  console.log(mos);
  // console.log(mo);

  //값이 있으면 작동 없으면 err

  const onSubmit = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(mymemoRoute, mos);
      if (data.status === false) {
        console.log("data err");
      }
      if (data.status === true) {
        //navigate("/");
        navigate(`/${date}`);

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
    navigate("/");
  };


  const Write = async () => {
    navigate("/write");
  };

  const [selectedDayRange, setSelectedDayRange] = useState(new Date()); //실행 될 때마다 date로 페이지 리로드.
  const date = moment(selectedDayRange).format("YYYY-MM-DD");

   useEffect(() => {
    window.history.pushState({}, "", `/user/${usemail}/${date}`);
  }, [date]);

  const datas = mos.content
    ? mos.content.includes("%A0")
      ? mos.content.replace(/%A0/gi, "\n")
      : mos.content
    : null;
  const view = decodeURIComponent(mos.content);

  return (
    <Nav>
      <Wrapper>
        {item === null ? (
          <h2 style={{ color: "white" }}>로그인이 필요합니다.</h2>
        ) : (
          <h2 style={{ color: "white" }}>{item.email}'s memo</h2>
        )}
        <button onClick={HOME}> MAIN PAGE </button>
        <button onClick={Write}>글쓰기</button>
      </Wrapper>
      <Layout>
        <GlobalStyle />
        <Nav.List className="body">
          <br></br>
          <Nav.Item>
            <Calendar
              className="Cal"
              onChange={setSelectedDayRange}
            />
            <br></br>
            <div className="row">
              {dataList?.content !== undefined
                ? dataList?.content
                    .filter(
                      (e) =>
                        e.time.slice(0, 10) === date && e.writer === usemail
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
                                name={[e.writer, e.title]}
                                key={index}
                              >
                                확인
                              </button>{" "}
                            </TableCell>
                            <TableCell>
                              <button className="bodybtn" onClick={onSubmit}>
                                {" "}
                                공유{" "}
                              </button>
                            </TableCell>
                            <TableCell>
                              <div>
                                <Link to="/del" state={{ newArrays }}>
                                  <button className="bodybtn">삭제</button>
                                </Link>
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
          <h3>제목 : {mos.title}</h3>
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
