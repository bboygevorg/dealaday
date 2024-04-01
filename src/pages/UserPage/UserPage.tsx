import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classes from "./user.module.scss";
import { Helmet } from "react-helmet-async";
import { Button, Loader, Search } from "../../helper";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSelectedUser } from "../../redux/userSlice/userSlice";

const UserPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number>(1);
  const [userData, setUserData] = useState<[]>([]);
  const [userDetails, setUserDetails] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  let authToken = localStorage.getItem("Authorization");

  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  // const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

  const toggleAccordion = (index: number) => {
    setActiveAccordion(index === activeAccordion ? index : index);
  };

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/user/auth/getuser",
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      const user = response.data;
      dispatch(setSelectedUser(user));
      setUserData(user);
      userDetails.email = user.email;
      userDetails.phone = user.phone;
      userDetails.firstName = user.firstName;
      userDetails.lastName = user.lastName;
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong", { autoClose: 500, theme: "colored" });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (e.target.value === "phone") {
      const cleaned = value.replace(/[^\d\s]/g, "");

      let formattedPhone = "+";
      for (let i = 0; i < cleaned.length; i++) {
        if (i === 1 || i === 4 || i === 7 || i === 10) {
          formattedPhone += " " + cleaned[i];
        } else {
          formattedPhone += cleaned[i];
        }
      }
      setUserDetails({ ...userDetails, [e.target.name]: formattedPhone });
    }

    setUserDetails({ ...userDetails, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !userDetails.email &&
        !userDetails.phone &&
        !userDetails.firstName &&
        !userDetails.lastName
      ) {
        toast.error("Please Fill the all Fields", {
          autoClose: 900,
          theme: "colored",
        });
      } else if (
        userDetails.firstName.length < 3 ||
        userDetails.lastName.length < 3
      ) {
        toast.error("Please enter name with more than 3 characters", {
          autoClose: 900,
          theme: "colored",
        });
      } else {
        const { data } = await axios.put(
          "http://localhost:5000/user/auth/updateuser",
          { userDetails: JSON.stringify(userDetails) },
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        if (data.success === true) {
          toast.success("Update Successfuly", {
            autoClose: 900,
            theme: "colored",
          });
          getUser();
        } else {
          toast.error("Something went wrong", {
            autoClose: 500,
            theme: "colored",
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data, { autoClose: 900, theme: "colored" });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Accaunt</title>
      </Helmet>

      <div className={classes.product_search}>
        <Search
          stroke="#3598cc"
          inputbackgroundColor=""
          borderInputColor="#d1d5db"
          logoBackgroundColor="#f9fafb"
          logoBorderColor="#d1d5db"
          color=""
        />
      </div>

      <div className="navigate">
        <div className="container">
          <Link to="/">
            <span>Home</span>
          </Link>

          <span>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1L6.5 6L1.5 11"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {pathSegments.map((segment, index) => (
            <span key={index}>My Accaunt</span>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Loader width="100%" />
      ) : (
        <div className={classes.accaunt}>
          <div className={classes.wrapper}>
            <div className={classes.info_bar}>
              <div
                className={`${
                  activeAccordion === 1
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(1)}
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4.00004H3C2.46957 4.00004 1.96086 4.21075 1.58579 4.58583C1.21071 4.9609 1 5.46961 1 6.00004V17C1 17.5305 1.21071 18.0392 1.58579 18.4143C1.96086 18.7893 2.46957 19 3 19H14C14.5304 19 15.0391 18.7893 15.4142 18.4143C15.7893 18.0392 16 17.5305 16 17V12M14.586 2.58604C14.7705 2.39502 14.9912 2.24266 15.2352 2.13784C15.4792 2.03302 15.7416 1.97785 16.0072 1.97554C16.2728 1.97323 16.5361 2.02384 16.7819 2.1244C17.0277 2.22496 17.251 2.37346 17.4388 2.56125C17.6266 2.74904 17.7751 2.97234 17.8756 3.21813C17.9762 3.46392 18.0268 3.72728 18.0245 3.99284C18.0222 4.2584 17.967 4.52084 17.8622 4.76485C17.7574 5.00886 17.605 5.22955 17.414 5.41404L8.828 14H6V11.172L14.586 2.58604Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My Profile</span>
              </div>
              <div
                className={`${
                  activeAccordion === 2
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(2)}
              >
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9C13.2284 21.0857 13.0081 21.233 12.7656 21.3336C12.523 21.4341 12.2631 21.4859 12.0005 21.4859C11.738 21.4859 11.478 21.4341 11.2354 21.3336C10.9929 21.233 10.7726 21.0857 10.587 20.9L6.343 16.657C5.22422 15.5381 4.46234 14.1127 4.15369 12.5608C3.84504 11.009 4.00349 9.40047 4.60901 7.93868C5.21452 6.4769 6.2399 5.22749 7.55548 4.34846C8.87107 3.46943 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46943 16.4445 4.34846C17.7601 5.22749 18.7855 6.4769 19.391 7.93868C19.9965 9.40047 20.155 11.009 19.8463 12.5608C19.5377 14.1127 18.7758 15.5381 17.657 16.657V16.657Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2044 14.6839 9.44129 14.1213 8.87868C13.5587 8.31607 12.7956 8 12 8C11.2044 8 10.4413 8.31607 9.87868 8.87868C9.31607 9.44129 9 10.2044 9 11C9 11.7956 9.31607 12.5587 9.87868 13.1213C10.4413 13.6839 11.2044 14 12 14C12.7956 14 13.5587 13.6839 14.1213 13.1213Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Delivery Address</span>
              </div>
              <div
                className={`${
                  activeAccordion === 3
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(3)}
              >
                <span>
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 5L9 1L1 5M17 5L9 9M17 5V15L9 19M1 5L9 9M1 5V15L9 19M9 9V19"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My Orders</span>
              </div>
              <div
                className={`${
                  activeAccordion === 4
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(4)}
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 6V19M10 6V4C10 3.60444 10.1173 3.21776 10.3371 2.88886C10.5568 2.55996 10.8692 2.30362 11.2346 2.15224C11.6001 2.00087 12.0022 1.96126 12.3902 2.03843C12.7781 2.1156 13.1345 2.30608 13.4142 2.58579C13.6939 2.86549 13.8844 3.22186 13.9616 3.60982C14.0387 3.99778 13.9991 4.39992 13.8478 4.76537C13.6964 5.13082 13.44 5.44318 13.1111 5.66294C12.7822 5.8827 12.3956 6 12 6H10ZM10 6V3.5C10 3.00555 9.85338 2.5222 9.57867 2.11108C9.30397 1.69995 8.91352 1.37952 8.45671 1.1903C7.99989 1.00108 7.49723 0.951575 7.01227 1.04804C6.52732 1.1445 6.08186 1.3826 5.73223 1.73223C5.3826 2.08187 5.1445 2.52732 5.04804 3.01228C4.95157 3.49723 5.00108 3.99989 5.1903 4.45671C5.37952 4.91352 5.69995 5.30397 6.11107 5.57867C6.5222 5.85338 7.00555 6 7.5 6H10ZM3 10H17M3 10C2.46957 10 1.96086 9.78929 1.58579 9.41421C1.21071 9.03914 1 8.53043 1 8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21072 2.46957 6 3 6H17C17.5304 6 18.0391 6.21072 18.4142 6.58579C18.7893 6.96086 19 7.46957 19 8C19 8.53043 18.7893 9.03914 18.4142 9.41421C18.0391 9.78929 17.5304 10 17 10M3 10V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V10"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My reawards</span>
              </div>
              <div
                className={`${
                  activeAccordion === 5
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(5)}
              >
                <span>
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.31799 2.31804C1.90012 2.7359 1.56865 3.23198 1.3425 3.77795C1.11635 4.32392 0.999954 4.90909 0.999954 5.50004C0.999954 6.09099 1.11635 6.67616 1.3425 7.22213C1.56865 7.7681 1.90012 8.26417 2.31799 8.68204L9.99999 16.364L17.682 8.68204C18.5259 7.83812 19 6.69352 19 5.50004C19 4.30656 18.5259 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3065 1.00001 12.1619 1.47412 11.318 2.31804L9.99999 3.63604L8.68199 2.31804C8.26413 1.90017 7.76805 1.5687 7.22208 1.34255C6.67611 1.1164 6.09095 1 5.49999 1C4.90904 1 4.32387 1.1164 3.7779 1.34255C3.23194 1.5687 2.73586 1.90017 2.31799 2.31804V2.31804Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Wishlist</span>
              </div>
              <div
                className={`${
                  activeAccordion === 6
                    ? classes.active
                    : classes.accordion_item
                }`}
                onClick={() => toggleAccordion(6)}
              >
                <span>
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 13V15M3 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V11C17 10.4696 16.7893 9.96086 16.4142 9.58579C16.0391 9.21071 15.5304 9 15 9H3C2.46957 9 1.96086 9.21071 1.58579 9.58579C1.21071 9.96086 1 10.4696 1 11V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19ZM13 9V5C13 3.93913 12.5786 2.92172 11.8284 2.17157C11.0783 1.42143 10.0609 1 9 1C7.93913 1 6.92172 1.42143 6.17157 2.17157C5.42143 2.92172 5 3.93913 5 5V9H13Z"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Change password</span>
              </div>
            </div>
            <div className={classes.info_user}>
              {activeAccordion === 1 && (
                <div className={classes.content_item}>
                  <h2>My Profile</h2>

                  <div className={classes.profile}>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div>
                          <span>Email</span>
                          <input
                            type="text"
                            placeholder="Email"
                            value={userDetails.email}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div>
                          <span>Phone</span>
                          <input
                            name="phone"
                            placeholder="Phone"
                            value={userDetails.phone}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div>
                          <span>First Name</span>
                          <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={userDetails.firstName}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div>
                          <span>Last Name</span>
                          <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={userDetails.lastName}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className={classes.button}>
                        <button type="submit">Save</button>
                        <Button
                          backgroundButton="#3598cc"
                          padding="0.9rem 1.2rem"
                          color="#ffffff"
                          hover="blue"
                          buttonFunction={() => {}}
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
