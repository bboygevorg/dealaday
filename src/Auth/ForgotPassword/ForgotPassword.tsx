import React, { useState, FormEvent } from "react";
import classes from "./forgotPassword.module.scss";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo_nav.png";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSentMail, setIsSentMail] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const sendEmail = await axios.post(
        "http://localhost:5000/user/password/forgot-password",
        { email: email }
      );
      toast.success(sendEmail.data.msg, { autoClose: 900, theme: "colored" });
      setIsSentMail(true);
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        autoClose: 900,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className={classes.container}>
        {!isSentMail ? (
          <div className={classes.forgot}>
            <Link to="/">
              <div className={classes.forgot_icon}>
                <img src={logo} alt="dealaday" />
              </div>
            </Link>
            <div className={classes.forgot_info}>
              <h2>Forgot your password?</h2>
              <p>
                Enter your email address and we will send you instructions to
                reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className={classes.forgot_info_email}>
                  <span>Email</span>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={classes.login_info_button}>
                  <input type="submit" value="Continue" />
                </div>

                <div className={classes.back_login}>
                  <Link to="/login">
                    <span>Back To Login</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className={classes.succesfully}>
            <span>Email Sent Succesfully</span>
            <a
              href="https://mail.google.com/mail/"
              target="_blank"
              rel="noreferrer"
            >
              <button>Open Mail</button>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
