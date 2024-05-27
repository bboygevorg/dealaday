import React from "react";
import classes from "./infoUserDetails.module.scss";
import {
  Button,
  DeliveryAddress,
  Loader,
  Price,
  ResetPassword,
  Reviews,
  UserAllDate,
} from "../../../helper";
import { useAppSelector } from "../../../redux/store/hook";
import img from "../../../assets/img/product_dont_found.jpg";
import { Link } from "react-router-dom";
import { handleHover, handleMouseLeave } from "../../../helper/globalFunction";
import { getStarRaiting } from "../../../helper/star";

interface UserDetails {
  activeAccordion: number;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: (_id: string, price: number, img: string) => void;
  handleDeleteWishlist: (id: string) => void;
}

const position = {
  top: `${10}rem`,
};

const InfoUserDetails: React.FC<UserDetails> = ({
  activeAccordion,
  active,
  setActive,
  handleAddToCart,
  handleDeleteWishlist,
}) => {
  const { wishlist, status } = useAppSelector((state) => state.userSlice);
  return (
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
              <DeliveryAddress active={active} setActive={setActive} />
            </div>
          </div>
        </>
      )}
      {activeAccordion === 3 && (
        <>
          <div className={classes.content_item}>
            <div className={classes.delivery}>
              <h2>My orders</h2>
            </div>
          </div>
        </>
      )}
      {activeAccordion === 4 && (
        <>
          <div className={classes.content_item}>
            <div className={classes.delivery}>
              <h2>My rewards</h2>
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
                      onMouseEnter={() => handleHover(setActive)}
                      onMouseLeave={() => handleMouseLeave(setActive)}
                    >
                      {active && (
                        <div className={classes.addTo} style={position}>
                          <div className={classes.addTo_top}>
                            <Link to={`/products/${item.productId._id}`}>
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
                          <div>{getStarRaiting(item.productId.rating)}</div>
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
                      onClick={() => handleDeleteWishlist(item.productId._id)}
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
      {activeAccordion === 6 && (
        <div className={classes.content_item}>
          <h2>Change password</h2>

          <ResetPassword />
        </div>
      )}
    </div>
  );
};

export default InfoUserDetails;
