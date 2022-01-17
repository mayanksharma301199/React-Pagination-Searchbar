import React, { useState, useEffect, useRef } from "react";
import { Pagination, Input } from "antd";
import SinglePost from "./SinglePost";
import styles from './Posts.module.css';

const Posts = () => {
  const [totalPage, setTotalPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [responsedData, setResponsedData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts?_limit=10&_start=0";
    fetchAPI(url);
  }, []);

  const paginationHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
    const url = `https://jsonplaceholder.typicode.com/posts?_limit=10&_start=${
      (pageNumber - 1) * 10
    }`;
    fetchAPI(url);
  };
  const fetchAPI = async (url, searched) => {
    try {
      let data = await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error(error);
        });
      if (searched) {
        setTotalPage(searchedData.length);
        setSearchedData([...data]);
      } else {
        setResponsedData([...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchPost = (event) => {
    if (event.target.value === "") {
      setTotalPage(100);
      const url =
        "https://jsonplaceholder.typicode.com/posts?_limit=10&_start=0";
      fetchAPI(url);
    } else {
      console.log(totalPage);
      let url = `https://jsonplaceholder.typicode.com/posts?title=${event.target.value}`;
      fetchAPI(url, "search");
      setCurrentPage(1);
      url = `https://jsonplaceholder.typicode.com/posts?_limit=10&_start=0&title=${event.target.value}`;
      fetchAPI(url);
    }
  };

  return (
    <>
      <div
        className={styles['posts_container']}
      >
        <Input
          type="text"
          onChange={searchPost}
          className={styles['posts_input']}
          placeholder="Search with title"
        ></Input>

        {responsedData.length <= 5 && (
          <div className={styles['posts_display']}>
            {responsedData.map((singlePost) => {
              return (
                <SinglePost
                  key={singlePost.id}
                  title={singlePost.title}
                  post={singlePost.body}
                />
              );
            })}
          </div>
        )}

        {responsedData.length > 5 && (
          <>
            <div className={styles['posts_display']}>
              {responsedData.slice(0, 5).map((singlePost) => {
                return (
                  <SinglePost
                    key={singlePost.id}
                    title={singlePost.title}
                    post={singlePost.body}
                  />
                );
              })}
            </div>
            <div className={styles['posts_display']}>
              {responsedData
                .slice(5, responsedData.length)
                .map((singlePost) => {
                  return (
                    <SinglePost
                      key={singlePost.id}
                      title={singlePost.title}
                      post={singlePost.body}
                    />
                  );
                })}
            </div>
          </>
        )}

        {totalPage !== 0 && (
          <Pagination
            current={currentPage}
            onChange={paginationHandler}
            className={styles['posts_pagination']}
            defaultCurrent={1}
            total={Math.ceil(totalPage / 10) * 10}
            showSizeChanger={false}
          />
        )}
      </div>
    </>
  );
};

export default Posts;
