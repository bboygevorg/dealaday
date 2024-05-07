import React, { useState } from "react";
import classes from "./header_basket.module.scss";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { IconMenu } from "../../../helper";
import logo from "../../../assets/img/logo_nav.png";

const Header_basket = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const toggleSidebar = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header className={classes.header}>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className={classes.container}>
        <div className={classes.top_header}>
          <div className={classes.top_header_left}>
            <div className={classes.logo}>
              <Link to="/">
                <img src={logo} alt="dealaday" />
              </Link>
            </div>
          </div>
          <div className={classes.top_header_right}>
            <IconMenu toggleSidebar={toggleSidebar} stroke="#111827" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header_basket;
