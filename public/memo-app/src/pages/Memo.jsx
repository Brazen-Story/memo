import React, { useState, useEffect, Component, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import Nav from "../Nav";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import "moment/locale/ko";
import { createGlobalStyle } from "styled-components";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./cal.css";
import moment from "moment";

const { mymemoRoute, mainRoute, mainDeleteRoute } = require("../utils/APIRoutes");

<link
  href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Nerko+One&family=Noto+Sans+KR:wght@300&display=swap"
  rel="stylesheet"
></link>;

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

    &:hover {
      background: black;
      color: white;
    }
  }
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

const body = styled.div`
  top: 3000px;
`;

function isActive(path) {
  return window.location.pathname.startsWith(path);
}

function Memo() {

  const params = useParams();

  const [value, onChange] = useState(new Date());

  const navigate = useNavigate();
  const [dataList, setdataList] = useState(null);
  const item = JSON.parse(localStorage.getItem("memo-app-user"));

  const GetData = async () => {
    const response = await axios.post(mainRoute);
    //console.log(response.data.content.filter((time) => time === date));
    setdataList(response.data);
    //console.log("success");
  };

  const DelData = async (id) => {
    await axios.delete(`${mainDeleteRoute}/${id}`);

    window.location.replace("/");
    
   }; //삭제 성공
 

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

  const onSubmit = (e) => {
    const { name } = e.target;
    setContent(name.split(","));
    console.log(name);
    // const { writer } = e.target;
    // setWriter(writer);
  };

  const deldatas = {
    _id : list[0],
    title: list[1],
    time: list[2],
    writer: list[3],
    contentBody: list[4],
  };

  deldatas.user = item.email;

  // const DelData = async () => {
  //   if (handleValidation()) {
  //     const { data } = await axios.post(delmain, deldatas);
  //     if (data.status === false) {
  //       console.log("data err");
  //     }
  //     if (data.status === true) {
  //       window.location.reload();
  //     }
  //   }
  //   // if (handleValidation()){
  //   //   const {data} = await axios.delete(mainRoute, {data : deldatas});

  //   //   if(data.status === false){
  //   //     console.log("s");
  //   //   }

  //   //   if(data.status === true){
  //   //     console.log("a");
  //   //   }
  //   };
  


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
  const [selectedDayRange, setSelectedDayRange] = useState(new Date()); //바뀔때마다 실행이 된다?
  const date = moment(selectedDayRange).format("YYYY-MM-DD");

  console.log(selectedDayRange);
  console.log(date);

  useEffect(() => {
    // Update the URL when the date changes
    window.history.pushState({}, "", `/${date}`);
  }, [date]);
  
  const datas = deldatas.contentBody
    ? deldatas.contentBody.includes("%A0")
      ? deldatas.contentBody.replace(/%A0/gi, "\n")
      : deldatas.contentBody
    : null;
  
  const view = decodeURIComponent(deldatas.contentBody);
  //console.log(view); // 메모 내용 확인.


  
  //console.log(localDate.slice(0, 10));
  //<button>달력</button>
  //<h2 style={{ color: "white" }}>{item.email}'s memo</h2>
  return (
    <Nav>
      <Wrapper>
        <h2 style={{ color: "white" }}>Memo Repository</h2>

        <NavLink to={`/user/${item.email}`}>
          <button>My memo</button>
        </NavLink>

        <button onClick={write}>글쓰기</button>

        {item === null ? (
          <button onClick={login}>login</button>
        ) : (
          <button onClick={logOut}>logOut</button>
        )}
      </Wrapper>
      <Layout>
        <GlobalStyle />
        <Nav.List className="body">
          <br></br>
          <Nav.Item>
            <Calendar
              className="Cal"
              onChange={setSelectedDayRange}
              value={selectedDayRange}
            />
            <br></br>
            <div className="row">
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
                                : e.title.slice(0, 15) + "..."}
                            </TableCell>
                            <TableCell>{e.writer}</TableCell>
                            <TableCell>
                              <button
                                className="bodybtn"
                                onClick={onSubmit}
                                name={[e._id, e.title, e.time, e.writer, e.content]}
                              >
                                {" "}
                                확인{" "}
                              </button>
                            </TableCell>
                            <TableCell>
                              <button className="bodybtn" onClick={() => DelData(e._id)}>
                                {" "}
                                삭제{" "}
                              </button>
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
          <h3>제목 : {deldatas.title}</h3>
          <br />
          <h5>
            {view.split("\n").map((data) => (
              <div>
                {data}
                <br />
              </div>
            ))}
          </h5>
        </Main>
      </Layout>
    </Nav>
  );
}

export default Memo;
