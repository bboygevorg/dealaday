import React from "react";
import classes from "./infoUserBar.module.scss";
import {
  ChangePasswordIcon,
  DeliveryAddressIcon,
  MyOrdersIcon,
  MyProfileIcon,
  MyRewardsIcon,
  WishlistIcon,
} from "../../../helper/infoBarIcon";

const menuItems = [
  { id: 1, label: "My Profile", icon: <MyProfileIcon /> },
  { id: 2, label: "Delivery Address", icon: <DeliveryAddressIcon /> },
  { id: 3, label: "My Orders", icon: <MyOrdersIcon /> },
  { id: 4, label: "My Rewards", icon: <MyRewardsIcon /> },
  { id: 5, label: "Wishlist", icon: <WishlistIcon /> },
  { id: 6, label: "Change Password", icon: <ChangePasswordIcon /> },
];

interface InfoBar {
  activeAccordion: number;
  toggleAccordion: (index: number) => void;
  toggleActiveSign: () => void;
}

const InfoUserBar: React.FC<InfoBar> = ({
  activeAccordion,
  toggleAccordion,
  toggleActiveSign,
}) => {
  return (
    <>
      <div className={classes.info_bar}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${
              activeAccordion === item.id
                ? classes.active
                : classes.accordion_item
            }`}
            onClick={() => toggleAccordion(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <div className={classes.line}></div>
        <div className={classes.sign_out} onClick={toggleActiveSign}>
          <span>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 13L19 9M19 9L15 5M19 9H5M11 13V14C11 14.7956 10.6839 15.5587 10.1213 16.1213C9.55871 16.6839 8.79565 17 8 17H4C3.20435 17 2.44129 16.6839 1.87868 16.1213C1.31607 15.5587 1 14.7956 1 14V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1H8C8.79565 1 9.55871 1.31607 10.1213 1.87868C10.6839 2.44129 11 3.20435 11 4V5"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Sign Out</span>
        </div>
      </div>

      <div className={classes.info_bar_mobile}>
        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              className={
                activeAccordion === item.id
                  ? classes.active
                  : classes.accordion_item
              }
              onClick={() => toggleAccordion(item.id)}
            >
              {item.icon}
            </div>
            <span
              className={activeAccordion === item.id ? classes.span_active : ""}
            ></span>
          </div>
        ))}
      </div>
    </>
  );
};

export default InfoUserBar;
