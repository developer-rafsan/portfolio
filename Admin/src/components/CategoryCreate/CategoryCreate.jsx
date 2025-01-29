import React, { useState } from "react";
import styles from "./categoryCreate.module.css";
import { categoryCreateApi } from "../../Services/apiCall";
import toast from "react-hot-toast";

export const CategoryCreate = ({ categoryOpen }) => {
  const [inputData, setInputData] = useState({
    category: "",
    password: "",
  });

  const handelerSubmit = async () => {
    if (!inputData.category || !inputData.password)
      return toast.error("must be requer category and password");
    const response = await categoryCreateApi(inputData);
    if (response.status === 200) {
      setInputData({
        category: "",
        password: "",
      });
      return toast.success(response.data.message);
    }

    return toast.error(response.message);
  };

  const handelerInpur = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  return (
    <div className={styles.categoryForm}>
      <input
        name="category"
        onChange={handelerInpur}
        type="text"
        placeholder="enter categoty name"
      />
      <input
        name="password"
        onChange={handelerInpur}
        type="password"
        placeholder="enter password"
      />
      <button onClick={handelerSubmit} type="button">
        create
      </button>
    </div>
  );
};
