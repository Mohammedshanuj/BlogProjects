
import './App.css';
import React from 'react';
import { Box } from '@mui/material'
import Home from './pages/Home';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
//import RegistrationPage from './components/register/RegistrationPage';
import RegisterPage from './components/register/RegisterPage';
import RegistrationPage from './components/register/RegistrationPage';
import ForgotPwd from './components/ForgotPwd';
import Blog_Page from './pages/BlogPage'
import Footer from './components/Footer';
import SetPassword from './components/SetPassword';
import UserPage from './pages/UserPage';

import RegField from './components/register/RegField';
import Form from './components/reg/Form';
import CreateBlog from './components/CreateBlog';
import RequireAuthe from './components/RequireAuthe';
import MyBlogs from './components/MyBlogs';
import DetailedBlogPage from './pages/DetailedBlogPage';
import BlogEditPage from './components/BlogEditPage';
import BlogPage from './pages/BlogPage';
import PremiumPage from './pages/PremiumPage';
import AdminPage from './pages/AdminPage';
//import BlogRte from './components/register/BlogRte'


function App() {
  let location = useLocation()
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m='auto'>
       {location.pathname === '/admin' ? null:<Navbar /> }
      {/* <Navbar /> */}
      <Routes>
        <Route element={<RequireAuthe />}>
          <Route path='/user' element={<UserPage />} />
          <Route path='/premium' element={<PremiumPage />} />
          <Route path='/blog' element={<BlogPage/>} />
          <Route path='/myBlog' element={<MyBlogs />} />
          <Route path='/details/:id' element={<DetailedBlogPage />} />
          <Route path='/edit/:id' element={<BlogEditPage/>} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegField />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/forgotPassword' element={<ForgotPwd />} />
        <Route path='/setPassword/:token' element={<SetPassword />} />

        <Route path='/reg' element={<RegField />} />
        <Route path='/form' element={<Form />} />
      </Routes>
      {/* <Footer/> */}
    </Box>
  );
}

export default App;
