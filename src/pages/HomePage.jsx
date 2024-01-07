import React from "react";
import { Helmet } from "react-helmet-async";

import {
  CartTodays,
  InputWhite,
  InfoBar,
  Banner,
  Slider,
} from "../helper/index";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Deal A Day</title>
      </Helmet>
      <InputWhite />
      <CartTodays />
      <InfoBar />
      <Slider title="Top Products" />
      <Banner />
      <Slider title="Most Popular" />
    </div>
  );
};

export default HomePage;
