import React from 'react';
import {
    Container,
    Navbar, 
    Nav, 
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../../images/logo.png';
import {Link,NavLink} from 'react-router-dom';
import './Header.scss';
import  {fetchUserLogin}  from '../../../redux/actions/UserstateActions';
const Header = () => {
    const login_status = useSelector(state => state.userState.login_status); 
    const dispatch = useDispatch();
    console.log(login_status);
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
                    <NavLink to='/admin/dashboard' className="logo">
                        <img src={Logo} alt="logo" />
                    </NavLink>
                </Nav>
                {login_status?
                <div className='dropdown icon-group'>
                    <div className='nav-item'>
                        <div className='svg-container'>
                            <Link to="/notification">
                                <i className='fa fa-bell'></i>
                            </Link>
                        </div>
                    </div>
                    <div className='nav-item'>
                        <div className='user-container' style={{cursor:"pointer"}}>
                            <i className='fa fa-user' onClick={()=>dispatch(fetchUserLogin(false))}></i>
                        </div>
                    </div>
                </div>:
                <Nav className='align-items-center'>
                     <NavLink to="/home"  className="nav-link get-started" >
                        Get Started
                    </NavLink>
                    <NavLink  to="/login"  className="nav-link login" onClick={()=>dispatch(fetchUserLogin(true))}>
                        Login
                    </NavLink>
                </Nav>}
            </Container>
        </Navbar> 
    </div>
)};

export { Header };