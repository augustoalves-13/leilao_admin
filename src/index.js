import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import LoginView from './views/login';
import { Slide, ToastContainer } from 'react-toastify';
import { DashboardView } from './views/dashboard';
import UserView from './views/user';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginView/>}/>
      <Route path='/dashboard' element={<UserView/>}/>
    </Routes>
    <ToastContainer hideProgressBar closeOnClick transition={Slide} theme='colored'/>
  </BrowserRouter>
);