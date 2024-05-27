import React, { useEffect, useState } from "react";
import classes from "./header.module.scss";
import { useAppDisptach, useAppSelector } from "../../../redux/store/hook";
import { fetchWishlist } from "../../../redux/userSlice/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "../../../components/UI/Search/Search";
import logo from "../../../assets/img/dealaday_logo.png";
import MenuMobile from "../../../components/Regular/MenuMobile/MenuMobile";
import { IconMenu } from "../../../helper";
import { toggleSideBar, closeSlideBar } from "../../../helper/globalFunction";

const Header: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const dispatch = useAppDisptach();

  if (from && from.pathname === "/lk") {
    console.log("User navigated from basket page");
  }

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
        closeSlideBar(setToggleMenu);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [closeSlideBar]);

  // const checkTokenExpriration = () => {
  //   const tokenExpiration = localStorage.getItem("tokenExpiration");

  //   if (tokenExpiration) {
  //     const currentTime = new Date().getTime();

  //     if (parseInt(tokenExpiration) < currentTime) {
  //       localStorage.removeItem("Authorization");
  //       localStorage.removeItem("tokenExpiraton");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   checkTokenExpriration();
  // }, []);

  return (
    <>
      <MenuMobile
        toggleMenu={toggleMenu}
        toggleSidebar={() => toggleSideBar(toggleMenu, setToggleMenu)}
        closeSlideBar={() => closeSlideBar(setToggleMenu)}
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
              <IconMenu
                toggleSidebar={() => toggleSideBar(toggleMenu, setToggleMenu)}
                stroke="#F3F4F6"
              />
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
