import React, { useEffect, useState } from "react";
import classes from "./header.module.scss";
import { useAppDisptach, useAppSelector } from "../../redux/store/hook";
import { useSelector } from "react-redux";
import { fetchWishlist } from "../../redux/userSlice/userSlice";
import { Link } from "react-router-dom";
import Search from "../../components/UI/Search/Search";

import logo from "../../assets/img/dealaday_logo.png";
import MenuMobile from "../../components/Regular/MenuMobile/MenuMobile";
import { RootState } from "../../redux/store/store";
import axios from "axios";

const Header: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const dispatch = useAppDisptach();

  const wishtlist = useAppSelector((state) => state.userSlice.wishlist);

  const cartItems = useSelector(
    (state: RootState) => state.cartSlice.cartItems
  );

  const auth = localStorage.getItem("Authorization");

  const toggleSidebar = () => {
    setToggleMenu(!toggleMenu);
  };

  const closeSlideBar = () => {
    setToggleMenu(false);
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (toggleMenu) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "visible";
      document.body.style.overflow = "visible";
    }
  }, [toggleMenu]);

  useEffect(() => {
    const handleBodyClick = (event: MouseEvent) => {
      const targetElement = event.target as Element;

      if (targetElement.closest(`.${classes.modal_overlay}`)) {
        closeSlideBar();
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [closeSlideBar]);

  return (
    <>
      <MenuMobile
        toggleMenu={toggleMenu}
        toggleSidebar={toggleSidebar}
        closeSlideBar={closeSlideBar}
      />

      <div className={`${toggleMenu ? classes.modal_overlay : ""}`}></div>

      <header className={classes.header}>
        {toggleMenu && <div className={classes.overlay_bg}></div>}
        <div className={classes.container}>
          <div className={classes.top_header}>
            <div className={classes.top_header_left}>
              <div className={classes.logo}>
                <Link to="/">
                  <img src={logo} alt="dealaday" />
                </Link>
              </div>
            </div>
            <div className={classes.top_header_middle}>
              <Search
                inputbackgroundColor="inherit"
                stroke="#E5E7EB"
                logoBackgroundColor="#1f2937"
                borderInputColor="#6b7280"
                logoBorderColor=""
                color="#d1d5db"
              />
            </div>
            <div className={classes.top_header_right}>
              <div>
                <Link
                  to="wishtlist"
                  onClick={(event) => {
                    alert("not content yet");
                    event.preventDefault();
                  }}
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.31799 2.31804C1.90012 2.7359 1.56865 3.23198 1.3425 3.77795C1.11635 4.32392 0.999954 4.90909 0.999954 5.50004C0.999954 6.09099 1.11635 6.67616 1.3425 7.22213C1.56865 7.7681 1.90012 8.26417 2.31799 8.68204L9.99999 16.364L17.682 8.68204C18.5259 7.83812 19 6.69352 19 5.50004C19 4.30656 18.5259 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3065 1.00001 12.1619 1.47412 11.318 2.31804L9.99999 3.63604L8.68199 2.31804C8.26413 1.90017 7.76805 1.5687 7.22208 1.34255C6.67611 1.1164 6.09095 1 5.49999 1C4.90904 1 4.32387 1.1164 3.7779 1.34255C3.23194 1.5687 2.73586 1.90017 2.31799 2.31804V2.31804Z"
                      stroke="#F3F4F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <div>
                <Link to={auth ? "/lk" : "/login"}>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5C12 6.06087 11.5786 7.07828 10.8284 7.82843C10.0783 8.57857 9.06087 9 8 9C6.93913 9 5.92172 8.57857 5.17157 7.82843C4.42143 7.07828 4 6.06087 4 5C4 3.93913 4.42143 2.92172 5.17157 2.17157C5.92172 1.42143 6.93913 1 8 1C9.06087 1 10.0783 1.42143 10.8284 2.17157C11.5786 2.92172 12 3.93913 12 5V5ZM8 12C6.14348 12 4.36301 12.7375 3.05025 14.0503C1.7375 15.363 1 17.1435 1 19H15C15 17.1435 14.2625 15.363 12.9497 14.0503C11.637 12.7375 9.85652 12 8 12V12Z"
                      stroke="#F3F4F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <div onClick={toggleSidebar}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2794_11692)">
                    <path
                      d="M4 6H20"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12H20"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 18H20"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2794_11692">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <Link to="basket">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 9V5C13 3.93913 12.5786 2.92172 11.8284 2.17157C11.0783 1.42143 10.0609 1 9 1C7.93913 1 6.92172 1.42143 6.17157 2.17157C5.42143 2.92172 5 3.93913 5 5V9M2 7H16L17 19H1L2 7Z"
                      stroke="#F3F4F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className={classes.quantity}>{cartItems.length}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
          <div className={classes.bottom_header}>
            <div className={classes.bottom_header_container}>
              <div>
                <Link
                  to="/"
                  onClick={(event) => {
                    alert("not content yet");
                    event.preventDefault();
                  }}
                >
                  <span>Today's Deals</span>
                </Link>
              </div>
              <div>
                <Link to="/products">
                  <span>Products</span>
                </Link>
              </div>

              <div>
                <Link
                  to="/brand"
                  onClick={(event) => {
                    alert("not content yet");
                    event.preventDefault();
                  }}
                >
                  <span>Brands</span>
                </Link>
              </div>
              <div>
                <Link
                  to="/clearance"
                  onClick={(event) => {
                    alert("not content yet");
                    event.preventDefault();
                  }}
                >
                  <span>Clearance</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
