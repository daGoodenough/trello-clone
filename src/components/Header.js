import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { CalendarRangeFill } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions';


const Header = () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.loggedIn);

  const handleLogOut = () => {
    dispatch(logout());
  }

  return (
    <nav>
      <div className="navbar-left-side">
        <CalendarRangeFill className='nav-icon' />
        <span>Trelletto</span>
      </div>
      {loggedIn ?
        <div onClick={handleLogOut} className='navbar-right-side'>Log Out</div> :
        <div className='navbar-right-side'><a className='nav-link' href="/login">Log In</a></div>
      }

    </nav>
  );
}
export default Header;
