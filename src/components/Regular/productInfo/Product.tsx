import React, { useEffect, useState } from "react";
import classes from "./product.module.scss";
import { useAppSelector, useAppDisptach } from "../../../redux/store/hook";
import { getStarRaiting } from "../../../helper/star";

import {
  Button,
  GrayLine,
  Loader,
  ProductColorSlider,
  ProductDetail,
} from "../../../helper/index";
import axios from "axios";
import { apiUrl } from "../../../helper/env";
import {
  deleteReview,
  editReview,
  fetchReview,
  removeStateReview,
} from "../../../redux/userSlice/userSlice";

import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Slider from "../Slider/Slider";

const Product: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number>(1);
  const [recommendedProduct, setRecommendedProduct] = useState<[]>([]);
  const [activeReview, setActiveReview] = useState<boolean>(false);
  const [reviewComment, setReviewComment] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [users, setUsers] = useState();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const dispatch = useAppDisptach();
  const navigate = useNavigate();

  const { selectedProduct, productColor, loading } = useAppSelector(
    (state) => state.productInfo
  );
  const { review } = useAppSelector((state) => state.userSlice);
  const userId = review.filter((item) => item.user._id);

  const auth = localStorage.getItem("Authorization");
  const setProceed = auth ? true : false;

  const ratingCounts = review.reduce((acc: { [key: number]: number }, curr) => {
    const rating = curr.rating;

    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const starsArray = [5, 4, 3, 2, 1];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(index === activeAccordion ? index : index);
  };

  const iconOptions = selectedProduct?.icon_option ?? "";

  const getUser = async () => {
    const { data } = await axios.get(`${apiUrl}/user/auth/getuser`, {
      headers: {
        Authorization: auth,
      },
    });
    setUsers(data._id);
  };

  useEffect(() => {
    setProceed && getUser();
  }, []);

  const handleDeleteReview = (id: string) => {
    dispatch(deleteReview(id));
    dispatch(removeStateReview(id));
  };

  const getRecommended = async () => {
    try {
      const { data } = await axios(`${apiUrl}/product/recommended`);
      setRecommendedProduct(data);
    } catch (error) {
      console.log("Error fetching deals recommended:", error);
    }
  };

  useEffect(() => {
    getRecommended();
    if (selectedProduct && selectedProduct._id) {
      dispatch(fetchReview(selectedProduct._id));
    }
  }, [selectedProduct, dispatch]);

  const stars = (number: number) => {
    const starIcon = [];
    const maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
      if (i < number) {
        starIcon.push(
          <svg
            key={i}
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2794_10638)">
              <path
                d="M8.72179 12.6516L4.57479 14.815L5.36697 10.233L2.00745 6.98829L6.64359 6.32162L8.71709 2.15295L10.7906 6.32162L15.4267 6.98829L12.0672 10.233L12.8594 14.815L8.72179 12.6516Z"
                fill="#FDBC00"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.71714 1.40295C9.00487 1.40295 9.26764 1.56503 9.39498 1.82103L11.2925 5.63596L15.5352 6.24604C15.8201 6.28701 16.0568 6.48498 16.1457 6.75664C16.2346 7.0283 16.1603 7.32649 15.954 7.52572L12.8795 10.4951L13.6044 14.6882C13.6531 14.9697 13.5364 15.2542 13.3035 15.4219C13.0705 15.5897 12.7617 15.6116 12.507 15.4785L8.72145 13.4992L4.92661 15.4788C4.67194 15.6117 4.36333 15.5895 4.13055 15.4217C3.89777 15.2539 3.78119 14.9695 3.82984 14.6882L4.55477 10.4951L1.48026 7.52572C1.27398 7.32649 1.19965 7.0283 1.28857 6.75664C1.37748 6.48498 1.61419 6.28701 1.89908 6.24604L6.14176 5.63596L8.0393 1.82103C8.16664 1.56503 8.42942 1.40295 8.71714 1.40295ZM8.71714 3.84764L7.32148 6.65354C7.21133 6.87499 6.99838 7.02845 6.75206 7.06387L3.63374 7.51227L5.89427 9.69552C6.07268 9.86784 6.15413 10.1163 6.11204 10.3598L5.57883 13.4439L8.37008 11.9878C8.59052 11.8728 8.8539 11.8729 9.07424 11.9881L11.8552 13.4421L11.3222 10.3598C11.2802 10.1163 11.3616 9.86784 11.54 9.69552L13.8005 7.51227L10.6822 7.06387C10.4359 7.02845 10.223 6.87499 10.1128 6.65354L8.71714 3.84764Z"
                fill="#FDBC00"
              />
            </g>
            <defs>
              <clipPath id="clip0_2794_10638">
                <rect
                  width="16.1257"
                  height="16"
                  fill="white"
                  transform="translate(0.658936 0.818237)"
                />
              </clipPath>
            </defs>
          </svg>
        );
      } else {
        starIcon.push(
          <svg
            key={i}
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00463 12.6516L4.85763 14.815L5.64981 10.233L2.29028 6.98829L6.92642 6.32162L8.99992 2.15295L11.0734 6.32162L15.7096 6.98829L12.35 10.233L13.1422 14.815L9.00463 12.6516Z"
              fill="#D1D5DB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.99998 1.40295C9.28771 1.40295 9.55048 1.56503 9.67782 1.82103L11.5754 5.63596L15.818 6.24604C16.1029 6.28701 16.3396 6.48498 16.4286 6.75664C16.5175 7.0283 16.4431 7.32649 16.2369 7.52572L13.1624 10.4951L13.8873 14.6882C13.936 14.9697 13.8193 15.2542 13.5863 15.4219C13.3533 15.5897 13.0445 15.6116 12.7899 15.4785L9.00428 13.4992L5.20945 15.4788C4.95477 15.6117 4.64616 15.5895 4.41338 15.4217C4.1806 15.2539 4.06403 14.9695 4.11268 14.6882L4.8376 10.4951L1.76309 7.52572C1.55681 7.32649 1.48249 7.0283 1.5714 6.75664C1.66032 6.48498 1.89703 6.28701 2.18192 6.24604L6.4246 5.63596L8.32214 1.82103C8.44948 1.56503 8.71225 1.40295 8.99998 1.40295ZM8.99998 3.84764L7.60432 6.65354C7.49417 6.87499 7.28121 7.02845 7.0349 7.06387L3.91657 7.51227L6.17711 9.69552C6.35552 9.86784 6.43697 10.1163 6.39487 10.3598L5.86166 13.4439L8.65292 11.9878C8.87336 11.8728 9.13674 11.8729 9.35707 11.9881L12.138 13.4421L11.6051 10.3598C11.563 10.1163 11.6444 9.86784 11.8229 9.69552L14.0834 7.51227L10.9651 7.06387C10.7187 7.02845 10.5058 6.87499 10.3956 6.65354L8.99998 3.84764Z"
              fill="#D1D5DB"
            />
          </svg>
        );
      }
    }

    return starIcon;
  };

  const dateString = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const reviewActive = () => {
    setActiveReview(!activeReview);
  };

  const handleClickisHovered = () => {
    setIsHovered(!isHovered);
  };

  const handleClick = (star: number) => {
    setRating(star);
  };

  const handleMouseOver = (star: number) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleEditReview = async (id: string) => {
    if (auth) {
      if (!rating && !reviewComment) {
        toast.error("Please Fill the all Fields", {
          theme: "colored",
          autoClose: 500,
        });
      } else if (reviewComment.length <= 4) {
        toast.error("Please add more than 4 characters", {
          theme: "colored",
          autoClose: 500,
        });
      } else if (rating <= 0) {
        toast.error("Please add rating", { theme: "colored", autoClose: 600 });
      } else if (reviewComment.length >= 4 && rating > 0) {
        await dispatch(
          editReview({
            _id: id,
            comment: reviewComment,
            rating: rating,
          })
        );
        await dispatch(fetchReview(selectedProduct._id));
        setReviewComment("");
        setRating(0);
        setEdit(false);
      }
    }
  };

  const handleSendReview = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (auth) {
      if (!rating && !reviewComment) {
        toast.error("Please Fill the all Fields", {
          theme: "colored",
          autoClose: 500,
        });
      } else if (reviewComment.length <= 4) {
        toast.error("Please add more than 4 characters", {
          theme: "colored",
          autoClose: 500,
        });
      } else if (rating <= 0) {
        toast.error("Please add rating", { theme: "colored", autoClose: 600 });
      } else if (reviewComment.length >= 4 && rating > 0) {
        try {
          if (setProceed) {
            const { data } = await axios.post(
              `${apiUrl}/user/review/addreview`,
              {
                id: selectedProduct._id,
                comment: reviewComment,
                rating: rating,
              },
              {
                headers: {
                  Authorization: auth,
                },
              }
            );
            toast.success(data.msg, { theme: "colored", autoClose: 500 });
            dispatch(fetchReview(selectedProduct._id));
          } else {
            console.log(true);
          }
          setReviewComment("");
          setRating(0);
          setEdit(false);
        } catch (error: any) {
          toast.error(error.response.data.msg, {
            theme: "colored",
            autoClose: 600,
          });
          setReviewComment("");
          setRating(0);
        }
      }
    } else {
      navigate("/login");
    }
  };

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
                      <span>({review.length} Reviews)</span>
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
                        Array.isArray(iconOptions) && iconOptions.length > 2
                          ? classes.icon_information
                          : classes.icon_information_start
                      }
                    >
                      {Array.isArray(iconOptions) &&
                        iconOptions?.map((info, index) => {
                          return (
                            <div key={index}>
                              <img src={info.icon} alt="" />
                              <p>{info.info}</p>
                              <p>{info.title}</p>
                            </div>
                          );
                        })}
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
                    <div className={classes.contentItem}>
                      <h2 className={classes.review_title}>
                        Reviews ({review.length})
                      </h2>
                      <div className={classes.review_info}>
                        <div className={classes.rating}>
                          <div className={classes.rating_top}>
                            <span>{selectedProduct.rating}</span>
                            <span style={{ marginLeft: "1rem" }}>
                              {getStarRaiting(selectedProduct.rating)}
                            </span>
                          </div>
                          <div className={classes.rating_middle}>
                            <span>Based on 108 reviews</span>
                          </div>
                          <div className={classes.rating_bottom}>
                            <button onClick={reviewActive}>
                              Write a Review
                            </button>
                          </div>
                        </div>
                        <div className={classes.line}></div>
                        <div className={classes.rating_calculate}>
                          {starsArray.map((num) => (
                            <div
                              className={classes.rating_calculate_info}
                              key={num}
                            >
                              <div>{stars(num)}</div>
                              <div className={classes.line_filter}>
                                <GrayLine value={ratingCounts[num] || 0} />
                              </div>
                              <span style={{ marginLeft: "1rem" }}>
                                ({ratingCounts[num] || 0})
                              </span>
                            </div>
                          ))}
                          <div className={classes.rating_bottom}>
                            <button onClick={reviewActive}>
                              Write a Review
                            </button>
                          </div>
                        </div>
                      </div>
                      {activeReview && (
                        <form onSubmit={handleSendReview}>
                          <div className={classes.review_comment}>
                            <div className={classes.review_stars}>
                              {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;
                                return (
                                  <label key={index}>
                                    <FaStar
                                      className="star"
                                      color={
                                        starValue <= (hoverRating || rating)
                                          ? "#fdbc00"
                                          : "#d1d5db"
                                      }
                                      onMouseOver={() =>
                                        handleMouseOver(starValue)
                                      }
                                      onClick={() => handleClick(starValue)}
                                      onMouseLeave={handleMouseLeave}
                                    />
                                  </label>
                                );
                              })}
                            </div>

                            <div className={classes.comment_review}>
                              <input
                                type="text"
                                name="example"
                                placeholder="Enter text here"
                                value={reviewComment}
                                onChange={(e) =>
                                  setReviewComment(e.target.value)
                                }
                              />
                            </div>
                            <div className={classes.button_review}>
                              <Button
                                padding="0.9rem 1.2rem"
                                backgroundButton="#3598cc"
                                color="#ffffff"
                                buttonFunction={() => "handleAddToCart"}
                                hover="blue"
                              >
                                Send
                              </Button>
                            </div>
                          </div>
                        </form>
                      )}
                      <div className={classes.review}>
                        {review.map((item, index) => (
                          <div key={index} className={classes.review_info}>
                            {edit && users === item.user._id ? (
                              <div className={classes.star}>
                                {[...Array(5)].map((star, index) => {
                                  const starValue = index + 1;
                                  return (
                                    <label key={index}>
                                      <FaStar
                                        className="star"
                                        color={
                                          starValue <= (hoverRating || rating)
                                            ? "#fdbc00"
                                            : "#d1d5db"
                                        }
                                        onMouseOver={() =>
                                          handleMouseOver(starValue)
                                        }
                                        onClick={() => handleClick(starValue)}
                                        onMouseLeave={handleMouseLeave}
                                      />
                                    </label>
                                  );
                                })}
                              </div>
                            ) : (
                              <span>{stars(item.rating)}</span>
                            )}

                            <span>
                              {item.user.firstName} {item.user.lastName}
                            </span>
                            <span>{dateString(item.createdAt)}</span>
                            {edit && users === item.user._id ? (
                              <div className={classes.comment_review}>
                                <input
                                  type="text"
                                  name="example"
                                  placeholder="Enter text here"
                                  value={reviewComment}
                                  onChange={(e) =>
                                    setReviewComment(e.target.value)
                                  }
                                />
                              </div>
                            ) : (
                              <span>{item.comment}</span>
                            )}

                            {edit && users === item.user._id ? (
                              <div className={classes.button_review}>
                                <Button
                                  padding="0.9rem 1.2rem"
                                  backgroundButton="#3598cc"
                                  color="#fff"
                                  buttonFunction={() =>
                                    handleEditReview(item._id)
                                  }
                                  hover="blue"
                                >
                                  Send
                                </Button>
                                <Button
                                  padding="0.9rem 1.2rem"
                                  backgroundButton="#f70000"
                                  color="#fff"
                                  buttonFunction={() => setEdit(false)}
                                  hover="red"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              ""
                            )}

                            {users === item.user._id && (
                              <span
                                className={`${
                                  edit ? classes.display : classes.edit_info
                                }`}
                              >
                                <span
                                  className={classes.circle_button}
                                  onClick={handleClickisHovered}
                                >
                                  {isHovered && (
                                    <span
                                      className={classes.additional_buttons}
                                    >
                                      <span
                                        className={classes.edit_button}
                                        onClick={() => setEdit(true)}
                                      >
                                        <svg
                                          width="25px"
                                          height="25px"
                                          viewBox="0 -0.5 25 25"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z"
                                            stroke="#3598cc"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM15.8863 6.68446C15.7282 6.30159 15.2897 6.11934 14.9068 6.2774C14.5239 6.43546 14.3417 6.87397 14.4998 7.25684L15.8863 6.68446ZM18.2319 9.62197C18.6363 9.53257 18.8917 9.13222 18.8023 8.72777C18.7129 8.32332 18.3126 8.06792 17.9081 8.15733L18.2319 9.62197ZM8.30001 16.4317C7.8858 16.4317 7.55001 16.7674 7.55001 17.1817C7.55001 17.5959 7.8858 17.9317 8.30001 17.9317V16.4317ZM15.767 17.9317C16.1812 17.9317 16.517 17.5959 16.517 17.1817C16.517 16.7674 16.1812 16.4317 15.767 16.4317V17.9317ZM12.033 6.11865H9.23301V7.61865H12.033V6.11865ZM9.23121 6.11865C6.75081 6.12461 4.7447 8.13986 4.75001 10.6203L6.25001 10.617C6.24647 8.96492 7.58269 7.62262 9.23481 7.61865L9.23121 6.11865ZM4.75001 10.6187V16.2437H6.25001V10.6187H4.75001ZM4.75001 16.242C4.7447 18.7224 6.75081 20.7377 9.23121 20.7437L9.23481 19.2437C7.58269 19.2397 6.24647 17.8974 6.25001 16.2453L4.75001 16.242ZM9.23301 20.7437H14.833V19.2437H9.23301V20.7437ZM14.8348 20.7437C17.3152 20.7377 19.3213 18.7224 19.316 16.242L17.816 16.2453C17.8195 17.8974 16.4833 19.2397 14.8312 19.2437L14.8348 20.7437ZM19.316 16.2437V12.4937H17.816V16.2437H19.316ZM14.4998 7.25684C14.6947 7.72897 15.0923 8.39815 15.6866 8.91521C16.2944 9.44412 17.1679 9.85718 18.2319 9.62197L17.9081 8.15733C17.4431 8.26012 17.0391 8.10369 16.6712 7.7836C16.2897 7.45165 16.0134 6.99233 15.8863 6.68446L14.4998 7.25684ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z"
                                            fill="#3598cc"
                                          />
                                        </svg>
                                      </span>
                                      <span
                                        className={classes.delete_button}
                                        onClick={() =>
                                          handleDeleteReview(item._id)
                                        }
                                      >
                                        <svg
                                          width="20px"
                                          height="20px"
                                          viewBox="0 0 1024 1024"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"
                                            fill="#3598cc"
                                          />
                                          <path
                                            d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"
                                            fill="#3598cc"
                                          />
                                        </svg>
                                      </span>
                                    </span>
                                  )}
                                </span>
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
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
