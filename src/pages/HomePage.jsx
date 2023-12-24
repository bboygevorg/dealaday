import React from "react";
import { Helmet } from "react-helmet-async";

import {
  CartTodays,
  InputWhite,
  InfoBar,
  Banner,
  SliderMost,
  SliderTop,
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
      <SliderTop />
      <Banner />
      <SliderMost />
    </div>
  );
};

export default HomePage;
