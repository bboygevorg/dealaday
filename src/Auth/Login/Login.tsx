import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import classes from "./login.module.scss";

import logo from "../../assets/img/logo_nav.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../helper/env";
import { Button, Input } from "../../helper/index";
import { useAppDisptach } from "../../redux/store/hook";
import { getUserData } from "../../redux/userSlice/userSlice";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useAppDisptach();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let auth = localStorage.getItem("Authorization");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    let emailRegax =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    try {
      if (!credentials.email && !credentials.password) {
        toast.error("All fields are required", {
          autoClose: 900,
          theme: "colored",
        });
      } else if (!emailRegax.test(credentials.email)) {
        toast.error("Please enter a valid email", {
          autoClose: 900,
          theme: "colored",
        });
      } else if (credentials.password.length < 5) {
        toast.error("Please enter valid password", {
          autoClose: 900,
          theme: "colored",
        });
      } else if (credentials.email && credentials.password) {
        const sendAuth = await axios.post(`${apiUrl}/user/auth/login`, {
          email: credentials.email,
          password: credentials.password,
        });
        const receive = await sendAuth.data;
        if (receive.success === true) {
          toast.success("Login Succesfully", {
            autoClose: 900,
            theme: "colored",
          });
          localStorage.setItem("Authorization", receive.authToken);

          const expirationTime = new Date().getTime() + 3600 * 1000;
          localStorage.setItem("tokenExpiration", expirationTime.toString());
          dispatch(getUserData());
          const currentTime = new Date().getTime().toString();
          localStorage.setItem("lastActivity", currentTime);

          if (from === "/basket") {
            navigate("/basket");
          } else {
            navigate("/");
          }
        } else {
          toast.error("Something went wrong, Please try again", {
            autoClose: 900,
            theme: "colored",
          });
          navigate("/");
        }
      }
    } catch (error: any) {
      error.response.data.length === 1
        ? toast.error(error.response.data.error, {
            autoClose: 900,
            theme: "colored",
          })
        : toast.error(error.response.data.error, {
            autoClose: 900,
            theme: "colored",
          });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.login}>
        <Link to="/">
          <div className={classes.login_icon}>
            <img src={logo} alt="dealAday" />
          </div>
        </Link>
        <div className={classes.login_info}>
          <h2>Log into your account</h2>
          <form onSubmit={handleSubmit}>
            <div className={classes.login_info_email}>
              <span>Email</span>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleOnChange}
              />
            </div>
            <div className={classes.login_info_password}>
              <span>Password</span>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={credentials.password}
                onChange={handleOnChange}
              />
              <span
                className={classes.icon_pass}
                onClick={handleClickShowPassword}
              >
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </span>
            </div>

            <div className={classes.login_info_forgot}>
              <Link to="/forgot">
                <span>Forgot your password?</span>
              </Link>
            </div>

            <div className={classes.login_info_button}>
              <Button
                padding="0.9rem 1.2rem"
                backgroundButton="#3598cc"
                color="#ffffff"
                hover="blue"
                buttonFunction={() => "login"}
              >
                Login
              </Button>
            </div>

            <div className={classes.sign}>
              <Link to="/register">
                Don't have an account? <span>Sign up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
