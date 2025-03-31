import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Contacts from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleBlogPage from "./pages/SingleBlogPage";
import BlogsPage from "./pages/BlogsPage";
import ForgotPassword from "./pages/ForgotPassword"; // Import ForgotPassword component

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        {/* Route for the initial forgot password request */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Route for handling the password reset link from the email */}
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />

        {/* Blog Routes */}
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:id" element={<SingleBlogPage />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;