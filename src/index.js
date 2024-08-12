import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import LoginView from './views/login';
import { Slide, ToastContainer } from 'react-toastify';
//import { DashboardView } from './views/dashboard';
import UserView from './views/user';
import EstablishmentView from './views/establishment';
import StoreView from './views/store';
import { DeviceView } from './views/device';
import { ProductView } from './views/product';
import DetailsProductView from './views/details/product';
import CategoriesView from './views/categories';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginView />} />
      <Route path='/user' element={<UserView />} />
      <Route path='/establishment' element={<EstablishmentView />} />
      <Route path='/store' element={<StoreView />} />
      <Route path='/device' element={<DeviceView />} />
      <Route path='/categories' element={<CategoriesView />} />
      <Route path='/product' element={<ProductView />} />
      <Route path='/details/product/:id/view' element={<DetailsProductView />} />
    </Routes>
    <ToastContainer hideProgressBar closeOnClick transition={Slide} theme='colored' />
  </BrowserRouter>
);