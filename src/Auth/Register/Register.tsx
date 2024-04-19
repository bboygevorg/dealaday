import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import classes from "./register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo_nav.png";
import { toast } from "react-toastify";
import axios from "axios";

import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { apiUrl } from "../../helper/env";

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

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
      } else if (emailRegax.test(credentials.email) === false) {
        toast.error("Please enter valid email", {
          autoClose: 900,
          theme: "colored",
        });
      } else if (credentials.password.length < 5) {
        toast.error("Please enter password with more than 5 characters", {
          autoClose: 900,
          theme: "colored",
        });
      } else if (credentials.email && credentials.password) {
        const sendAuth = await axios.post(`${apiUrl}/user/auth/register`, {
          email: credentials.email,
          password: credentials.password,
        });
        const recieve = await sendAuth.data;
        if (recieve.success === true) {
          toast.success("Registered Successfully", {
            autoClose: 900,
            theme: "colored",
          });
          localStorage.setItem("Authorization", recieve.authToken);
          navigate("/");
        } else {
          toast.error("Something went wrong, Please try again", {
            autoClose: 900,
            theme: "colored",
          });
          navigate("/");
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.error, {
        autoClose: 900,
        theme: "colored",
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.create}>
        <Link to="/">
          <div className={classes.create_icon}>
            <img src={logo} alt="dealAday" />
          </div>
        </Link>
        <div className={classes.create_info}>
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className={classes.create_info_email}>
              <span>Email</span>
              <input
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                value={credentials.email}
                onChange={handleOnChange}
              />
            </div>
            <div className={classes.create_info_password}>
              <span>Password</span>
              <input
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

            <div className={classes.create_info_button}>
              <input type="submit" value="Create Accaunt" />
            </div>

            <div className={classes.login}>
              <Link to="/login">
                Already have an Account? <span>Login up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
