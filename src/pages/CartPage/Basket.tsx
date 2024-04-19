import React, { useEffect, useState } from "react";
import classes from "./basket.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAppDisptach } from "../../redux/store/hook";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo_nav.png";
import { MenuMobile, Search, Button, IconMenu } from "../../helper";
import { removeToCart } from "../../redux/cartSlice/cartSlice";
import { fetchWishlist } from "../../redux/userSlice/userSlice";
import { RootState } from "../../redux/store/store";

import img_empty from "../../assets/img/product_dont_found.jpg";

interface CartItem {
  selectedOption: number;
  subtotal: number;
  productToAdd: {
    _id: string;
    price: number;
    img: string;
    name: string;
  };
}

const Basket: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [count, setCount] = useState<number>(0);
  const dispatch = useAppDisptach();
  const currentYear = new Date().getFullYear();

  const cartItems = useSelector(
    (state: RootState) => state.cartSlice.cartItems
  );

  const navigate = useNavigate();

  const auth = localStorage.getItem("Authorization");

  const handleCheckout = () => {
    if (!auth) {
      navigate("/login", { state: { from: "/basket" } });
    } else {
      navigate("/");
    }
  };

  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    const parsedCartItems = storedCartItems
      ? JSON.parse(storedCartItems)
      : null;
    if (parsedCartItems) {
      setCart(parsedCartItems); // Update the cart state with the parsed cart items
    }
  }, []);

  useEffect(() => {
    dispatch(fetchWishlist());
  });

  const totalSubTotal = cart.reduce((total, item) => total + item.subtotal, 0);
  const shipping = 10;
  const total = totalSubTotal + shipping;

  // deleteProduct
  const deleteProduct = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productToAdd._id !== productId)
    );

    dispatch(removeToCart(productId));
  };
  // cart update

  const decrement = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.productToAdd._id === productId) {
            const updatedSelectedOption = Math.max(0, item.selectedOption - 1);
            const updatedSubtotal =
              updatedSelectedOption === 0
                ? 0
                : item.subtotal - item.productToAdd.price;

            // Dispatch removeToCart action if selectedOption becomes 0
            if (updatedSelectedOption === 0) {
              dispatch(removeToCart(productId));
            }

            return {
              ...item,
              selectedOption: updatedSelectedOption,
              subtotal: updatedSubtotal,
            };
          }
          return item;
        })
        .filter(
          (item) =>
            !(item.selectedOption === 0 && item.productToAdd._id === productId)
        )
    );
  };

  const increment = (productId: string) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productToAdd._id === productId) {
          const newSelectedOption = Math.min(10, item.selectedOption + 1);
          const updatedSubtotal =
            newSelectedOption === 10
              ? item.productToAdd.price * 10
              : item.subtotal + item.productToAdd.price;

          return {
            ...item,
            selectedOption: newSelectedOption,
            subtotal: updatedSubtotal,
          };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    const totalCount = cart.reduce((sum, item) => sum + item.selectedOption, 0);
    setCount(totalCount);
  }, [cart]);

  useEffect(() => {
    const cartString = JSON.stringify(cart);
    localStorage.setItem("cartItems", cartString);
  }, [cart]);

  // MenuMobile
  const toggleSidebar = () => {
    setToggleMenu(!toggleMenu);
  };

  const closeSlideBar = () => {
    setToggleMenu(false);
  };

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

      <div className={classes.homePage_search}>
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
            <span key={index}>{segment}</span>
          ))}
        </div>
      </div>

      <div className={classes.cart}>
        <div className={classes.container}>
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <div className={classes.wishlist_empty}>
              <img src={img_empty} alt="" />
            </div>
          ) : (
            <>
              <div className={classes.cart_content}>
                <div className={classes.cart_content_name}>
                  <p className={classes.text}>Product</p>
                  <p className={classes.text}>Price</p>
                  <p className={classes.text}>Quantity</p>
                  <p className={classes.text}>Subtotal</p>
                  {cart.length === 0 ? (
                    <div className={classes.wishlist_empty}>
                      <img src={img_empty} alt="" />
                    </div>
                  ) : (
                    <>
                      {cart?.map((elem, index) => (
                        <React.Fragment key={index}>
                          <div
                            className={`${classes.productInfo} ${classes.line}`}
                          >
                            <div className={classes.productInfo_image}>
                              <img
                                src={elem.productToAdd.img}
                                alt={elem.productToAdd.name}
                              />
                            </div>
                            <div className={classes.productInfo_name}>
                              <p>{elem.productToAdd.name}</p>
                              <span>
                                <svg
                                  onClick={() =>
                                    deleteProduct(elem.productToAdd._id)
                                  }
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M3.3335 5.83333H16.6668M15.8335 5.83333L15.111 15.9517C15.0811 16.3722 14.8929 16.7657 14.5844 17.053C14.2759 17.3403 13.87 17.5 13.4485 17.5H6.55183C6.13028 17.5 5.72438 17.3403 5.4159 17.053C5.10742 16.7657 4.91926 16.3722 4.88933 15.9517L4.16683 5.83333H15.8335ZM12.5002 5.83333V3.33333C12.5002 3.11232 12.4124 2.90036 12.2561 2.74408C12.0998 2.5878 11.8878 2.5 11.6668 2.5H8.3335C8.11248 2.5 7.90052 2.5878 7.74424 2.74408C7.58796 2.90036 7.50016 3.11232 7.50016 3.33333V5.83333H12.5002Z"
                                    stroke="#6B7280"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <div className={`${classes.line} ${classes.price}`}>
                            <span>${elem.productToAdd.price}.00</span>
                          </div>
                          <div
                            className={`${classes.line} ${classes.quantity}`}
                          >
                            <div
                              className={classes.number}
                              onClick={() => decrement(elem.productToAdd._id)}
                            >
                              <svg
                                width="15"
                                height="10"
                                viewBox="0 0 15 2"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.5 0.5H13.1667"
                                  stroke="#6B7280"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div className={classes.number}>
                              {elem.selectedOption}
                            </div>
                            <div
                              className={classes.number}
                              onClick={() => increment(elem.productToAdd._id)}
                            >
                              <svg
                                fill="#6B7280"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="15px"
                                viewBox="0 0 45.402 45.402"
                                xmlSpace="preserve"
                              >
                                <g>
                                  <path
                                    d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                                  />
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div
                            className={`${classes.subtotal} ${classes.line}`}
                          >
                            ${elem.subtotal}.00
                          </div>
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </div>
                <div className={classes.cart_coupon}>
                  <input
                    className={classes.coupon}
                    type="text"
                    placeholder="Coupon code"
                  />
                  <button
                    className={classes.coupon_button}
                    onClick={() => alert("not working yet")}
                  >
                    Apply Coupon
                  </button>
                </div>
                <div className={classes.cart_subtotal}>
                  <span>Subtotal</span>
                  <span>$.{totalSubTotal}.00</span>
                </div>
                <div className={classes.cart_shipping}>
                  <span>Calculate Shipping</span>
                  <span>$.{shipping}.00</span>
                </div>
                <div className={classes.cart_total}>
                  <span>Total</span>
                  <span>$.{total}.00</span>
                </div>
                <div className={classes.cart_checkout}>
                  <div className={classes.checkout_button}>
                    <Button
                      padding="1rem"
                      backgroundButton="#46a1d0"
                      color="#fff"
                      hover="blue"
                      buttonFunction={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
              <div className={classes.cart_content_mobile}>
                {cart?.map((elem, index) => (
                  <div className={classes.cart} key={index}>
                    <div className={classes.cart_top}>
                      <div className={classes.productInfo}>
                        <div className={classes.productInfo_image}>
                          <img
                            src={elem.productToAdd.img}
                            alt={elem.productToAdd.name}
                          />
                        </div>
                        <div className={classes.productInfo_name}>
                          <p>{elem.productToAdd.name}</p>
                        </div>
                      </div>

                      <div className={classes.recycle}>
                        <span>
                          <svg
                            onClick={() => deleteProduct(elem.productToAdd._id)}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M3.3335 5.83333H16.6668M15.8335 5.83333L15.111 15.9517C15.0811 16.3722 14.8929 16.7657 14.5844 17.053C14.2759 17.3403 13.87 17.5 13.4485 17.5H6.55183C6.13028 17.5 5.72438 17.3403 5.4159 17.053C5.10742 16.7657 4.91926 16.3722 4.88933 15.9517L4.16683 5.83333H15.8335ZM12.5002 5.83333V3.33333C12.5002 3.11232 12.4124 2.90036 12.2561 2.74408C12.0998 2.5878 11.8878 2.5 11.6668 2.5H8.3335C8.11248 2.5 7.90052 2.5878 7.74424 2.74408C7.58796 2.90036 7.50016 3.11232 7.50016 3.33333V5.83333H12.5002Z"
                              stroke="#6B7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className={classes.cart_bottom}>
                      <div className={classes.productInfo_quantity}>
                        <div
                          className={classes.number}
                          onClick={() => decrement(elem.productToAdd._id)}
                        >
                          <svg
                            width="15"
                            height="10"
                            viewBox="0 0 15 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.5 0.5H13.1667"
                              stroke="#6B7280"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className={classes.number}>
                          {elem.selectedOption}
                        </div>
                        <div
                          className={classes.number}
                          onClick={() => increment(elem.productToAdd._id)}
                        >
                          <svg
                            fill="#6B7280"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="15px"
                            viewBox="0 0 45.402 45.402"
                            xmlSpace="preserve"
                          >
                            <g>
                              <path
                                d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <span>$.{elem.subtotal}.00</span>
                      </div>
                    </div>
                    <div className={classes.line}></div>
                  </div>
                ))}
                <div className={classes.cart_coupon}>
                  <input
                    className={classes.coupon}
                    type="text"
                    placeholder="Coupon code"
                  />
                  <button
                    className={classes.coupon_button}
                    onClick={() => alert("not working yet")}
                  >
                    Apply Coupon
                  </button>
                </div>
                <div className={`${classes.cart_subtotal} ${classes.line}`}>
                  <span>Subtotal</span>
                  <span>$.{totalSubTotal}.00</span>
                </div>
                <div className={`${classes.cart_shipping} ${classes.line}`}>
                  <span>Calculate Shipping</span>
                  <span>$.{shipping}.00</span>
                </div>
                <div className={`${classes.cart_total} ${classes.line}`}>
                  <span>Total</span>
                  <span>$.{total}.00</span>
                </div>
                <div className={classes.cart_checkout}>
                  <div className={classes.checkout_button}>
                    <Button
                      padding="1rem"
                      backgroundButton="#46a1d0"
                      color="#fff"
                      hover="blue"
                      buttonFunction={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className={classes.footer}>
        <div className={classes.container}>
          <div>
            <p>&copy; LetsBargain {currentYear}. All Rights Reserved</p>
          </div>
          <div className={classes.pay}>
            <span>
              <svg
                width="25"
                height="11"
                viewBox="0 0 25 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.44921 1.34316C4.16382 1.69506 3.70721 1.97261 3.2506 1.93296C3.19353 1.45715 3.41707 0.95161 3.67867 0.639363C3.96406 0.277553 4.46348 0.0198252 4.86777 0C4.91533 0.49563 4.72983 0.981348 4.44921 1.34316ZM4.86297 2.02723C4.46071 2.00311 4.09366 2.1533 3.79718 2.27461C3.60639 2.35267 3.44483 2.41878 3.32191 2.41878C3.18397 2.41878 3.01574 2.34914 2.82685 2.27095L2.82685 2.27095C2.57935 2.16849 2.29638 2.05135 1.99964 2.05697C1.31948 2.06688 0.686883 2.46834 0.339669 3.10771C-0.373786 4.38643 0.15417 6.27974 0.843844 7.32056C1.18155 7.83602 1.58584 8.40103 2.11855 8.38121C2.35291 8.37199 2.5215 8.29745 2.69597 8.2203C2.89683 8.13149 3.10549 8.03922 3.43131 8.03922C3.74582 8.03922 3.94536 8.12908 4.1369 8.21534C4.31903 8.29736 4.49393 8.37613 4.75358 8.3713C5.30532 8.36138 5.65253 7.85584 5.99023 7.34039C6.35466 6.78717 6.51481 6.24725 6.53912 6.16531L6.54197 6.15583C6.54139 6.15522 6.53689 6.15308 6.52894 6.14929C6.40712 6.09117 5.47596 5.64697 5.46703 4.45582C5.45807 3.45602 6.2056 2.94946 6.32327 2.86972C6.33044 2.86487 6.33526 2.8616 6.33745 2.85989C5.86181 2.12636 5.11982 2.04706 4.86297 2.02723ZM8.68238 8.31667V0.589797H11.4649C12.9013 0.589797 13.9049 1.62071 13.9049 3.12742C13.9049 4.63414 12.8822 5.67496 11.4268 5.67496H9.83342V8.31667H8.68238ZM9.83332 1.60088H11.1603C12.1592 1.60088 12.7299 2.15599 12.7299 3.13238C12.7299 4.10877 12.1592 4.66883 11.1556 4.66883H9.83332V1.60088ZM17.7051 7.38981C17.4007 7.99447 16.7301 8.37611 16.0071 8.37611C14.9369 8.37611 14.1902 7.71197 14.1902 6.71079C14.1902 5.71953 14.9132 5.14956 16.2497 5.0653L17.6861 4.97609V4.54985C17.6861 3.9204 17.2913 3.57842 16.5874 3.57842C16.0071 3.57842 15.5838 3.89066 15.4982 4.36647H14.4613C14.4946 3.36529 15.3983 2.63672 16.6207 2.63672C17.9382 2.63672 18.7943 3.35538 18.7943 4.47055V8.31663H17.7289V7.38981H17.7051ZM16.3163 7.45923C15.7027 7.45923 15.3127 7.15194 15.3127 6.68109C15.3127 6.19538 15.6885 5.91287 16.4067 5.86826L17.6861 5.784V6.22016C17.6861 6.94378 17.0964 7.45923 16.3163 7.45923ZM22.3284 8.61901C21.867 9.97208 21.3391 10.4181 20.2166 10.4181C20.131 10.4181 19.8456 10.4082 19.779 10.3884V9.46158C19.8503 9.47149 20.0263 9.4814 20.1167 9.4814C20.6256 9.4814 20.911 9.25837 21.087 8.67848L21.1916 8.3365L19.2415 2.7111H20.4449L21.8004 7.27585H21.8242L23.1798 2.7111H24.3499L22.3284 8.61901Z"
                  fill="black"
                />
              </svg>
            </span>
            <span>
              <svg
                width="25"
                height="8"
                viewBox="0 0 25 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.75025 7.85822H4.69051L3.14596 1.79235C3.07265 1.51332 2.91699 1.26664 2.68802 1.15038C2.11659 0.858206 1.48692 0.625681 0.800003 0.508407V0.274871H4.11808C4.57603 0.274871 4.91948 0.625681 4.97673 1.0331L5.77813 5.40862L7.83686 0.274871H9.83936L6.75025 7.85822ZM10.9842 7.85822H9.03897L10.6408 0.274871H12.586L10.9842 7.85822ZM15.1027 2.37569C15.1599 1.96725 15.5034 1.73372 15.9041 1.73372C16.5338 1.67508 17.2197 1.79235 17.7921 2.08352L18.1356 0.450785C17.5631 0.217249 16.9335 0.0999756 16.362 0.0999756C14.474 0.0999756 13.1002 1.15038 13.1002 2.60821C13.1002 3.71726 14.0733 4.29958 14.7603 4.65039C15.5034 5.00019 15.7896 5.23373 15.7324 5.58353C15.7324 6.10822 15.1599 6.34176 14.5885 6.34176C13.9016 6.34176 13.2147 6.16686 12.586 5.87469L12.2426 7.50843C12.9295 7.79959 13.6726 7.91686 14.3596 7.91686C16.4765 7.97449 17.7921 6.92509 17.7921 5.34999C17.7921 3.36645 15.1027 3.25019 15.1027 2.37569ZM24.6 7.85822L23.0555 0.274871H21.3964C21.053 0.274871 20.7095 0.508407 20.595 0.858206L17.7349 7.85822H19.7374L20.1371 6.75019H22.5975L22.8265 7.85822H24.6ZM21.6826 2.31706L22.254 5.17509H20.6523L21.6826 2.31706Z"
                  fill="#172B85"
                />
              </svg>
            </span>
            <span>
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_4865_9288)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.61421 13.4483L7.83493 11.9992L7.34324 11.9873H4.9953L6.62703 1.2937C6.63212 1.26132 6.64855 1.23126 6.67255 1.20987C6.69667 1.18849 6.72741 1.17676 6.75956 1.17676H10.7185C12.033 1.17676 12.94 1.45939 13.4135 2.01734C13.6355 2.27908 13.7769 2.55267 13.8453 2.85364C13.9171 3.16951 13.9183 3.54685 13.8483 4.00715L13.8432 4.04063V4.33561L14.0652 4.46563C14.2521 4.56815 14.4008 4.68546 14.5147 4.81975C14.7046 5.04361 14.8274 5.32808 14.8793 5.66521C14.933 6.012 14.9153 6.42478 14.8274 6.89205C14.7261 7.42946 14.5624 7.89759 14.3412 8.28055C14.1378 8.63344 13.8787 8.92622 13.5709 9.15302C13.2772 9.36857 12.9282 9.53219 12.5335 9.63691C12.1511 9.7398 11.7151 9.79173 11.2368 9.79173H10.9287C10.7085 9.79173 10.4945 9.87372 10.3265 10.0207C10.158 10.1708 10.0467 10.3758 10.0125 10.6L9.98922 10.7305L9.59919 13.2848L9.58158 13.3785C9.57685 13.4082 9.56881 13.423 9.55699 13.433C9.54647 13.4422 9.53133 13.4483 9.51655 13.4483H7.61421Z"
                    fill="#28356A"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.2756 4.07458C14.2639 4.15267 14.2503 4.23246 14.2352 4.31445C13.7131 7.08509 11.9269 8.04225 9.64562 8.04225H8.48407C8.20506 8.04225 7.96991 8.25156 7.92652 8.53603L7.16338 13.5393C7.13513 13.7261 7.27439 13.8944 7.4567 13.8944H9.51688C9.76077 13.8944 9.96802 13.7112 10.0064 13.4626L10.0267 13.3544L10.4146 10.8102L10.4395 10.6707C10.4774 10.4211 10.6852 10.2378 10.9291 10.2378H11.2372C13.2331 10.2378 14.7957 9.40032 15.2524 6.97646C15.4431 5.96396 15.3444 5.11849 14.8396 4.52389C14.6868 4.34464 14.4973 4.1958 14.2756 4.07458Z"
                    fill="#298FC2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.7291 3.84968C13.6493 3.82561 13.5671 3.80386 13.4826 3.78419C13.3978 3.765 13.3109 3.74802 13.2214 3.73311C12.9082 3.68081 12.565 3.65601 12.1974 3.65601H9.0944C9.0179 3.65601 8.94531 3.67385 8.88041 3.70611C8.73724 3.77722 8.63096 3.91726 8.60518 4.0887L7.94502 8.41023L7.9261 8.53621C7.96949 8.25175 8.20464 8.04243 8.48365 8.04243H9.6452C11.9265 8.04243 13.7127 7.08479 14.2348 4.31463C14.2504 4.23264 14.2635 4.15285 14.2752 4.07477C14.1432 4.00231 14.0001 3.94035 13.8461 3.88756C13.808 3.87449 13.7688 3.8619 13.7291 3.84968Z"
                    fill="#22284F"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.60546 4.08862C8.63124 3.91718 8.73752 3.77715 8.88069 3.70652C8.94607 3.67414 9.01819 3.6563 9.09468 3.6563H12.1977C12.5653 3.6563 12.9085 3.68123 13.2217 3.73353C13.3111 3.74831 13.398 3.76542 13.4829 3.7846C13.5673 3.80415 13.6496 3.82603 13.7294 3.84998C13.769 3.8622 13.8083 3.8749 13.8467 3.88749C14.0008 3.94028 14.1439 4.00272 14.276 4.07469C14.4313 3.05082 14.2747 2.3537 13.7391 1.72245C13.1486 1.0274 12.0829 0.72998 10.7192 0.72998H6.7601C6.48156 0.72998 6.24393 0.9393 6.2009 1.22426L4.5519 12.0279C4.51939 12.2416 4.67888 12.4344 4.88742 12.4344H7.3316L8.60546 4.08862Z"
                    fill="#28356A"
                  />
                </g>
                {/* <defs>
                  <filter
                    id="filter0_d_4865_9288"
                    x="0.547684"
                    y="0.72998"
                    width="18.7952"
                    height="21.1644"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_4865_9288"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_4865_9288"
                      result="shape"
                    />
                  </filter>
                </defs> */}
              </svg>
            </span>
            <span>
              <svg
                width="30"
                height="8"
                viewBox="0 0 30 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.0954 0.5L0.914291 7.74674H4.72253L5.19464 6.59131H6.27378L6.74589 7.74674H10.9377V6.86488L11.3112 7.74674H13.4795L13.853 6.84624V7.74674H22.5708L23.6309 6.62132L24.6235 7.74674L29.1011 7.75606L25.91 4.1436L29.1011 0.5H24.6929L23.661 1.60463L22.6997 0.5H13.2159L12.4015 2.37045L11.568 0.5H7.76772V1.35186L7.34497 0.5H4.0954ZM4.83228 1.52905H6.68859L8.79862 6.44311V1.52905H10.8321L12.4619 5.0524L13.9639 1.52905H15.9873V6.72906H14.7561L14.746 2.65436L12.9511 6.72906H11.8498L10.0448 2.65436V6.72906H7.51202L7.03185 5.56329H4.43767L3.9585 6.72804H2.60146L4.83228 1.52905ZM22.1199 1.52905H17.1138V6.726H22.0424L23.631 5.00365L25.1621 6.726H26.7627L24.4363 4.14259L26.7627 1.52905H25.2316L23.6511 3.23163L22.1199 1.52905ZM5.73531 2.40886L4.88063 4.4856H6.58899L5.73531 2.40886ZM18.3499 3.55497V2.60571V2.6048H21.4736L22.8366 4.12291L21.4132 5.64932H18.3499V4.613H21.081V3.55497H18.3499Z"
                  fill="white"
                />
              </svg>
            </span>
            <span>
              <svg
                width="23"
                height="14"
                viewBox="0 0 23 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.179 11.8295C9.99493 12.8275 8.45902 13.43 6.78069 13.43C3.03582 13.43 0 10.4303 0 6.73003C0 3.02972 3.03582 0.0300293 6.78069 0.0300293C8.45902 0.0300293 9.99493 0.632527 11.179 1.63057C12.363 0.632527 13.8989 0.0300293 15.5773 0.0300293C19.3221 0.0300293 22.358 3.02972 22.358 6.73003C22.358 10.4303 19.3221 13.43 15.5773 13.43C13.8989 13.43 12.363 12.8275 11.179 11.8295Z"
                  fill="#ED0006"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.179 11.8295C12.6369 10.6006 13.5614 8.77198 13.5614 6.73003C13.5614 4.68807 12.6369 2.85947 11.179 1.63057C12.363 0.632526 13.8989 0.0300293 15.5773 0.0300293C19.3221 0.0300293 22.3579 3.02972 22.3579 6.73003C22.3579 10.4303 19.3221 13.43 15.5773 13.43C13.8989 13.43 12.363 12.8275 11.179 11.8295Z"
                  fill="#F9A000"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.179 11.8295C12.6369 10.6006 13.5614 8.77199 13.5614 6.73005C13.5614 4.68811 12.6369 2.85952 11.179 1.63062C9.72107 2.85952 8.79662 4.68811 8.79662 6.73005C8.79662 8.77199 9.72107 10.6006 11.179 11.8295Z"
                  fill="#FF5E00"
                />
              </svg>
            </span>
            <span>
              <svg
                width="20"
                height="21"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.582 10.9014L18.8075 7.48378C17.1125 6.48059 14.9937 7.73421 14.9937 9.74207V10.0927C14.9937 10.4094 15.1589 10.7025 15.4261 10.8602L16.5164 11.5054C16.8367 11.6954 17.236 11.4582 17.236 11.0797V10.2076C17.236 9.77153 17.6957 9.49901 18.0634 9.71702L23.0651 12.678C23.4328 12.896 23.4328 13.4411 23.0651 13.6576L18.0634 16.6185C17.6957 16.8366 17.236 16.5641 17.236 16.128V15.6639C17.236 13.6561 15.1172 12.401 13.4208 13.4057L7.64626 16.8233C5.95125 17.8265 5.95125 20.3367 7.64626 21.3399L13.4208 24.7575C15.1158 25.7607 17.236 24.5071 17.236 22.4992V22.1487C17.236 21.8319 17.0708 21.5402 16.8036 21.3811L15.7134 20.7345C15.393 20.5444 14.9937 20.7816 14.9937 21.1601V22.0323C14.9937 22.4683 14.534 22.7408 14.1663 22.5228L9.16458 19.5619C8.79685 19.3438 8.79685 18.7987 9.16458 18.5807L14.1663 15.6198C14.534 15.4018 14.9937 15.6743 14.9937 16.1103V16.5744C14.9937 18.5822 17.1125 19.8373 18.8075 18.8326L24.582 15.415C26.277 14.4148 26.277 11.9046 24.582 10.9014Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Basket;
