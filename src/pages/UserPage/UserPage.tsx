import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import classes from "./user.module.scss";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Loader,
  Price,
  Reviews,
  Search,
  DeliveryAddress,
  UserAllDate,
} from "../../helper";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDisptach } from "../../redux/store/hook";
import {
  getUserData,
  removeStateWishlist,
} from "../../redux/userSlice/userSlice";

import { deleteWishlist } from "../../redux/userSlice/userSlice";

import icon from "../../assets/img/logo_nav.png";
import { getStarRaiting } from "../../helper/star";

import img from "../../assets/img/product_dont_found.jpg";
import { addToCart } from "../../redux/cartSlice/cartSlice";

const position = {
  top: `${10}rem`,
};

const UserPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number>(1);
  const [activeSign, setActiveSign] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const { wishlist, status } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDisptach();
  const navigate = useNavigate();

  let authToken = localStorage.getItem("Authorization");
  let setProceed = authToken !== null ? true : false;

  useEffect(() => {
    if (setProceed) {
      dispatch(getUserData());
    }
  }, [dispatch]);

  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  // const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

  const toggleAccordion = (index: number) => {
    setActiveAccordion(index === activeAccordion ? index : index);
  };

  const toggleActiveSign = () => {
    setActiveSign(!activeSign);
  };

  const handleHover = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  const handleDeleteWishlist = (id: string) => {
    dispatch(deleteWishlist(id));
    dispatch(removeStateWishlist(id));
  };

  const handleLogOut = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("lastActivity");
    toast.success("Logout Successfully", {
      autoClose: 500,
      theme: "colored",
    });
    navigate("/");
    // dispatch(getUserData({}));
  };

  const handleAddToCart = (_id: string, price: number, img: string) => {
    const productToAdd = { _id, price, img };
    const selectedOption = 1;
    const subtotal = price * selectedOption;

    dispatch(
      addToCart({
        productToAdd,
        selectedOption,
        subtotal,
      })
    );
  };

  return (
    <div>
      <Helmet>
        <title>Accaunt</title>
      </Helmet>

      <div className={classes.product_search}>
        <Search
          stroke="#3598cc"
          inputbackgroundColor=""
          borderInputColor="#d1d5db"
          logoBackgroundColor="#f9fafb"
          logoBorderColor="#d1d5db"
          color=""
        />
      </div>

      <div className="navigate">
        <div className="container">
          <Link to="/">
            <span>Home</span>
          </Link>

          <span>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1L6.5 6L1.5 11"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {pathSegments.map((segment, index) => (
            <span key={index}>My Accaunt</span>
          ))}
        </div>
      </div>

      <div
        className={
          activeSign ? classes.popupBackGround_active : classes.popupBackGround
        }
      >
        <div className={classes.popup}>
          <div className={classes.popup_icon}>
            <img src={icon} alt="dealAday" />
          </div>
          <h4>Are you sure?</h4>
          <div className={classes.button}>
            <div>
              <Button
                backgroundButton="#3598cc"
                padding="0.9rem 1.2rem"
                color="#ffffff"
                hover="blue"
                buttonFunction={handleLogOut}
              >
                Sign out
              </Button>
            </div>
            <div>
              <Button
                backgroundButton="red"
                padding="0.9rem 1.2rem"
                color="#ffffff"
                hover=""
                buttonFunction={() => setActiveSign(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader width="100%" />
      ) : (
        <div className={classes.accaunt}>
          <div className={classes.wrapper}>
            <div className={classes.info_bar}>
              <div
                className={`${
                  activeAccordion === 1
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(1)}
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4.00004H3C2.46957 4.00004 1.96086 4.21075 1.58579 4.58583C1.21071 4.9609 1 5.46961 1 6.00004V17C1 17.5305 1.21071 18.0392 1.58579 18.4143C1.96086 18.7893 2.46957 19 3 19H14C14.5304 19 15.0391 18.7893 15.4142 18.4143C15.7893 18.0392 16 17.5305 16 17V12M14.586 2.58604C14.7705 2.39502 14.9912 2.24266 15.2352 2.13784C15.4792 2.03302 15.7416 1.97785 16.0072 1.97554C16.2728 1.97323 16.5361 2.02384 16.7819 2.1244C17.0277 2.22496 17.251 2.37346 17.4388 2.56125C17.6266 2.74904 17.7751 2.97234 17.8756 3.21813C17.9762 3.46392 18.0268 3.72728 18.0245 3.99284C18.0222 4.2584 17.967 4.52084 17.8622 4.76485C17.7574 5.00886 17.605 5.22955 17.414 5.41404L8.828 14H6V11.172L14.586 2.58604Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My Profile</span>
              </div>
              <div
                className={`${
                  activeAccordion === 2
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(2)}
              >
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9C13.2284 21.0857 13.0081 21.233 12.7656 21.3336C12.523 21.4341 12.2631 21.4859 12.0005 21.4859C11.738 21.4859 11.478 21.4341 11.2354 21.3336C10.9929 21.233 10.7726 21.0857 10.587 20.9L6.343 16.657C5.22422 15.5381 4.46234 14.1127 4.15369 12.5608C3.84504 11.009 4.00349 9.40047 4.60901 7.93868C5.21452 6.4769 6.2399 5.22749 7.55548 4.34846C8.87107 3.46943 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46943 16.4445 4.34846C17.7601 5.22749 18.7855 6.4769 19.391 7.93868C19.9965 9.40047 20.155 11.009 19.8463 12.5608C19.5377 14.1127 18.7758 15.5381 17.657 16.657V16.657Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2044 14.6839 9.44129 14.1213 8.87868C13.5587 8.31607 12.7956 8 12 8C11.2044 8 10.4413 8.31607 9.87868 8.87868C9.31607 9.44129 9 10.2044 9 11C9 11.7956 9.31607 12.5587 9.87868 13.1213C10.4413 13.6839 11.2044 14 12 14C12.7956 14 13.5587 13.6839 14.1213 13.1213Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Delivery Address</span>
              </div>
              <div
                className={`${
                  activeAccordion === 3
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(3)}
              >
                <span>
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 5L9 1L1 5M17 5L9 9M17 5V15L9 19M1 5L9 9M1 5V15L9 19M9 9V19"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My Orders</span>
              </div>
              <div
                className={`${
                  activeAccordion === 4
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(4)}
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 6V19M10 6V4C10 3.60444 10.1173 3.21776 10.3371 2.88886C10.5568 2.55996 10.8692 2.30362 11.2346 2.15224C11.6001 2.00087 12.0022 1.96126 12.3902 2.03843C12.7781 2.1156 13.1345 2.30608 13.4142 2.58579C13.6939 2.86549 13.8844 3.22186 13.9616 3.60982C14.0387 3.99778 13.9991 4.39992 13.8478 4.76537C13.6964 5.13082 13.44 5.44318 13.1111 5.66294C12.7822 5.8827 12.3956 6 12 6H10ZM10 6V3.5C10 3.00555 9.85338 2.5222 9.57867 2.11108C9.30397 1.69995 8.91352 1.37952 8.45671 1.1903C7.99989 1.00108 7.49723 0.951575 7.01227 1.04804C6.52732 1.1445 6.08186 1.3826 5.73223 1.73223C5.3826 2.08187 5.1445 2.52732 5.04804 3.01228C4.95157 3.49723 5.00108 3.99989 5.1903 4.45671C5.37952 4.91352 5.69995 5.30397 6.11107 5.57867C6.5222 5.85338 7.00555 6 7.5 6H10ZM3 10H17M3 10C2.46957 10 1.96086 9.78929 1.58579 9.41421C1.21071 9.03914 1 8.53043 1 8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21072 2.46957 6 3 6H17C17.5304 6 18.0391 6.21072 18.4142 6.58579C18.7893 6.96086 19 7.46957 19 8C19 8.53043 18.7893 9.03914 18.4142 9.41421C18.0391 9.78929 17.5304 10 17 10M3 10V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V10"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My reawards</span>
              </div>
              <div
                className={`${
                  activeAccordion === 5
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(5)}
              >
                <span>
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.31799 2.31804C1.90012 2.7359 1.56865 3.23198 1.3425 3.77795C1.11635 4.32392 0.999954 4.90909 0.999954 5.50004C0.999954 6.09099 1.11635 6.67616 1.3425 7.22213C1.56865 7.7681 1.90012 8.26417 2.31799 8.68204L9.99999 16.364L17.682 8.68204C18.5259 7.83812 19 6.69352 19 5.50004C19 4.30656 18.5259 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3065 1.00001 12.1619 1.47412 11.318 2.31804L9.99999 3.63604L8.68199 2.31804C8.26413 1.90017 7.76805 1.5687 7.22208 1.34255C6.67611 1.1164 6.09095 1 5.49999 1C4.90904 1 4.32387 1.1164 3.7779 1.34255C3.23194 1.5687 2.73586 1.90017 2.31799 2.31804V2.31804Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Wishlist</span>
              </div>
              <div
                className={`${
                  activeAccordion === 6
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(6)}
              >
                <span>
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 13V15M3 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V11C17 10.4696 16.7893 9.96086 16.4142 9.58579C16.0391 9.21071 15.5304 9 15 9H3C2.46957 9 1.96086 9.21071 1.58579 9.58579C1.21071 9.96086 1 10.4696 1 11V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19ZM13 9V5C13 3.93913 12.5786 2.92172 11.8284 2.17157C11.0783 1.42143 10.0609 1 9 1C7.93913 1 6.92172 1.42143 6.17157 2.17157C5.42143 2.92172 5 3.93913 5 5V9H13Z"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Change password</span>
              </div>
              <div className={classes.line}></div>
              <div className={classes.sign_out} onClick={toggleActiveSign}>
                <span>
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 13L19 9M19 9L15 5M19 9H5M11 13V14C11 14.7956 10.6839 15.5587 10.1213 16.1213C9.55871 16.6839 8.79565 17 8 17H4C3.20435 17 2.44129 16.6839 1.87868 16.1213C1.31607 15.5587 1 14.7956 1 14V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1H8C8.79565 1 9.55871 1.31607 10.1213 1.87868C10.6839 2.44129 11 3.20435 11 4V5"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Sign Out</span>
              </div>
            </div>

            <div className={classes.info_bar_mobile}>
              <div>
                <svg
                  className={
                    activeAccordion === 1
                      ? classes.active
                      : classes.accordion_item
                  }
                  onClick={() => toggleAccordion(1)}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4.00004H3C2.46957 4.00004 1.96086 4.21075 1.58579 4.58583C1.21071 4.9609 1 5.46961 1 6.00004V17C1 17.5305 1.21071 18.0392 1.58579 18.4143C1.96086 18.7893 2.46957 19 3 19H14C14.5304 19 15.0391 18.7893 15.4142 18.4143C15.7893 18.0392 16 17.5305 16 17V12M14.586 2.58604C14.7705 2.39502 14.9912 2.24266 15.2352 2.13784C15.4792 2.03302 15.7416 1.97785 16.0072 1.97554C16.2728 1.97323 16.5361 2.02384 16.7819 2.1244C17.0277 2.22496 17.251 2.37346 17.4388 2.56125C17.6266 2.74904 17.7751 2.97234 17.8756 3.21813C17.9762 3.46392 18.0268 3.72728 18.0245 3.99284C18.0222 4.2584 17.967 4.52084 17.8622 4.76485C17.7574 5.00886 17.605 5.22955 17.414 5.41404L8.828 14H6V11.172L14.586 2.58604Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={activeAccordion === 1 ? classes.span_active : ""}
                ></span>
              </div>
              <div>
                <svg
                  className={
                    activeAccordion === 2
                      ? classes.active
                      : classes.accordion_item
                  }
                  onClick={() => toggleAccordion(2)}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.657 16.657L13.414 20.9C13.2284 21.0857 13.0081 21.233 12.7656 21.3336C12.523 21.4341 12.2631 21.4859 12.0005 21.4859C11.738 21.4859 11.478 21.4341 11.2354 21.3336C10.9929 21.233 10.7726 21.0857 10.587 20.9L6.343 16.657C5.22422 15.5381 4.46234 14.1127 4.15369 12.5608C3.84504 11.009 4.00349 9.40047 4.60901 7.93868C5.21452 6.4769 6.2399 5.22749 7.55548 4.34846C8.87107 3.46943 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46943 16.4445 4.34846C17.7601 5.22749 18.7855 6.4769 19.391 7.93868C19.9965 9.40047 20.155 11.009 19.8463 12.5608C19.5377 14.1127 18.7758 15.5381 17.657 16.657V16.657Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2044 14.6839 9.44129 14.1213 8.87868C13.5587 8.31607 12.7956 8 12 8C11.2044 8 10.4413 8.31607 9.87868 8.87868C9.31607 9.44129 9 10.2044 9 11C9 11.7956 9.31607 12.5587 9.87868 13.1213C10.4413 13.6839 11.2044 14 12 14C12.7956 14 13.5587 13.6839 14.1213 13.1213Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <span></span>
                </svg>
                <span
                  className={activeAccordion === 2 ? classes.span_active : ""}
                ></span>
              </div>
              <div>
                <svg
                  className={
                    activeAccordion === 3
                      ? classes.active
                      : classes.accordion_item
                  }
                  onClick={() => toggleAccordion(3)}
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 5L9 1L1 5M17 5L9 9M17 5V15L9 19M1 5L9 9M1 5V15L9 19M9 9V19"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={activeAccordion === 3 ? classes.span_active : ""}
                ></span>
              </div>
              <div>
                <svg
                  className={
                    activeAccordion === 4
                      ? classes.active
                      : classes.accordion_item
                  }
                  onClick={() => toggleAccordion(4)}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 6V19M10 6V4C10 3.60444 10.1173 3.21776 10.3371 2.88886C10.5568 2.55996 10.8692 2.30362 11.2346 2.15224C11.6001 2.00087 12.0022 1.96126 12.3902 2.03843C12.7781 2.1156 13.1345 2.30608 13.4142 2.58579C13.6939 2.86549 13.8844 3.22186 13.9616 3.60982C14.0387 3.99778 13.9991 4.39992 13.8478 4.76537C13.6964 5.13082 13.44 5.44318 13.1111 5.66294C12.7822 5.8827 12.3956 6 12 6H10ZM10 6V3.5C10 3.00555 9.85338 2.5222 9.57867 2.11108C9.30397 1.69995 8.91352 1.37952 8.45671 1.1903C7.99989 1.00108 7.49723 0.951575 7.01227 1.04804C6.52732 1.1445 6.08186 1.3826 5.73223 1.73223C5.3826 2.08187 5.1445 2.52732 5.04804 3.01228C4.95157 3.49723 5.00108 3.99989 5.1903 4.45671C5.37952 4.91352 5.69995 5.30397 6.11107 5.57867C6.5222 5.85338 7.00555 6 7.5 6H10ZM3 10H17M3 10C2.46957 10 1.96086 9.78929 1.58579 9.41421C1.21071 9.03914 1 8.53043 1 8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21072 2.46957 6 3 6H17C17.5304 6 18.0391 6.21072 18.4142 6.58579C18.7893 6.96086 19 7.46957 19 8C19 8.53043 18.7893 9.03914 18.4142 9.41421C18.0391 9.78929 17.5304 10 17 10M3 10V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V10"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={activeAccordion === 4 ? classes.span_active : ""}
                ></span>
              </div>
              <div>
                <svg
                  className={
                    activeAccordion === 5
                      ? classes.active
                      : classes.accordion_item
                  }
                  onClick={() => toggleAccordion(5)}
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.31799 2.31804C1.90012 2.7359 1.56865 3.23198 1.3425 3.77795C1.11635 4.32392 0.999954 4.90909 0.999954 5.50004C0.999954 6.09099 1.11635 6.67616 1.3425 7.22213C1.56865 7.7681 1.90012 8.26417 2.31799 8.68204L9.99999 16.364L17.682 8.68204C18.5259 7.83812 19 6.69352 19 5.50004C19 4.30656 18.5259 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3065 1.00001 12.1619 1.47412 11.318 2.31804L9.99999 3.63604L8.68199 2.31804C8.26413 1.90017 7.76805 1.5687 7.22208 1.34255C6.67611 1.1164 6.09095 1 5.49999 1C4.90904 1 4.32387 1.1164 3.7779 1.34255C3.23194 1.5687 2.73586 1.90017 2.31799 2.31804V2.31804Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={activeAccordion === 5 ? classes.span_active : ""}
                ></span>
              </div>
              <div>
                <svg
                  className={
                    activeAccordion === 6
                      ? classes.active
                      : classes.accordion_item
                  }
                  onClick={() => toggleAccordion(6)}
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 13V15M3 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V11C17 10.4696 16.7893 9.96086 16.4142 9.58579C16.0391 9.21071 15.5304 9 15 9H3C2.46957 9 1.96086 9.21071 1.58579 9.58579C1.21071 9.96086 1 10.4696 1 11V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19ZM13 9V5C13 3.93913 12.5786 2.92172 11.8284 2.17157C11.0783 1.42143 10.0609 1 9 1C7.93913 1 6.92172 1.42143 6.17157 2.17157C5.42143 2.92172 5 3.93913 5 5V9H13Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={activeAccordion === 6 ? classes.span_active : ""}
                ></span>
              </div>
              <div>
                <svg
                  className={
                    activeAccordion === 7
                      ? classes.active
                      : classes.accordion_item
                  }
                  onClick={() => {
                    toggleAccordion(7);
                    toggleActiveSign();
                  }}
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 13L19 9M19 9L15 5M19 9H5M11 13V14C11 14.7956 10.6839 15.5587 10.1213 16.1213C9.55871 16.6839 8.79565 17 8 17H4C3.20435 17 2.44129 16.6839 1.87868 16.1213C1.31607 15.5587 1 14.7956 1 14V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1H8C8.79565 1 9.55871 1.31607 10.1213 1.87868C10.6839 2.44129 11 3.20435 11 4V5"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={activeAccordion === 7 ? classes.span_active : ""}
                ></span>
              </div>
            </div>

            <div className={classes.info_user}>
              {activeAccordion === 1 && (
                <div className={classes.content_item}>
                  <h2>My Profile</h2>

                  {status === "loading" ? (
                    <Loader width={"100%"} />
                  ) : (
                    <div className={classes.profile}>
                      <UserAllDate />
                    </div>
                  )}
                </div>
              )}

              {activeAccordion === 2 && (
                <>
                  <div className={classes.content_item}>
                    <div className={classes.delivery}>
                      <h2>Delivery Address</h2>
                      <span onClick={() => setActive(!active)}>
                        <p style={{ fontSize: "1.8rem" }}>+</p> Add New Address
                      </span>
                    </div>

                    <div className={classes.delivery_address}>
                      <DeliveryAddress active={active} />
                    </div>
                  </div>
                </>
              )}
              {activeAccordion === 5 && (
                <div className={classes.content_item}>
                  <h2>Wishlist</h2>

                  {wishlist.length === 0 ? (
                    <div className={classes.wishlist_empty}>
                      <img src={img} alt="" />
                    </div>
                  ) : (
                    <div className={classes.wishlist}>
                      {wishlist?.map((item, index) => (
                        <React.Fragment key={index}>
                          <div>
                            <div
                              className={classes.product_cart}
                              onMouseEnter={handleHover}
                              onMouseLeave={handleMouseLeave}
                            >
                              {active && (
                                <div className={classes.addTo} style={position}>
                                  <div className={classes.addTo_top}>
                                    <Link
                                      to={`/products/${item.productId._id}`}
                                    >
                                      <div className={classes.watch}>
                                        <svg
                                          width="25"
                                          height="25"
                                          viewBox="0 0 25 25"
                                          fill=""
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.28 11.5682C11.5842 11.5682 11.0202 12.1279 11.0202 12.8182C11.0202 13.5086 11.5842 14.0682 12.28 14.0682C12.9758 14.0682 13.5399 13.5086 13.5399 12.8182C13.5399 12.1279 12.9758 11.5682 12.28 11.5682ZM9.50842 12.8182C9.50842 11.2995 10.7493 10.0682 12.28 10.0682C13.8107 10.0682 15.0516 11.2995 15.0516 12.8182C15.0516 14.337 13.8107 15.5682 12.28 15.5682C10.7493 15.5682 9.50842 14.337 9.50842 12.8182Z"
                                            fill=""
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.07656 12.8182C5.63933 17.0859 8.71352 19.0682 12.28 19.0682C15.8465 19.0682 18.9207 17.0859 21.4835 12.8182C18.9207 8.55055 15.8465 6.56824 12.28 6.56824C8.71352 6.56824 5.63933 8.55055 3.07656 12.8182ZM1.54516 12.4461C4.31508 7.63681 7.88575 5.06824 12.28 5.06824C16.6743 5.06824 20.245 7.63681 23.0149 12.4461C23.1477 12.6767 23.1477 12.9598 23.0149 13.1904C20.245 17.9997 16.6743 20.5682 12.28 20.5682C7.88575 20.5682 4.31508 17.9997 1.54516 13.1904C1.41236 12.9598 1.41236 12.6767 1.54516 12.4461Z"
                                            fill=""
                                          />
                                        </svg>
                                      </div>
                                    </Link>
                                  </div>
                                  <div className={classes.addTo_bottom}>
                                    <Button
                                      color="#ffffff"
                                      backgroundButton="#3598cc"
                                      padding="0.5rem 0.8rem"
                                      hover="blue"
                                      buttonFunction={() =>
                                        handleAddToCart(
                                          item.productId._id,
                                          item.productId.price,
                                          item.productId.img
                                        )
                                      }
                                    >
                                      Add to cart
                                    </Button>
                                  </div>
                                </div>
                              )}
                              <div className={classes.product_cart_picture}>
                                <img src={item.productId.img} alt="" />
                              </div>
                              <div className={classes.product_cart_info}>
                                <p className={classes.product_cart_info_text}>
                                  {item.productId.title}
                                </p>
                                <div className={classes.product_cart_info_text}>
                                  <div>
                                    {getStarRaiting(item.productId.rating)}
                                  </div>
                                  <span className={classes.review}>
                                    <Reviews />
                                  </span>
                                </div>
                                <div className={classes.oneCart_info_delivery}>
                                  <div>
                                    <svg
                                      width="20"
                                      height="21"
                                      viewBox="0 0 20 21"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.83329 13.5227C5.18896 13.5227 4.66663 14.0451 4.66663 14.6894C4.66663 15.3337 5.18896 15.8561 5.83329 15.8561C6.47762 15.8561 6.99996 15.3337 6.99996 14.6894C6.99996 14.0451 6.47762 13.5227 5.83329 13.5227ZM3.66663 14.6894C3.66663 13.4928 4.63668 12.5227 5.83329 12.5227C7.02991 12.5227 7.99996 13.4928 7.99996 14.6894C7.99996 15.886 7.02991 16.8561 5.83329 16.8561C4.63668 16.8561 3.66663 15.886 3.66663 14.6894Z"
                                        fill="#6B7280"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M14.1667 13.5227C13.5223 13.5227 13 14.0451 13 14.6894C13 15.3337 13.5223 15.8561 14.1667 15.8561C14.811 15.8561 15.3333 15.3337 15.3333 14.6894C15.3333 14.0451 14.811 13.5227 14.1667 13.5227ZM12 14.6894C12 13.4928 12.97 12.5227 14.1667 12.5227C15.3633 12.5227 16.3333 13.4928 16.3333 14.6894C16.3333 15.886 15.3633 16.8561 14.1667 16.8561C12.97 16.8561 12 15.886 12 14.6894Z"
                                        fill="#6B7280"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M3.33333 5.18941C3.24493 5.18941 3.16014 5.22453 3.09763 5.28704C3.03512 5.34955 3 5.43434 3 5.52274V14.1894H4.16667C4.44281 14.1894 4.66667 14.4133 4.66667 14.6894C4.66667 14.9655 4.44281 15.1894 4.16667 15.1894H2.5C2.22386 15.1894 2 14.9655 2 14.6894V5.52274C2 5.16912 2.14048 4.82998 2.39052 4.57993C2.64057 4.32988 2.97971 4.18941 3.33333 4.18941H10.8333C11.1095 4.18941 11.3333 4.41326 11.3333 4.68941V5.02274H15C15.1756 5.02274 15.3384 5.11489 15.4287 5.26549L17.9287 9.43216C17.9754 9.50987 18 9.59879 18 9.68941V14.6894C18 14.9655 17.7761 15.1894 17.5 15.1894H15.8333C15.5572 15.1894 15.3333 14.9655 15.3333 14.6894C15.3333 14.4133 15.5572 14.1894 15.8333 14.1894H17V10.1894H11.3333V14.1894H12.5C12.7761 14.1894 13 14.4133 13 14.6894C13 14.9655 12.7761 15.1894 12.5 15.1894H7.5C7.22386 15.1894 7 14.9655 7 14.6894C7 14.4133 7.22386 14.1894 7.5 14.1894H10.3333V5.18941H3.33333ZM11.3333 6.02274V9.18941H16.6169L14.7169 6.02274H11.3333Z"
                                        fill="#6B7280"
                                      />
                                    </svg>
                                  </div>
                                  <span className={classes.delivery_info}>
                                    2-3 day(s)
                                  </span>
                                </div>
                                <Price
                                  price={item.productId.price}
                                  price_previous={item.productId.price_previous}
                                  margin="right"
                                />
                              </div>
                            </div>
                            <button
                              className={classes.wishlist_button}
                              onClick={() =>
                                handleDeleteWishlist(item.productId._id)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
