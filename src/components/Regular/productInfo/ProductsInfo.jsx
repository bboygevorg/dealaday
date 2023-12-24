import React, { useEffect } from "react";
import classes from "./productsInfo.module.scss";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGoodsId } from "../../../redux/product/product";

import { Product } from "../../../helper/index";

const ProductsInfo = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getGoodsId(id));
  }, [dispatch, id]);

  return (
    <div className={classes.Products_info}>
      <div className={classes.container}>
        <Product />
      </div>
    </div>
  );
};

export default ProductsInfo;
