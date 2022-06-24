import React, { useEffect, useState } from 'react';
import {
    Container,
    Navbar, 
    Nav, 
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../../images/logo.png';
import {Link,NavLink,useNavigate,useLocation} from 'react-router-dom';
import './Header.scss';
import { useTranslation } from 'react-i18next'
import {login, flushUserSession, logout,getAuthUser} from '../../../auth'
import  {fetchUserLogin}  from '../../../redux/actions/UserstateActions';
import { Profile_modal } from './profile_modal';
import i18n from "../../../i18n";
const languages = [
    { value: '', text: "Options" },
    { value: 'en', text: "English" },
    { value: 'nl', text: "Dutch" }
  ]
const Header = (props) => {
    const [ newMessage, setNewMessage]= useState(false);
    const pusher = new Pusher("be671fa12decfbbb2d96", {
        cluster: "ap3"
      });
      const channel = pusher.subscribe("channel");
      channel.bind("event", (newMessage) => {
        //setMessages([...messages, newMessage]);
        setNewMessage(true)
      });
    const login_status = useSelector(state => state.userState.login_status);
    const AuthUser = getAuthUser();
    const dispatch = useDispatch();
    const {t}=useTranslation();
    //const { i18n, change } = props;
    const [modalShow,setModalShow] = useState();
    console.log(login_status);
    const navigate = useNavigate();
    const [ active,setActive]=useState();
    const logout_click = () => {
        dispatch(fetchUserLogin(false));
        logout();
    }
    const location = useLocation();
    const [lang, setLang] = useState('en');
    const handleChange = e => { 
        setLang(e.target.value)
        i18n.changeLanguage(e.target.value);
    }
  
    useEffect(()=>{
        const AuthUser = getAuthUser(); 
        const pathname = location.pathname
        if ( pathname == '/notification')
            setActive(true)
        if (!AuthUser)
           {
                flushUserSession();
           }
        else{
            dispatch(fetchUserLogin(AuthUser))

            
        }
    },[])
    const onHide = () =>{
        setModalShow(false)
    }
return (
    <div className="header">
        <Navbar bg="white" variant="white" className='py-3'>
            <Container className="navbar-container"> 
                <Profile_modal
                    show={modalShow}
                    onHide={onHide}
                    data={AuthUser}
                />              
                <Nav className='align-items-center' style={{gridArea:'tab'}}>
                    <NavLink to="/home"  className="nav-link" >
                        {t('book_ride')}
                    </NavLink>

                    <NavLink to="/history" className="nav-link">
                        {t('book_history')}
                    </NavLink>
                </Nav>
                <Nav className='align-items-center' style={{gridArea:'logo'}}>
                    <NavLink to='/admin/dashboard' className="logo">
                        <img src={Logo} alt="logo" />
                    </NavLink>
                </Nav>
                {login_status?
                <div className='dropdown icon-group'  style={{gridArea:'button'}}>
                    <div className='nav-item'>
                    <select value={lang} onChange={handleChange}>
                            {languages.map(item => {
                                return (<option key={item.value} 
                                value={item.value}>{item.text}</option>);
                            })}
                            {/* <option key={'1'} value="en" onClick={() => i18n.changeLanguage("en")}>english</option>
                            <option key={'2'} value="nl" onClick={() => i18n.changeLanguage("nl")}>dutch</option> */}
                        </select>
                    </div>
                    <div className='nav-item'>
                        <div className='svg-container'>
                            <Link to="/notification">
                                <i className={active? 'fa fa-bell active':'fa fa-bell'}></i>
                                {(login_status.notifications && login_status.notifications.length > 0) || newMessage  ?
                                <span className='indicator'></span>:''}
                                
                            </Link>
                        </div>
                    </div>
                    <div className='nav-item'>
                        <div className='user-container' style={{cursor:"pointer"}}>
                            <i className='fa fa-user' onClick={()=>logout_click()}></i>
                            <h6 onClick={()=>setModalShow(true)}>{AuthUser? AuthUser.name? AuthUser.name:AuthUser.email:''}</h6>
                        </div>
                    </div>
                </div>:
                <Nav className='align-items-center ' style={{gridArea:'button'}}>
                     <NavLink to="/home"  className="nav-link get-started" >
                        {t('get_started')}
                    </NavLink>
                    <NavLink  to="/login"  className="nav-link login" onClick={()=>dispatch(fetchUserLogin(true))}>
                        {t('login')}
                    </NavLink>
                </Nav>}
            </Container>
        </Navbar> 
    </div>
)};

export { Header };