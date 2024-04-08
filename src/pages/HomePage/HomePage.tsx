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
} from "../../helper/index";

const HomePage: React.FC = () => {
  const [mostPopular, setMostPopular] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const getMostPopularProduct = async () => {
    try {
      const { data } = await axios(
        "http://192.168.1.68:5000/product/mostpopular"
      );
      setMostPopular(data);
    } catch (error) {
      console.log("Error fetching deals mostPopular:", error);
    }
  };

  const getTopProducts = async () => {
    try {
      const { data } = await axios(
        "http://192.168.1.68:5000/product/topproducts"
      );
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
