import React from "react";
import styled from "styled-components";

const List = styled.ul`
  display: ${(p) => (p.expanded ? "block" : "none")};
  margin: 0;
  padding: 0;
  min-width: 500px;
  padding-left: 20px;
  list-style: none;
  text-align: center;

  input {
    color: #fff;
    background-color: #000;
    border-color: #000;
    font-size: 13px;
    text-align: center;
  }
`;

function NavList({ children, expanded = true }) {
  return <List expanded={expanded}>{children}</List>;
}

export default NavList;
