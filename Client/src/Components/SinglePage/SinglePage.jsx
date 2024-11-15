import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./singlepage.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaGithub } from "react-icons/fa6";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { downloadApi, getSinglePageApi } from "../../Services/allAPI";

// import Swiper core and required modules
import { Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const SinglePage = () => {
  const [pageData, setPageData] = useState();
  const [isLoading, setloading] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  // fatch data from back-end
  const fatchSinglepageData = async () => {
    setloading(true);
    const response = await getSinglePageApi(id);
    setPageData(response.data.data);
    setloading(false);
  };

  // download file
  const downloadFile = async()=> {
    const response = await downloadApi(id);        
    const aTag = document.createElement('a')
    aTag.href = response.config.url
    aTag.setAttribute("download", "source-code")
    document.body.appendChild(aTag)
    aTag.click()
    aTag.remove()
  }

  useEffect(() => {
    fatchSinglepageData();
  }, [id]);

  return (
    <>
      {!isLoading && (
        <section id={styles.singlePage}>
          <div id="wrap">
            {/* go to back button */}
            <button id={styles.backButton} onClick={() => history("/project")}>
              <MdArrowBackIosNew />
              Back Project page
            </button>

            <div className={styles.contentSection}>
              <div className={styles.imageGroup}>
                {/* image slider */}
                <Swiper
                  // install Swiper modules
                  modules={[Pagination, A11y, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                >
                  {pageData?.image?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={item.url} alt="porject image" />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* image slider */}

                <div className={styles.buttonGroup}>
                  <div className={styles.title}>
                    {pageData?.title} <br />
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "50px",
                      }}
                    >
                      <p>{pageData?.auther}</p> <p>{pageData?.date}</p>
                    </span>
                  </div>
                  <div className={styles.buttons}>
                    {/* live view button */}
                    {pageData?.liveview && (
                      <a target="_Blank" href={pageData?.liveview}>
                        <button>
                          <GrView />
                        </button>
                      </a>
                    )}
                    {/* git link button */}
                    {pageData?.git && (
                      <a target="_Blank" href={pageData?.git}>
                        <button>
                          <FaGithub />
                        </button>
                      </a>
                    )}
                    {/* file downlode button */}
                    {pageData?.file && (
                      <button onClick={downloadFile}>
                          <FaCloudDownloadAlt />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* discription option */}
              <div className={styles.discription}>
                <span
                  dangerouslySetInnerHTML={{ __html: pageData?.description }}
                ></span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
