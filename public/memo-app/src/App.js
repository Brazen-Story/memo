import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Memo from "./pages/Memo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Mymemo from "./pages/mymemo";
import PageNotFound from "./pages/PageNotFound";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/write" element={<Write />} />
        <Route exact path="/user/:email/:date" element={<Mymemo />} />
        <Route exact path="/:date/*" element={<Memo />} /> 
        {/* <Route path="/*" element={<PageNotFound />} /> */}
        <Route path="/PageNotFound" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
