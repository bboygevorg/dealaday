import React, { useEffect, useState } from "react";
import classes from "./oneCart.module.scss";
import { getStarRaiting } from "../../../../helper/star";
import { addToCart } from "../../../../redux/cartSlice/cartSlice";
import { Price, WatchProduct } from "../../../../helper";
import { useAppDisptach } from "../../../../redux/store/hook";
import { useNavigate } from "react-router-dom";
import { postWishlist } from "../../../../redux/userSlice/userSlice";
import axios from "axios";
import { apiUrl } from "../../../../helper/env";
import {
  handleHover,
  handleMouseLeave,
  percentageView,
} from "../../../../helper/globalFunction";

interface CartTodays {
  id: any;
  name: string;
  img: string;
  rating: number;
  price: number;
  price_previous: number;
}

const OneCart: React.FC<CartTodays> = ({
  id,
  name,
  img,
  rating,
  price,
  price_previous,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [filteredReviews, setFilteredReviews] = useState<any[]>([]);

  const dispatch = useAppDisptach();
  const navigate = useNavigate();

  let authToken = localStorage.getItem("Authorization");
  let setProceed = authToken ? true : false;

  const handleAddToCart = () => {
    const productToAdd = { _id: id, name, price, img };
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

  // fix you need to make a request via redux
  const getReview = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/user/review/getreview/${id}`);

      setFilteredReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  const addToWishList = async (id: string) => {
    if (setProceed) {
      dispatch(postWishlist(id));
    } else {
      navigate("/login");
    }
  };

  const discountPercentage =
    price_previous !== null ? percentageView(price, price_previous) : "";

  return (
    <div
      className={classes.oneCart}
      key={id}
      onMouseEnter={() => handleHover(setActive)}
      onMouseLeave={() => handleMouseLeave(setActive)}
    >
      {active && (
        <WatchProduct
          id={id}
          onClick={() => addToWishList(id)}
          buttonFunction={handleAddToCart}
        />
      )}
      {discountPercentage ? (
        <p className={classes.oneCart_procent}>
          {`${discountPercentage}%`}{" "}
          <span style={{ color: "#ffffff" }}>off</span>
        </p>
      ) : (
        ""
      )}
      <div className={classes.oneCart_img}>
        <img src={img} alt={name} />
      </div>
      <div className={classes.oneCart_info}>
        <h3 className={classes.oneCart_info_title}>{name}</h3>
        <div className={classes.oneCart_info_raiting}>
          {getStarRaiting(rating)}
          <span className={classes.review}>
            <span>({filteredReviews.length} Reviews)</span>
          </span>
        </div>
        <Price price={price} price_previous={price_previous} margin="center" />
      </div>
    </div>
  );
};

export { OneCart };
