import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { CalendarRangeFill } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state);
  const navigate = useNavigate();
  const handleLogOut = () => dispatch(logout());

  return (
    <nav>
      <div className="navbar-left-side" onClick={() => navigate('/')}>
        <CalendarRangeFill className='nav-icon' />
        <span>Trelletto</span>
      </div>
      {(auth.authenticated) ?
        (
          <div className='navbar-right-side d-flex'>
            <div className='user-email'>{auth.email}</div>
            <div className='p-1'> |  </div>
            <div onClick={handleLogOut} className='auth-status'>Log Out</div>
          </div>
        ) :
        (
        <div className='navbar-right-side auth-status'>
          <a className='nav-link ' href="/login">Log In</a>
        </div>
        )
      }
    </nav>
  );
}
export default Header;
