import React, { useEffect, useState } from "react";
import classes from "./basket.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAppDisptach } from "../../redux/store/hook";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo_nav.png";
import {
  MenuMobile,
  Search,
  Button,
  IconMenu,
  CartContentName,
  Coupon,
  CartEmpty,
} from "../../helper";
import { removeToCart } from "../../redux/cartSlice/cartSlice";
import { fetchWishlist } from "../../redux/userSlice/userSlice";
import { RootState } from "../../redux/store/store";

import img_empty from "../../assets/img/product_dont_found.jpg";
import Quantity from "../../components/Regular/Quantity/Quantity";

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
      navigate("/Checkout");
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
            <CartEmpty />
          ) : (
            <>
              <div className={classes.cart_content}>
                <div className={classes.cart_content_name}>
                  <CartContentName />
                  {cart?.map((elem, index) => (
                    <React.Fragment key={index}>
                      <div className={`${classes.productInfo} ${classes.line}`}>
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
                      <div className={`${classes.quantity} ${classes.line}`}>
                        <Quantity
                          elementId={elem.productToAdd._id}
                          elementSubtotal={elem.selectedOption}
                          increment={increment}
                          decrement={decrement}
                        />
                      </div>
                      <div className={`${classes.subtotal} ${classes.line}`}>
                        ${elem.subtotal}.00
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <Coupon />
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
              {/* <div className={classes.cart_content_mobile}>
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
              </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Basket;
