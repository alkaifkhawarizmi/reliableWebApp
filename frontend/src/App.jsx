import React, { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Addmission from "./components/Addmission";
import Gallery from "./components/Gallery";
import ContactUs from "./components/ContactUs";
import AdminLogin from "./components/adminpages/AdminLogin";
import PrincipalDashboard from "./components/adminpages/MediaDashboard";
import Homepage from "./components/adminpages/HomePage";
import { gettAllMedia } from "./api/fetchData";
import StudentResult from "./components/StudentResult";
import AboutUs from "./components/AboutUs";
import AnnouncementForm from "./components/adminpages/AnnoucementForm.jsx";
import AdminContactsDashboard from "./components/adminpages/Notifications.jsx";

function App() {

  const [media , setMedia] = useState([])

  useEffect(() => {

    (async () => {
      try {
        const res = await gettAllMedia(); // Waits for the promise to resolve
        setMedia(res.media)
        // console.log(media); // Use the data here
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    })();
    
  },[])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home mediaData = {media} />} />
        <Route path="/addmissions" element={<Addmission />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/gallery" element={<Gallery mediaData = {media} />} />
        <Route path="/results" element={<StudentResult />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin/media" element={<PrincipalDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<Homepage />} />
        <Route path="/admin/annoucement" element={<AnnouncementForm />} />
        <Route path="/admin/notifications" element={<AdminContactsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
