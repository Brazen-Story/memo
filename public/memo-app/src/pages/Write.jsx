import React, { useState, uesCallback } from "react";
import "moment/locale/ko";
import moment from "moment";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../Nav";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

import "react-toastify/dist/ReactToastify.css";
import { useCallback } from "react";
import { useEffect } from "react";
import { mainUpdateRoute } from "../utils/APIRoutes";

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
  margin: -4% 23%;
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

  .filebtn {
    margin-right: 21%;
    margin-top: 1.5%;
    diplay: flex;
    width: 80px;
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

  .smbtn {
    margin-top: 1.5%;
    margin-left: 67%;
    diplay: flex;
    width: 80px;
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

  .filebox input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
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

const { WriteRoute } = require("../utils/APIRoutes");

function Write() {

  const item = JSON.parse(localStorage.getItem("memo-app-user"));
  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const [text, setText] = useState();
  const [title, setTitle] = useState();

  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month  + '-' + day;

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHoveer: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  let fileReader;

  const onChange = (e) => {
    let file = e.target.files;
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file[0]);
    //console.log(file[0].name);
    setTitle(file[0].name);
  };

  const handleFileRead = (e) => {
    let content = fileReader.result;
    let encoded = null;
    // encoded = HTMLDecoderEncoder.encode(content);
    encoded = encodeURIComponent(content);
    setText(encoded);
  };

  const memolist = {
    title: title,
    writer: item.email,
    content: text,
    time: nowTime,
  };



  console.log(memolist)

  const onSubmit = async () => {
    const { data } = await axios.post(WriteRoute, memolist);
    console.log(memolist);

    if (data.status === false) {
      alert("????????? ???????????????!");
      toast.error(data.msg, toastOptions);
    }

    if (data.status === true) {
      navigate(`/user/${item.email}/${dateString}`);
    }
  };

  const HOME = () => {
    navigate(`/${dateString}`);
  };

  const onTitleChange = useCallback(e => {
    setTitle(e.target.value);
  })

  const onTextChange = useCallback(e => {
    setText(e.target.value)
  })

  const onUpdate = async () => {
    console.log("hi")
  }

  const updateList = async (id) => {
    await axios.put(`${mainUpdateRoute}`,{
      id : id,
      //newmainList : newmainList,
    });

  }

  // const [clockState, setClockState] = useState();

  // useEffect(() => {
  //   setInterval(()=> {
  //     const date = new Date();
  //     setClockState(date.toLocaleTimeString());
  //   },1000);
  //   }, []);

 
  return (
    <Nav>
      <Wrapper>
        <h2 style={{ color: "white" }}>Write and Upload</h2>
        <button onClick={HOME}> MAIN PAGE </button>
        <NavLink to={`/user/${item.email}/${dateString}`}>
          <button>My memo</button>
        </NavLink>
      </Wrapper>

      <Layout>
        <GlobalStyle />
        <button onClick={onUpdate}>
          ??????
        </button>
        <button onClick={onSubmit} className="smbtn">
          ??????
        </button>
        <button className="filebtn">
          <div class="filebox">
            <label for="ex_file">?????????</label>
            <input type="file" id="ex_file" accept=".txt" onChange={onChange} />
          </div>
        </button>
      </Layout>
      <div>
        <Main>
          <br />
          <br />
          <input type="text" value={title} onChange={onTitleChange}></input><button>?????????</button>
          <br />
          <br />
          <textarea type="text" value={decodeURIComponent(text)} onChange={(e)=> onTextChange(e)}></textarea>
        </Main>
      </div>
    </Nav>
  );
}

export default Write;
