import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { CalendarRangeFill } from 'react-bootstrap-icons';


const Header = () => (
<nav>
<div className="navbar-left-side">
<CalendarRangeFill className='nav-icon'/>
<span>Trelletto</span>
</div>
<div className='navbar-right-side'>Sign Out</div>

</nav>
    );
  export default Header;
  