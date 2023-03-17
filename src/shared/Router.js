import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../pages/Main";
import Party from "../pages/Party";
import Profile from "../pages/Profile";
import MeetHome from "../pages/MeetHome";
import MeetingRoom from "../pages/MeetingRoom";
import EditPost from "../pages/EditPost";
import Admin from "../pages/Admin";
import { path } from "../constants/path";
import Header from "../components/global/Header";
import { ToastContainer } from "react-toastify";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Main />} path={`/${path.MAIN}`} />
        <Route element={<Party />} path={`/${path.PARTY}`} />
        <Route element={<Profile />} path={`/${path.PROFILE}`} />
        <Route element={<MeetHome />} path={`/${path.MEETHOME}`} />
        <Route element={<MeetingRoom />} path={`/${path.MEETINGROOM}`} />
        <Route element={<EditPost />} path={`/${path.EDITPOST}`} />
        <Route element={<Admin />} path={`/${path.ADMIN}`} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
