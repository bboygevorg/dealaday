import React from "react";

export const handleHover = (
  setActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setActive(true);
};

export const handleMouseLeave = (
  setActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setActive(false);
};

export const percentageView = (price: number, price_previous: number) => {
  const discount = price_previous - price;
  const percentage = (discount / price_previous) * 100;
  return parseInt(percentage.toFixed(0));
};

export const toggleSideBar = (
  toggleMenu: boolean,
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setToggleMenu(!toggleMenu);
};

export const closeSlideBar = (
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setToggleMenu(false);
};

export const isMobile = () => {
  return window.innerWidth <= 768;
};
