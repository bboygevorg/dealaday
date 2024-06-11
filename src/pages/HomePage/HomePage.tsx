import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import classes from "./homePage.module.scss";
import { useAppSelector, useAppDisptach } from "../../redux/store/hook";
import {
  fetchMostSLider,
  fetchToptSLider,
} from "../../redux/allRequests/allRequests";

import {
  CartTodays,
  InfoBar,
  Search,
  BannerProducts,
  ButtonScroll,
} from "../../helper/index";
import Slider from "../../components/UI/Slider/Slider";

const HomePage: React.FC = () => {
  const { topSlider, mostSlider } = useAppSelector(
    (state) => state.allRequests
  );

  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(fetchToptSLider());
    dispatch(fetchMostSLider());
  }, [dispatch]);

  // const renderCount = useRef(0);
  // renderCount.current += 1;
  // console.log(`rendered ${renderCount.current} times`);

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
      {topSlider.length > 0 ? (
        <Slider sliderProduct={topSlider} sliderName="Top products" />
      ) : (
        ""
      )}
      <BannerProducts />
      {mostSlider.length > 0 ? (
        <Slider sliderProduct={mostSlider} sliderName="Most popular" />
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
