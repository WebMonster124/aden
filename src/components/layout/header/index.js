import React, {useState} from 'react';
import {
    Container,
    Navbar, 
    Nav, 
} from 'react-bootstrap';

import Logo from '../../../images/logo.png';
import {Link,NavLink} from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const [bookactive, setBookactive]=useState(true);
    const [login_status, setLoginStatus]=useState(false)
return (
    <div className="header">
        <Navbar bg="white" variant="white" className='py-3'>
            <Container>               
                <Nav className='align-items-center'>
                    <NavLink to="/home"  className="nav-link" >
                        Book a ride
                    </NavLink>

                    <NavLink to="/history" className="nav-link">
                        Booking History
                    </NavLink>
                </Nav>
                <Nav className='align-items-center'>
                    <Nav.Link href='#home' className="logo">
                        <img src={Logo} alt="logo" />
                    </Nav.Link>
                </Nav>
                {login_status?
                <div className='dropdown'>
                    <div className='nav-item'>
                        <div className='svg-container'>
                            <Link to="/admin/notification">
                                <i className='fa fa-bell'></i>
                            </Link>
                        </div>
                    </div>
                    <div className='nav-item'>
                        <div className='user-container'>
                            <i className='fa fa-user'></i>
                        </div>
                    </div>
                </div>:
                <Nav className='align-items-center'>
                    <Nav.Link as={Link} to="/home" onClick={()=>setBookactive(true)} className="get-started">Get Started</Nav.Link>
                    <Nav.Link as={Link} to="/login" onClick={()=>setBookactive(true)} className="login">Login</Nav.Link>
                </Nav>}
            </Container>
        </Navbar> 
    </div>
)};

export { Header };