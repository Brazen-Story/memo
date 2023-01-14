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

export const PageNotFound = () => {
    return <div>404 err page</div>;
}

export default PageNotFound;