import React, { useEffect, useState } from "react";
import classes from "./userAllDate.module.scss";
import Button from "../../Button/Button";
import { useAppSelector, useAppDisptach } from "../../../../redux/store/hook";
import { getUserData } from "../../../../redux/userSlice/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../../../helper/env";

const UserAllDate: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getUser } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDisptach();

  let authToken = localStorage.getItem("Authorization");

  useEffect(() => {
    if (getUser) {
      setUserDetails({
        email: getUser.email,
        phone: getUser.phone,
        firstName: getUser.firstName,
        lastName: getUser.lastName,
      });
      setIsLoading(false);
    }
  }, [getUser]);

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
          `${apiUrl}/user/auth/updateuser`,
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
          dispatch(getUserData());
        } else {
          toast.error("Something went wrong", {
            autoClose: 500,
            theme: "colored",
          });
        }
      }
    } catch (error: any) {
      toast.error(error.response.data, { autoClose: 900, theme: "colored" });
    }
  };

  return (
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
  );
};

export default UserAllDate;
