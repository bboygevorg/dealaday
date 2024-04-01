import React, { useEffect, useState } from "react";
import classes from "./product.module.scss";
import { useSelector } from "react-redux";
import { getStarRaiting } from "../../../helper/star";

import {
  Loader,
  ProductColorSlider,
  ProductDetail,
  Reviews,
  Slider,
} from "../../../helper/index";
import { RootState } from "../../../redux/store/store";
import axios from "axios";

const Product: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number>(1);
  const [recommendedProduct, setRecommendedProduct] = useState([]);

  const { selectedProduct, productColor, loading } = useSelector(
    (state: RootState) => state.productInfo
  );

  function haya() {
    
  } 

  const toggleAccordion = (index: number) => {
    setActiveAccordion(index === activeAccordion ? index : index);
  };

  const iconOptions = selectedProduct?.icon_option;

  const getRecommended = async () => {
    try {
      const { data } = await axios("http://localhost:5000/recommended");
      setRecommendedProduct(data);
    } catch (error) {
      console.log("Error fetching deals recommended:", error);
    }
  };

  useEffect(() => {
    getRecommended();
  }, []);

  return (
    <>
      {loading === "pending" ? (
        <Loader width="100%" />
      ) : (
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
                    {productColor.length > 1 && (
                      <div className={classes.slider_color}>
                        <ProductColorSlider productColor={productColor} />
                      </div>
                    )}

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
                <div className={classes.accordeon_container}>
                  <div
                    className={`${
                      activeAccordion === 1
                        ? classes.active
                        : classes.accordion_item
                    } `}
                    onClick={() => toggleAccordion(1)}
                  >
                    Description
                  </div>
                  <div
                    className={`${
                      activeAccordion === 2
                        ? classes.active
                        : classes.accordion_item
                    } `}
                    onClick={() => toggleAccordion(2)}
                  >
                    Warranty
                  </div>
                  <div
                    className={`${
                      activeAccordion === 3
                        ? classes.active
                        : classes.accordion_item
                    } `}
                    onClick={() => toggleAccordion(3)}
                  >
                    Shipping
                  </div>
                  <div
                    className={`${
                      activeAccordion === 4
                        ? classes.active
                        : classes.accordion_item
                    } `}
                    onClick={() => toggleAccordion(4)}
                  >
                    Reviews
                  </div>
                </div>
                <div className={classes.accordion_content}>
                  {activeAccordion === 1 && (
                    <>
                      <div
                        className={classes.contentItem}
                        dangerouslySetInnerHTML={{
                          __html: selectedProduct.description,
                        }}
                      ></div>
                    </>
                  )}
                  {activeAccordion === 2 && (
                    <div className={classes.contentItem}>
                      <h3>Warranty</h3>
                      <p>
                        Please make your selection carefully as we are unable to
                        accept this product for refund or exchange if you simply
                        change your mind or if you made an incorrect purchase
                      </p>
                      <p style={{ marginTop: "2.5rem" }}>
                        This product is covered by the Customer Charter and
                        comes with guarantees that cannot be excluded under the
                        Australian Consumer Law.
                      </p>
                      <p style={{ marginTop: "2.5rem" }}>
                        You can also purchase 3 Year Extended Care including
                        Mishap Protection. If you are interested please see our
                        Extended Care Information here.
                      </p>
                      <p style={{ marginTop: "2.5rem" }}>
                        This product may contain warranty documents on or inside
                        the packaging provided by the manufacturer of the
                        product. Any such warranty is not given by Kogan.com,
                        and is separate from the Kogan.com Customer Charter.
                        Some warranties provided by manufacturers of imported
                        goods may not apply in Australia. You should contact the
                        manufacturer identified on the warranty document to
                        determine whether or not the warranty applies to the
                        goods in Australia and if so, how you should go about
                        making a claim under such a warranty.
                      </p>
                    </div>
                  )}
                  {activeAccordion === 3 && (
                    <div className={classes.contentItem}>
                      <h3>Shipping</h3>

                      <h4 style={{ marginTop: "2.5rem" }}>Shipping</h4>
                      <ul
                        style={{
                          margin: "1rem 1.4rem",
                        }}
                        className={classes.shipping}
                      >
                        <li>
                          Complimentary ground shipping within 1 to 7 business
                          days
                        </li>
                        <li>
                          In-store collection available within 1 to 7 business
                          days
                        </li>
                        <li>
                          Next-day and Express delivery options also available
                        </li>
                        <li>
                          Purchases are delivered in an orange box tied with a
                          Bolduc ribbon, with the exception of certain items
                        </li>
                        <li>
                          See the delivery FAQs for details on shipping methods,
                          costs and delivery times
                        </li>
                      </ul>

                      <h4>Returns and exchanges</h4>

                      <ul
                        style={{
                          margin: "1rem 1.4rem",
                        }}
                      >
                        <li>Easy and complimentary, within 14 days</li>
                        <li>See conditions and procedure in our return FAQs</li>
                      </ul>
                    </div>
                  )}
                  {activeAccordion === 4 && (
                    <div className={classes.contentItem}>Reviews</div>
                  )}
                </div>
                <div className={classes.slider_recommended}>
                  <Slider
                    sliderProduct={recommendedProduct}
                    sliderName="Recommended"
                  />
                </div>
              </>
            ) : (
              <p>No product selected</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
