import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Addmission from "./components/Addmission";
import Gallery from "./components/Gallery";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addmissions" element ={<Addmission />}/>
        <Route path="/contact-us" element = {<ContactUs />} />
        <Route path="/gallery" element = {<Gallery />} />
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </Router>
  );
}

export default App;
