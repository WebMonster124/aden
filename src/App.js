import React ,{useEffect}from 'react';
import { Provider } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { createAppStore } from './redux/stores/AppStore';

import { Home } from './components/pages/home';
import { Vehicles } from './components/pages/vehicle';
import { Payment } from './components/pages/payment';
import { History  } from './components/pages/history';
import { Login as LoginPage } from './components/pages/login'
import { Register } from './components/pages/register'
import { BrowserRouter, Switch } from 'react-router-dom';
import { Login } from './components/admin/pages/login';
import { Dashboard } from './components/admin/pages/dashboard';
import { Notification } from './components/admin/pages/notification'
import { Vehicle } from './components/admin/pages/vehicle'
import { Booking } from './components/admin/pages/booking'
import { BookRider } from './components/admin/pages/book_rider'
import { Driver } from './components/admin/pages/driver'
import {getBearer} from './auth';
import { Notification as ClientNotification } from './components/pages/notification'
import axios from 'axios'
import './i18n.js'
import PrivateRoute from './PrivateRoute';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import PublicRoute from './PublicRoute';
import FileUpload from './components/test/FileUpload';
axios.defaults.headers.common['x-access-token'] = getBearer();


const lang = i18n.language;
const changeLanguage = lng => {
  i18n.changeLanguage(lng);
};

export const App = () =>{
   return(
    <Provider store={createAppStore()}> 
       <I18nextProvider i18n={i18n}>
        <Routes>
            <Route path="/"  element={<Home />} exact={true} />
            <Route path='/home' element={<Home />} exact={true} />
            <Route path= "/login" element ={<LoginPage/>} exact={true}/>
            <Route path= "/register" element ={<Register/>} exact={true}/>  
            <Route path='/vehicles' element={
              <PublicRoute>
                <Vehicles />
              </PublicRoute>  
            } />            
            <Route path='/payment' element={
              <PublicRoute>
                <Payment />
              </PublicRoute>
              } exact={true} />
            <Route path= "/notification" element ={
              <PublicRoute>
                <ClientNotification/>
               </PublicRoute>
              } exact={true}/>
            <Route path= "/history" element ={
              <PublicRoute>
                <History/>
                </PublicRoute>
              } exact={true}/>
            <Route path="/admin" element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
              } exact={true} /> 
            <Route path="/admin/login" element={
              <PrivateRoute>
                <Login/>
              </PrivateRoute>
              } exact={true} />
            <Route path='/admin/vehicle' element={
              <PrivateRoute>
                <Vehicle/>
              </PrivateRoute>
              }exact={true} />
            <Route path="/admin/dashboard" element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
              } exact={true} />
            <Route path="/admin/notification" element={
              <PrivateRoute>
                <Notification/>
              </PrivateRoute>
              } exact={true} />
            <Route path="/admin/booking" element={
              <PrivateRoute>
                <Booking/>
              </PrivateRoute>
              } exact={true} />
            <Route path="/admin/book_ride" element={
              <PrivateRoute>
                <BookRider/>
              </PrivateRoute>
              } exact={true} />
            <Route path="/admin/driver" element={
              <PrivateRoute>
                <Driver/>
              </PrivateRoute>
            } exact={true} />
        </Routes>  
      </I18nextProvider>    
    </Provider>
)};

export default App;
