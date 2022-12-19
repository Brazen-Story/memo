import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { createGlobalStyle } from "styled-components";

const { delRoute } = require("../utils/APIRoutes");
<link
  href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Fjalla+One&family=Nerko+One&family=Permanent+Marker&family=Rubik+Spray+Paint&display=swap"
  rel="stylesheet"
></link>;
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #0f0e17;
  }

  h2{
    color : white;
    text-align : center;
    margin-top : 18%;
    font-family: 'Fjalla One', sans-serif;
  }

  .yes {
    margin-left : 38%;
    width: 140px;
    height: 45px;
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    font-family: 'Permanent Marker', cursive;
    }
  
  .yes:hover {
    background-color: #f7607f;
    box-shadow: 0px 15px 20px rgba(247, 96, 127, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  
  .no {
    margin-left : 3%;
    width: 140px;
    height: 45px;
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    font-family: 'Permanent Marker', cursive;
    }
  
  .no:hover {
    background-color: #2EE59D;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

function Del() {
  const navigate = useNavigate();
  //   const [data, setData] = useState(null);
  const item = JSON.parse(localStorage.getItem("memo-app-user"));

  const location = useLocation();
  const user = location.state.newArray; //값 념겨받음

  const MOVE = () => {
    navigate(`/user/${item.email}`); //다시 화면으로
  };

  const list = {
    title: user[0],
    writer: user[1],
    content: user[2],
    time: user[3],
  }; // 오브젝트로 만들기

  list.user = item.email;

  console.log(list); //넘겨줄 값 전달 잘됌

  const Del = async () => {
    if (await axios.post(delRoute, list)) {
      MOVE();
      console.log("del");
    }
  };

  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <h2>{user[0]} 파일을 정말로 삭제하시겠습니까?</h2>
      <br></br>
      <button onClick={Del} className="yes">
        네
      </button>{" "}
      <button onClick={MOVE} className="no">
        아니요
      </button>
    </div>
  );
}
export default Del;
