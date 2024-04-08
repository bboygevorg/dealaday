import React, { useState, FormEvent } from "react";
import classes from "./addNewPassword.module.scss";

import logo from "../../assets/img/logo_nav.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleClickShowPassword = (field: string) => {
    if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password mismatch", { autoClose: 900, theme: "colored" });
      }

      const { data } = await axios.post(
        `http://192.168.1.68:5000/user/password/forgot-password/${id}/${token}`,
        { newPassword: password }
      );

      console.log(data);
      if (data.msg.name == "TokenExpiredError") {
        toast.error("Token is expired Please try again", {
          autoClose: 900,
          theme: "colored",
        });
      } else {
        toast.success(data.msg, { autoClose: 900, theme: "colored" });
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        autoClose: 900,
        theme: "colored",
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.add}>
        <Link to="/">
          <div className={classes.add_icon}>
            <img src={logo} alt="dealaday" />
          </div>
        </Link>
        <div className={classes.add_info}>
          <h2>Forgot your password?</h2>
          <p>
            Enter your email address and we will send you instructions to reset
            your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className={classes.add_password}>
              <span>New Password</span>
              <input
                type={showNewPassword ? "text" : "password"}
                value={password}
                name="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={classes.icon_pass}
                onClick={() => handleClickShowPassword("new")}
              >
                {showNewPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </span>
            </div>
            <div className={classes.add_password}>
              <span>Confirm new Password</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                value={confirmPassword}
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className={classes.icon_pass}
                onClick={() => handleClickShowPassword("confirm")}
              >
                {showConfirmPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </span>
            </div>

            <div className={classes.add_info_button}>
              <input type="submit" value="Change Password" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPassword;
