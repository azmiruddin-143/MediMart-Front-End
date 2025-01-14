import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
             <Link to={'/dashboard'} ><h1>Footer</h1></Link>
        </div>
    );
};

export default Footer;