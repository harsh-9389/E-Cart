import React from "react";
// import About from './../../pages/About';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All Rights Reserved &copy; Harsh</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> |{" "}
        <Link to="/privacy">Privacy</Link>
      </p>
    </div>
  );
};

export default Footer;
