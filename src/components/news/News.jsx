import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css, keyframes } from "styled-components";
import "./news.css";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import staticImg from "../assets/static_news.png";

const News = ({ gridActive, blurEffect, listening }) => {
  const [newsData, setNewsData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewsCardClicked, setNewsCardClicked] = useState(false);
  const [isBlur, setBlur] = useState(false);
  const newsPerPage = gridActive ? 6 : 5;
  const totalPages = 3;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getNews = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setNewsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news data:", error);
      setLoading(false);
    }
  };

  const getImages = async () => {
    try {
      const response = await axios.get("https://picsum.photos/v2/list?page=3");
      setImgData(response.data);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const tick = () => {
    setCurrentDateTime(new Date());
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate().toString().padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayOfWeek}, ${day} ${month} ${year}`;
  };

  useEffect(() => {
    getNews();
    getImages();
    const timerID = setInterval(() => tick(), 1000); // Update time every second

    clearInterval(timerID);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;

  const displayedNews = newsData.slice(startIndex, endIndex);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleRemoveNewsItem = (itemId) => {
    const updatedNewsData = newsData.filter((item) => item.id !== itemId);
    setNewsData(updatedNewsData);
  };

  const openStaticPage = () => {
    setNewsCardClicked(!isNewsCardClicked);
    setBlur(!isBlur);
  };

  return (
    <>
      <NewsDiv
        style={{
          marginTop: gridActive ? "100px" : "20px",
          filter: blurEffect || isBlur ? "blur(5px)" : "none", // Apply blur effect based on blurEffect state
          pointerEvents: blurEffect || isBlur ? "none" : "auto",
        }}
      >
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {gridActive ? (
                <GridView>
                  {displayedNews.map((post, index) => (
                    <GridNewsCard
                      onClick={() => {
                        openStaticPage();
                      }}
                      key={post.id}
                    >
                      <div>
                        <p className="title">
                          {post.title.split(" ").slice(0, 4).join(" ")}
                        </p>
                        <div className="body">
                          {post.body.split(" ").slice(0, 4).join(" ")}
                        </div>
                        <p className="time">
                          {formatDate(currentDateTime)},{" "}
                          {formatTime(currentDateTime)}
                        </p>
                      </div>

                      <div>
                        <ImageContainer>
                          <img
                            alt=""
                            style={{
                              height: "80px",
                              width: "100%",
                            }}
                            src={imgData[index]?.download_url}
                          />
                        </ImageContainer>
                        <GridRemoveButton
                          onClick={() => handleRemoveNewsItem(post.id)}
                        >
                          ✕
                        </GridRemoveButton>
                      </div>
                    </GridNewsCard>
                  ))}
                </GridView>
              ) : (
                <ListView>
                  {displayedNews.map((post, index) => (
                    <NewsItem key={post.id}>
                      <NewsContainer>
                        <NewsCard
                          onClick={() => {
                            openStaticPage();
                          }}
                        >
                          <ImageContainer>
                            <img
                              alt=""
                              style={{
                                height: "50px",
                                width: "50px",
                                borderRadius: "60%",
                              }}
                              src={imgData[index]?.download_url}
                            />
                          </ImageContainer>
                          <div>
                            <p className="title">{post.title}</p>
                            <p
                              style={{
                                maxWidth: "900px",
                              }}
                              className="body"
                            >
                              {post.body}...
                            </p>
                            <p className="time">
                              {formatDate(currentDateTime)},{" "}
                              {formatTime(currentDateTime)}
                            </p>
                          </div>
                        </NewsCard>
                        <RemoveButton
                          onClick={() => handleRemoveNewsItem(post.id)}
                        >
                          ✕
                        </RemoveButton>
                      </NewsContainer>
                    </NewsItem>
                  ))}
                </ListView>
              )}
            </>
          )}

          <PaginationContainer>
            <TbPlayerTrackPrev
              onClick={handlePreviousPage}
              style={{
                backgroundColor: currentPage === 1 ? "white" : "#bababb",
                color: currentPage === 1 ? "bababb" : "white",
                padding: "5px 10px",
                margin: "5px",
                border: "1px solid white",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                borderRadius: "50%",
                display: currentPage === 1 ? "none" : "block",
              }}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  backgroundColor:
                    currentPage === index + 1 ? "#bababb" : "white",
                  color: currentPage === index + 1 ? "white" : "black",
                  padding: "5px 10px",
                  margin: "5px",
                  border: "1px solid white",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              >
                {index + 1}
              </button>
            ))}
            <TbPlayerTrackNext
              onClick={handleNextPage}
              style={{
                backgroundColor:
                  currentPage === totalPages ? "white" : "#bababb",
                color: currentPage === totalPages ? "#bababb" : "white",
                padding: "5px 10px",
                margin: "5px",
                border: "1px solid white",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                borderRadius: "50%",
                display: currentPage === totalPages ? "none" : "block",
              }}
            />
          </PaginationContainer>
        </div>
      </NewsDiv>
      {isNewsCardClicked && (
        <StaticDiv
          onClick={() => openStaticPage()}
          className="custom-scrollbar"
        >
          <NewsImg src={staticImg} alt="img" />
        </StaticDiv>
      )}
    </>
  );
};

const fadeInNewsView = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


const NewsDiv = styled.div`
  display: flex;
  justify-content: right;
  margin-left: 450px;

  @media (min-width: 948px) {
    margin-right: 25%;
  }
`;
const NewsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  animation: ${fadeInNewsView} 0.5s ease-in-out;
`;

const GridNewsCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: #e4eaf2;
  width: 250px;
  border-radius: 10px;
  padding: 15px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  justify-content: space-between; // Add this to evenly distribute content

  :hover {
    cursor: pointer;
  }
  .title {
    font-size: 16px;
    font-weight: bold;

    @media (max-width: 864px) {
      font-size: 13px;
    }
  }

  .body {
    flex-grow: 1;
    overflow: hidden;
    height: 60px;
    text-overflow: ellipsis;
    font-size: 14px;
    @media (max-width: 864px) {
      font-size: 12px;
      margin-top: 5px;
    }
  }

  .time {
    font-size: 12px;
    color: #888;
    margin-bottom: 20px;
    @media (max-width: 864px) {
      font-size: 12px;
      margin-top: 5px;
    }
  }
`;

const GridRemoveButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  padding-top: 5px;
  color: #f09794;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 864px) {
    font-size: 12px;
  }
`;

const NewsCard = styled.div`
  :hover {
    cursor: pointer;
  }
  display: flex;
  box-shadow: #e4eaf2;
  width: 1000px;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 50px;
  border-radius: 20px;
  padding-left: 10px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  .title {
    white-space: nowrap;
  }

  .body {
    flex-grow: 1;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const RemoveButton = styled.button`
  background: white;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  color: #f09794;
  margin-left: -20px;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 864px) {
    font-size: 12px;
    margin-left: -40px;
  }
`;
const ListView = styled.div`
  margin-top: 30px;
  animation: ${fadeInNewsView} 0.5s ease-in-out;
`;

const NewsItem = styled.div`
  display: flex;
  border-radius: 20px;

  align-items: center;
`;
const ImageContainer = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StaticDiv = styled.div`
  :hover {
    cursor: pointer;
  }
  animation: ${(props) =>
    !props.isNewsCardClicked && !props.isBlur
      ? css`
          ${fadeIn} 1s ease-in-out
        `
      : props.isNewsCardClicked && props.isBlur
      ? css`
          ${fadeOut} 1s ease-out
        `
      : "none"};

  border-radius: 28px;
  height: 590px;
  left: 500px;
  overflow: scroll;
  overflow-x: hidden;
  position: absolute;
  text-align: center;
  top: 70px;
  width: 950px;
  z-index: 998;
`;

const NewsImg = styled.img`
  height: auto;
  width: 100%;
  opacity: 1;
`;
export default News;
