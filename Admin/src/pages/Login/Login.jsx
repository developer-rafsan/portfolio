import React, { useState } from "react";
import styles from "./login.module.css";
import toast, { Toaster } from "react-hot-toast";
import { loginApi } from "../../Services/apiCall";

export const Login = ({ setAdminLogin }) => {
  const [inputFill, setInputFill] = useState({
    email: "developer.rafsanx@gmail.com",
    password: "@Rafsan",
  });
  const [loading, setLoading] = useState(false);

  const submitHandeler = async (e) => {
    e.preventDefault();

    if (!inputFill.email || !inputFill.password)
      return toast.error("Mast Require Email and Password");

    setLoading(true);
    const response = await loginApi(inputFill);

    if (response.status !== 200) {
      setLoading(false);
      return toast.error(response.message);
    }

    setLoading(false);
    setAdminLogin(true);
    return toast.success(response.data.message);
  };

  const inputHandeler = (e) => {
    const { name, value } = e.target;
    setInputFill({
      ...inputFill,
      [name]: value,
    });
  };

  return (
    <section id={styles.loginSection}>
      <form onSubmit={submitHandeler}>
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          onChange={inputHandeler}
          value={inputFill.email}
        />
        <input
          type="password"
          placeholder="enter your password"
          name="password"
          onChange={inputHandeler}
          value={inputFill.password}
        />
        <button type="submit">{loading ? "loading..." : "login"}</button>
      </form>
      <Toaster />
    </section>
  );
};
