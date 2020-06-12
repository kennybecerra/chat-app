import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.scss';

const Layout = ({ children }) => {
  return <div className='layout'>{children}</div>;
};

const Content = ({ children }) => {
  return <div className='content'>{children}</div>;
};

const Footer = ({ children }) => {
  return <div className='footer'>{children}</div>;
};

const Nav = (props) => {
  return (
    <div className='nav'>
      {React.Children.count(props.children) === 0 ? (
        <>
          <NavLink
            className='navLink'
            activeClassName='activeLink'
            exact
            to='/'>
            Home
          </NavLink>
          <NavLink
            className='navLink'
            activeClassName='activeLink'
            exact
            to='/chat'>
            Chat
          </NavLink>
          <NavLink
            className='navLink'
            activeClassName='activeLink'
            exact
            to='/game'>
            Game
          </NavLink>
          <NavLink
            className='navLink'
            activeClassName='activeLink'
            exact
            to='/media'>
            Media
          </NavLink>
          <NavLink
            className='navLink'
            activeClassName='activeLink'
            exact
            to='/library'>
            Library
          </NavLink>
        </>
      ) : (
        props.children
      )}
    </div>
  );
};

Layout.Nav = Nav;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
