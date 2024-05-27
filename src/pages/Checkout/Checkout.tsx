import React, { useEffect, useState } from "react";
import classes from "./cehckout.module.scss";
import { useAppSelector, useAppDisptach } from "../../redux/store/hook";
import { getUserData } from "../../redux/userSlice/userSlice";
import { Link } from "react-router-dom";

import visa from "../../assets/payment/visa-logo.png";
import master from "../../assets/payment/Mastercard.png";
import amex from "../../assets/payment/Amex.png";

const Checkout = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    deliveryAddress: "",
  });
  const [activePayment, setActivePayment] = useState(false);

  const { getUser } = useAppSelector((state) => state.userSlice);

  const productString = localStorage.getItem("cartItems") as string;
  const productObject = JSON.parse(productString);
  console.log(productObject);

  const totalSubTotal = productObject.reduce(
    (total: any, item: { subtotal: any }) => total + item.subtotal,
    0
  );
  console.log(totalSubTotal);
  const shipping = 10;
  const total = totalSubTotal + shipping;

  console.log(productObject);

  // const decrement = (productId: string) => {
  //   setCart((prevCart) =>
  //     prevCart
  //       .map((item) => {
  //         if (item.productToAdd._id === productId) {
  //           const updatedSelectedOption = Math.max(0, item.selectedOption - 1);
  //           const updatedSubtotal =
  //             updatedSelectedOption === 0
  //               ? 0
  //               : item.subtotal - item.productToAdd.price;

  //           // Dispatch removeToCart action if selectedOption becomes 0
  //           if (updatedSelectedOption === 0) {
  //             dispatch(removeToCart(productId));
  //           }

  //           return {
  //             ...item,
  //             selectedOption: updatedSelectedOption,
  //             subtotal: updatedSubtotal,
  //           };
  //         }
  //         return item;
  //       })
  //       .filter(
  //         (item) =>
  //           !(item.selectedOption === 0 && item.productToAdd._id === productId)
  //       )
  //   );
  // };

  // const increment = (productId: string) => {
  //   setCart((prevCart) => {
  //     return prevCart.map((item) => {
  //       if (item.productToAdd._id === productId) {
  //         const newSelectedOption = Math.min(10, item.selectedOption + 1);
  //         const updatedSubtotal =
  //           newSelectedOption === 10
  //             ? item.productToAdd.price * 10
  //             : item.subtotal + item.productToAdd.price;

  //         return {
  //           ...item,
  //           selectedOption: newSelectedOption,
  //           subtotal: updatedSubtotal,
  //         };
  //       }
  //       return item;
  //     });
  //   });
  // };

  const dispatch = useAppDisptach();

  const handleActive = () => {
    setActivePayment(!activePayment);
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (getUser) {
      setUserDetails({
        email: getUser.email || "",
        phone: getUser.phone || "",
        firstName: getUser.firstName || "",
        lastName: getUser.lastName || "",
        deliveryAddress: getUser.default || "",
      });
    }
  }, [getUser]);

  return (
    <div className={classes.checkout}>
      <div className={classes.container}>
        <h2>Checkout</h2>
        <div className={classes.checkout_info}>
          <div className={classes.left_block}>
            <div className={classes.top_block}>
              <h3>Contact information</h3>
              <form>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Email</span>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={userDetails.email}
                    readOnly
                  />
                </div>
                <div
                  style={{ display: "flex", marginTop: "1rem", gap: "2rem" }}
                >
                  <div>
                    <span>First Name</span>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={userDetails.firstName}
                      readOnly
                    />
                  </div>
                  <div>
                    <span>Last Name</span>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={userDetails.lastName}
                      readOnly
                    />
                  </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <span>Contact number</span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Contact number"
                    value={userDetails.phone}
                    readOnly
                  />
                </div>
                {!userDetails.email &&
                userDetails.firstName &&
                userDetails.lastName &&
                userDetails.phone ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <span>Fill in your details here</span>
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginLeft: "0.5rem" }}
                    >
                      <path
                        d="M4 12H20M20 12L16 8M20 12L16 16"
                        stroke="#26aadb"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <Link to="/lk">
                      <span style={{ color: "#26aadb", marginLeft: "0.5rem" }}>
                        Here
                      </span>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </form>
            </div>
            <div className={classes.middle_block}>
              <h3>Delivery address</h3>
              <form style={{ display: "flex", flexDirection: "column" }}>
                <span>Address</span>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={userDetails.deliveryAddress}
                  readOnly
                />
              </form>
            </div>
            <div className={classes.bottom_block}>
              <h3>Payment Details</h3>
              <span className={classes.save_details}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2794_17891)">
                    <path
                      d="M11.334 7.33331H4.66732C3.93094 7.33331 3.33398 7.93027 3.33398 8.66665V12.6666C3.33398 13.403 3.93094 14 4.66732 14H11.334C12.0704 14 12.6673 13.403 12.6673 12.6666V8.66665C12.6673 7.93027 12.0704 7.33331 11.334 7.33331Z"
                      stroke="#6B7280"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.00065 11.3333C8.36884 11.3333 8.66732 11.0349 8.66732 10.6667C8.66732 10.2985 8.36884 10 8.00065 10C7.63246 10 7.33398 10.2985 7.33398 10.6667C7.33398 11.0349 7.63246 11.3333 8.00065 11.3333Z"
                      stroke="#6B7280"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.33398 7.33333V4.66667C5.33398 3.95942 5.61494 3.28115 6.11503 2.78105C6.61513 2.28095 7.29341 2 8.00065 2C8.7079 2 9.38617 2.28095 9.88627 2.78105C10.3864 3.28115 10.6673 3.95942 10.6673 4.66667V7.33333"
                      stroke="#6B7280"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2794_17891">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                This is a secure and SSL encrypted payment. Your credit card
                details are safe.
              </span>

              <div
                className={
                  activePayment ? classes.payment_active : classes.payment
                }
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        className={classes.style_checkbox}
                      />
                      <span
                        className={classes.check_box}
                        onClick={handleActive}
                      ></span>
                    </label>

                    <img src={visa} alt="" />
                    <img src={master} alt="" />
                    <img src={amex} alt="" />
                  </div>
                  <div
                    className={
                      activePayment
                        ? classes.info_block_active
                        : classes.info_block
                    }
                  >
                    <div className={classes.info}>
                      <span>Card number</span>
                      <input type="text" placeholder="Enter card number" />
                    </div>
                    <div className={classes.info_bottom}>
                      <div>
                        {" "}
                        <span>Expiration Date</span>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div>
                        <span>CVC</span>
                        <input type="text" placeholder="CVC" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.right_block}>
            <div className={classes.top_block}>
              <div className={classes.top_block_product}>
                {productObject?.map((item: any, index: number) => {
                  return (
                    <>
                      <div key={index} className={classes.product}>
                        <div className={classes.product_info}>
                          <div className={classes.image}>
                            <img src={item.productToAdd.img} alt="" />
                          </div>
                          <div className={classes.product_info_name}>
                            <span>{item.productToAdd.name}</span>
                          </div>
                        </div>
                        <div className={classes.product_count}>
                          <div
                            className={classes.number}
                            onClick={() => decrement(item.productToAdd._id)}
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
                            {item.selectedOption}
                          </div>
                          <div
                            className={classes.number}
                            onClick={() => increment(item.productToAdd._id)}
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
                          <div className={classes.recycle}>
                            <span>
                              <svg
                                // onClick={() =>
                                //   deleteProduct(item.productToAdd._id)
                                // }
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
                        <div className={classes.product_price}>
                          <div>$.{item.productToAdd.price}.00</div>
                        </div>
                      </div>
                      <div className={classes.line}></div>
                    </>
                  );
                })}
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
              <div className={`${classes.cart_subtotal} ${classes.line}`}>
                <span>Subtotal</span>
                <span>$.{totalSubTotal}.00</span>
              </div>
              <div className={`${classes.cart_shipping} ${classes.line}`}>
                <span>Calculate Shipping</span>
                <span>$.10.00</span>
              </div>
              <div className={`${classes.cart_total} ${classes.line}`}>
                <span>Total</span>
                <span>$.{total}.00</span>
              </div>
            </div>
            <div className={classes.bottom_block}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
