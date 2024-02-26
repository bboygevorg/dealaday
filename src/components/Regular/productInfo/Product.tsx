import React from "react";
import classes from "./product.module.scss";
import { useSelector } from "react-redux";
import { getStarRaiting } from "../../../helper/star";

import {
  ProductColorSlider,
  ProductDetail,
  Reviews,
} from "../../../helper/index";
import { RootState } from "../../../redux/store/store";

const Product: React.FC = () => {
  const { selectedProduct, productColor } = useSelector(
    (state: RootState) => state.productInfo
  );

  const iconOptions = selectedProduct?.icon_option;

  return (
    <div className={classes.product_info}>
      <div className={classes.container}>
        {selectedProduct ? (
          <>
            <h2 className={classes.product_info_name}>
              {selectedProduct.name}
            </h2>
            <p className={classes.product_info_title}>
              {selectedProduct.title}
            </p>
            <div className={classes.product_info_top}>
              <div className={`${classes.rating_info} ${classes.info}`}>
                <div>{getStarRaiting(selectedProduct.rating)}</div>
                <span className={classes.review}>
                  <Reviews />
                </span>
              </div>
              <div className={classes.vertical_line}></div>
              <div className={`${classes.brand_info} ${classes.info}`}>
                <p>
                  Brand:{" "}
                  <span style={{ color: "#3598cc" }}>
                    {selectedProduct.brand}
                  </span>
                </p>
              </div>
              <div className={classes.vertical_line}></div>
              <div className={`${classes.sku_info} ${classes.info}`}>
                <p>
                  SKU: <span>{selectedProduct.sku}</span>
                </p>
              </div>
            </div>
            <div className={classes.product_info_bottom}>
              <div className={classes.info_picture}>
                <div className={classes.picture}>
                  <img src={selectedProduct.img} alt="" />
                </div>
                <div className={classes.slider_color}>
                  <ProductColorSlider productColor={productColor} />
                </div>
                <div
                  className={
                    iconOptions.length > 2
                      ? classes.icon_information
                      : classes.icon_information_start
                  }
                >
                  {iconOptions?.map(
                    (
                      info: { icon: string; info: string; title: string },
                      index: number
                    ) => {
                      return (
                        <div key={index}>
                          <img src={info.icon} alt="" />
                          <p>{info.info}</p>
                          <p>{info.title}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className={classes.info_price}>
                <ProductDetail selectedProduct={selectedProduct} />
              </div>
            </div>
          </>
        ) : (
          <p>No product selected</p>
        )}
      </div>
    </div>
  );
};

export default Product;
