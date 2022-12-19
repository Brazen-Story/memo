import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Memo from "./pages/Memo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Mymemo from "./pages/mymemo";
import Del from "./pages/del";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write />} />
        <Route exact path="/user/:email" element={<Mymemo />} />
        <Route path="/" element={<Memo />} />
        <Route path="/del" element={<Del />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
