import React from "react";
import CartTodays from "../components/Cart/CartTodays/CartTodays";
import { InputWhite } from "../components/Input/input";
import InfoBar from "../components/InfoBar/InfoBar";
import { SliderMost, SliderTop } from "../components/UI/slider/Slider";
import Banner from "../components/UI/Banner/Banner";
import { Helmet } from "react-helmet-async";

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
