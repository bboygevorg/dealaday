import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./menuMobile.module.scss";
import { useAppSelector } from "../../../redux/store/hook";

import logo_nav from "../../../assets/img/logo_nav.png";

interface MenuMobileProps {
  toggleMenu: boolean;
  toggleSidebar: () => void;
  closeSlideBar: () => void;
}

const MenuMobile: React.FC<MenuMobileProps> = ({
  toggleMenu,
  toggleSidebar,
  closeSlideBar,
}) => {
  const handleClose = () => {
    closeSlideBar();
  };

  const { wishlist } = useAppSelector((state) => state.userSlice);

  const auth = localStorage.getItem("Authorization");
  let setProceed = auth ? true : false;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 726 && toggleMenu) {
        handleClose();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleMenu, closeSlideBar]);

  return (
    <>
      <div
        className={`${classes.menu_nav} ${
          toggleMenu ? classes.menu_nav_open : classes.menu_nav_close
        }`}
      >
        <div className={classes.menu_nav_top}>
          <div className={classes.menu_nav_top_close} onClick={toggleSidebar}>
            <div>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2794_32045)">
                  <path
                    d="M12 4.5L4 12.5"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 4.5L12 12.5"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2794_32045">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <span>Close</span>
            </div>
          </div>
          <div className={classes.menu_nav_top_logo}>
            <Link to="/">
              <img src={logo_nav} alt="lets_bargain" onClick={toggleSidebar} />
            </Link>
          </div>
        </div>
        <hr className={classes.horizonal_line} />
        <div className={classes.menu_navigate}>
          <div>
            <Link to="">
              <span>Today's Deals</span>
            </Link>
          </div>
          <div className={classes.menu_navigate_bar} onClick={toggleSidebar}>
            <Link to="/products">
              <span>Products</span>
            </Link>

            <div>
              <i className={classes.arrow_right}></i>
            </div>
          </div>
          <div className={classes.menu_navigate_bar}>
            <span>Brands</span>
            <div>
              <i className={classes.arrow_right}></i>
            </div>
          </div>
          <div>
            <Link to="">
              <span>Clearance</span>
            </Link>
          </div>
        </div>
        <hr className={classes.horizonal_line} />
        <div className={classes.menu_accaunt}>
          <div>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5C12 6.06087 11.5786 7.07828 10.8284 7.82843C10.0783 8.57857 9.06087 9 8 9C6.93913 9 5.92172 8.57857 5.17157 7.82843C4.42143 7.07828 4 6.06087 4 5C4 3.93913 4.42143 2.92172 5.17157 2.17157C5.92172 1.42143 6.93913 1 8 1C9.06087 1 10.0783 1.42143 10.8284 2.17157C11.5786 2.92172 12 3.93913 12 5V5ZM8 12C6.14348 12 4.36301 12.7375 3.05025 14.0503C1.7375 15.363 1 17.1435 1 19H15C15 17.1435 14.2625 15.363 12.9497 14.0503C11.637 12.7375 9.85652 12 8 12V12Z"
                stroke="#6c7381"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link to={auth ? "/lk" : "/login"} onClick={handleClose}>
              <span>Account</span>
            </Link>
          </div>
          <div>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.31799 2.31804C1.90012 2.7359 1.56865 3.23198 1.3425 3.77795C1.11635 4.32392 0.999954 4.90909 0.999954 5.50004C0.999954 6.09099 1.11635 6.67616 1.3425 7.22213C1.56865 7.7681 1.90012 8.26417 2.31799 8.68204L9.99999 16.364L17.682 8.68204C18.5259 7.83812 19 6.69352 19 5.50004C19 4.30656 18.5259 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3065 1.00001 12.1619 1.47412 11.318 2.31804L9.99999 3.63604L8.68199 2.31804C8.26413 1.90017 7.76805 1.5687 7.22208 1.34255C6.67611 1.1164 6.09095 1 5.49999 1C4.90904 1 4.32387 1.1164 3.7779 1.34255C3.23194 1.5687 2.73586 1.90017 2.31799 2.31804V2.31804Z"
                stroke="#6c7381"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link to={auth ? "/lk" : "/login"} onClick={handleClose}>
              <span>
                Favorinte (
                {setProceed && wishlist?.length > 0 && wishlist.length})
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuMobile;
