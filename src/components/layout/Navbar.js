import React from 'react';
import './Navbar.css';
import classname from 'classname';
import PropTypes from 'prop-types';

const Navbar = ({ isFixed }) => {
  return (
    <nav
      className={classname('navbar is-dark', {
        'is-fixed-top': isFixed
      })}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a href="#" className="navbar-item is-size-4">
          LyricFinder
        </a>
      </div>
    </nav>
  );
};

Navbar.prototypes = {
  isFixed: PropTypes.bool.isRequired
};

export default Navbar;
