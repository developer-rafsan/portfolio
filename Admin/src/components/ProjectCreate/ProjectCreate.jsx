import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryCreate } from "../CategoryCreate/CategoryCreate";
import styles from "./projectCreate.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { categoryGetApi, projectCreateApi } from "../../Services/apiCall";
import toast, { Toaster } from "react-hot-toast";

export const ProjectCreate = () => {
  // store temp project data
  const [inputData, setInputData] = useState({
    title: "",
    git: "",
    liveview: "",
    category: "",
    description: "",
    thumbnail: [],
    file: [],
    image: [],
  });
  const [category, setCategory] = useState([]); // store category data
  const [loading, setLoading] = useState(false); // loading state
  const [categoryOpen, setcategoryOpen] = useState(false); // loading state

  const navigate = useNavigate();

  // jodit editor
  const editor = useRef(null);

  // delete image and file form local store
  const imageDeleteHandeler = (arrey, index, name) => {
    const stor = arrey.splice(index, 1);
    setInputData({
      ...inputData,
      [name]: [...arrey],
    });
  };

  // store content data from state
  function changeHandeler(event) {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  // store image and file handeler
  function handleImage(event) {
    const { name, files } = event.target;
    setInputData({
      ...inputData,
      [name]: [...files],
    });
  }

  // create projrct in bank-end
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // content formData
    formData.append("title", inputData.title);
    formData.append("git", inputData.git);
    formData.append("liveview", inputData.liveview);
    formData.append("category", inputData.category);
    formData.append("description", inputData.description);

    // file and image formData
    inputData.file?.map((item) => formData.append("file", item));
    inputData.thumbnail?.map((item) => formData.append("thumbnail", item));
    inputData.image?.map((item) => formData.append("image", item));

    // axios post back-end call
    const response = await projectCreateApi(formData);

    setLoading(false);

    if (response.status === 200) {
      setInputData({
        title: "",
        git: "",
        liveview: "",
        category: "",
        description: "",
        thumbnail: [],
        file: [],
        image: [],
      });
      return toast.success("project uplode");
    }
  };

  // fatch category from back-end api
  const fatchCategory = async () => {
    const response = await categoryGetApi();
    if (response.status === 200) setCategory(response.data.data);
  };

  useEffect(() => {
    fatchCategory();
  }, []);

  return (
    <section className={styles.projectCreate}>
      <div id="wrap">
        <h1>project Upload form</h1>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <IoIosArrowBack /> go to Dashbord
        </button>
        <form onSubmit={handleSubmit}>
          {/* title inpur section */}
          <input
            name="title"
            type="text"
            placeholder="enter titel"
            onChange={changeHandeler}
            value={inputData.title}
          />

          {/* git inpur section */}
          <input
            name="git"
            type="text"
            placeholder="git link"
            onChange={changeHandeler}
            value={inputData.git}
          />

          {/* liveview inpur section */}
          <input
            name="liveview"
            type="text"
            placeholder="liveview"
            onChange={changeHandeler}
            value={inputData.liveview}
          />

          {/* category inpur section */}
          <div className={styles.categoryBox}>
            <select onChange={changeHandeler} name="category" id="category">
              <option> -- Please choose an category -- </option>
              {category?.map((item) => (
                <option key={item._id} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
            <div className={styles.addCategory}>
              {categoryOpen && <CategoryCreate categoryOpen={categoryOpen} />}

              <button
                type="button"
                onClick={() => setcategoryOpen(!categoryOpen)}
              >
                + add category
              </button>
            </div>
          </div>

          {/* description inpur section */}
          <JoditEditor
            ref={editor}
            value={inputData.description}
            onChange={(newContent) =>
              setInputData({
                ...inputData,
                description: newContent,
              })
            }
          />

          <div className={styles.FileUpload}>
            {/* file upload inpur section */}
            <div id={styles.fileUpload}>
              <label htmlFor="file">file uplode</label>
              <input id="file" name="file" type="file" onChange={handleImage} />

              {inputData.file?.map((item, index) => (
                <ul key={index}>
                  <li>
                    {item.name.substring(0, 30)}...
                    <button
                      onClick={() =>
                        imageDeleteHandeler(inputData.file, index, file)
                      }
                    >
                      X
                    </button>
                  </li>
                </ul>
              ))}
            </div>

            {/* thumbnail upload inpur section */}
            <div id={styles.thumbnailUpload}>
              <label htmlFor="thumbnail">thumbnail uplode</label>
              <input
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                type="file"
                onChange={handleImage}
              />

              {inputData.thumbnail?.map((item, index) => (
                <ul key={index}>
                  <li>
                    {item.name.substring(0, 30)}...
                    <button
                      onClick={() =>
                        imageDeleteHandeler(
                          inputData.thumbnail,
                          index,
                          thumbnail
                        )
                      }
                    >
                      X
                    </button>
                  </li>
                </ul>
              ))}
            </div>

            {/* image upload inpur section */}
            <div id={styles.imageUpload}>
              <label htmlFor="image">image upload</label>
              <input
                multiple
                id="image"
                name="image"
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
              {inputData.image?.map((item, index) => (
                <ul key={index}>
                  <li>
                    {item.name.substring(0, 30)}...
                    <button
                      onClick={() =>
                        imageDeleteHandeler(inputData.image, index, image)
                      }
                    >
                      X
                    </button>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          {/* submet button */}
          <button className={styles.uploadButton} type="submit">
            {!loading ? "Upload" : "loading..."}
          </button>
        </form>
      </div>
      <Toaster />
    </section>
  );
};
