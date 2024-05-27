import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classes from "./user.module.scss";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Loader,
  Search,
  InfoBarUser,
  InfoUserDetails,
} from "../../helper";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDisptach } from "../../redux/store/hook";

import {
  getUserData,
  removeStateWishlist,
  deleteWishlist,
} from "../../redux/userSlice/userSlice";
import { addToCart } from "../../redux/cartSlice/cartSlice";
import icon from "../../assets/img/logo_nav.png";

const UserPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number>(1);
  const [activeSign, setActiveSign] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const dispatch = useAppDisptach();
  const navigate = useNavigate();

  let authToken = localStorage.getItem("Authorization");
  let setProceed = authToken !== null ? true : false;

  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  useEffect(() => {
    if (setProceed) {
      dispatch(getUserData());
    }
  }, [dispatch, setProceed]);

  // const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

  const toggleAccordion = (index: number) => {
    setActiveAccordion(index === activeAccordion ? index : index);
  };

  const toggleActiveSign = () => {
    setActiveSign(!activeSign);
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
            <InfoBarUser
              activeAccordion={activeAccordion}
              toggleAccordion={toggleAccordion}
              toggleActiveSign={toggleActiveSign}
            />

            <InfoUserDetails
              activeAccordion={activeAccordion}
              active={active}
              setActive={setActive}
              handleAddToCart={handleAddToCart}
              handleDeleteWishlist={handleDeleteWishlist}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
