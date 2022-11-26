import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
    return (
        <div className="header bg-light">

            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
                <Link className="navbar-brand d-flex mt-1" to="/" onClick={() => window.scrollTo({ top: 0 })}>
                    <h4 className='text-uppercase font-weight-bold  ' style={{ fontFamily: "Dancing Script" }}>Tin Tin</h4>
                </Link>
                <Search></Search>
                <Menu></Menu>
            </nav>
        </div>
    );
};

export default Header;