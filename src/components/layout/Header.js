import React  from 'react';

import propTypes from 'prop-types';
import {Link} from 'react-router-dom';


const Header =(props)=>{


return(
<nav className="navbar navbar-expand-sm navbar-dark bg-danger ">
  <div className="container">
    <Link to="/about" className='navbar-brand'>{props.branding}</Link>

    <div>
        <ul className="navbar-nav mr-auto">
         <li className="nav-item">
           <Link to="/"className="nav-link"><i className="fas fa-home">
            </i> Home</Link>
         </li>

          <li className="nav-item">
            <Link to="/contact/add" className="nav-link"><i className="fas fa-plus">
            </i>add</Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link"><i className="fas fa-question">
            </i>about</Link>
          </li>
        </ul>
    </div>
  </div>

</nav>
)


}

Header.defaultProps = {
  branding:"my app"  
}

Header.propTypes={
    branding:propTypes.string.isRequired
}

export default Header;