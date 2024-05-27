import React, { ChangeEvent, useEffect, useState } from "react";
import classes from "./resetPasswors.module.scss";
import { useAppDisptach, useAppSelector } from "../../../redux/store/hook";
import { getUserData } from "../../../redux/userSlice/userSlice";
import { toast } from "react-toastify";
import { Button, Input } from "../../../helper";
import axios from "axios";
import { apiUrl } from "../../../helper/env";
import { useNavigate } from "react-router";

const ResetPassword: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const dispatch = useAppDisptach();
  let authToken = localStorage.getItem("Authorization");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const { getUser } = useAppSelector((state) => state.userSlice);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setPasswordData({ ...passwordData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        !passwordData.currentPassword &&
        !passwordData.newPassword &&
        !passwordData.confirmNewPassword
      ) {
        toast.error("Please Fill the all Fields", {
          autoClose: 700,
          theme: "colored",
        });
      } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        toast.error("passwords must match", {
          autoClose: 700,
          theme: "colored",
        });
      } else if (passwordData.newPassword.length < 5) {
        toast.error("Please enter password with more than 5 characters", {
          autoClose: 700,
          theme: "colored",
        });
      } else {
        const { data } = await axios.post(
          `${apiUrl}/user/password/forgot-password/reset`,
          {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        toast.success("Password Changed Successfully", {
          autoClose: 700,
          theme: "colored",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response.data, { autoClose: 900, theme: "colored" });
    }
  };

  return (
    <div className={classes.resset}>
      <form onSubmit={handleSubmit}>
        <div className={classes.top_resset}>
          <div className={classes.current_pass}>
            <span>Current password</span>
            <Input
              type="password"
              name="currentPassword"
              placeholder="Curent password"
              value={passwordData.currentPassword}
              onChange={handleOnChange}
            />
          </div>
          <div className={classes.password}>
            <span>New password</span>
            <Input
              type="password"
              name="newPassword"
              placeholder="New password"
              value={passwordData.newPassword}
              onChange={handleOnChange}
            />
          </div>
          <div className={classes.confirm_pass}>
            <span>Confirm new password</span>
            <Input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm new password"
              value={passwordData.confirmNewPassword}
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className={classes.button} style={{ display: "flex" }}>
          <Button
            backgroundButton="#3598cc"
            padding="0.9rem 1.2rem"
            color="#ffffff"
            hover="blue"
            buttonFunction={() => {}}
          >
            Update Password
          </Button>
          <span>Cancel</span>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
