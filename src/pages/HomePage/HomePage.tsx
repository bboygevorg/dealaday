import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import classes from "./homePage.module.scss";
import axios from "axios";

import {
  CartTodays,
  InfoBar,
  Slider,
  Search,
  BannerProducts,
  ButtonScroll,
} from "../../helper/index";
import { apiUrl } from "../../helper/env";

const HomePage: React.FC = () => {
  const [mostPopular, setMostPopular] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const getMostPopularProduct = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product/mostpopular`);
      setTopProducts(data);
      setMostPopular(data);
    } catch (error) {
      console.log("Error fetching deals mostPopular:", error);
    }
  };

  const getTopProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product/topproducts`);
      setTopProducts(data);
    } catch (error) {
      console.log("Error fetching deals topProduct:", error);
    }
  };

  useEffect(() => {
    getMostPopularProduct();
    getTopProducts();
  }, []);

  return (
    <div>
      <ButtonScroll />
      <Helmet>
        <title>Deal A Day</title>
      </Helmet>
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
      <CartTodays />
      <InfoBar />
      <Slider sliderProduct={topProducts} sliderName="Top products" />
      <BannerProducts />
      <Slider sliderProduct={mostPopular} sliderName="Most popular" />
    </div>
  );
};

export default HomePage;
