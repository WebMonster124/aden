import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { createAppStore } from './redux/stores/AppStore';

import { Home } from './components/pages/home';
import { Vehicles } from './components/pages/vehicle';
import { Payment } from './components/pages/payment';
import { History  } from './components/pages/history';
import { Login as LoginPage } from './components/pages/login'
import { Register } from './components/pages/register'

import { Login } from './components/admin/pages/login';
import { Dashboard } from './components/admin/pages/dashboard';
import { Notification } from './components/admin/pages/notification'
import { Vehicle } from './components/admin/pages/vehicle'
import { Booking } from './components/admin/pages/booking'
import { BookRider } from './components/admin/pages/book_rider'
import { Driver } from './components/admin/pages/driver'
import { Notification as ClientNotification } from './components/pages/notification'
export const App = () => (
    <Provider store={createAppStore()}> 
        <Routes>     
          <Route path='/home' element={<Home />} exact={true} />
          <Route path='/vehicles' element={<Vehicles />} exact={true} />
          <Route path='/payment' element={<Payment />} exact={true} />
          <Route path="/*" element={<Navigate replace to="/home" />} />
          <Route path= "/notification" element ={<ClientNotification/>} exact={true}/>
          <Route path= "/history" element ={<History/>} exact={true}/>
          <Route path= "/register" element ={<Register/>} exact={true}/>
          <Route path= "/login" element ={<LoginPage/>} exact={true}/>
             
          <Route path="/admin" element={<Dashboard/>} exact={true} />
          <Route path="/admin/login" element={<Login/>} exact={true} />
          <Route path='/admin/vehicle' element={<Vehicle/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>} exact={true} />
          <Route path="/admin/notification" element={<Notification/>} exact={true} />
          <Route path="/admin/booking" element={<Booking/>} exact={true} />
          <Route path="/admin/book_ride" element={<BookRider/>} exact={true} />
          <Route path="/admin/driver" element={<Driver/>} exact={true} />  
        </Routes>      
    </Provider>
);

export default App;
