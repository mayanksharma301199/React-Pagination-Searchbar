import React, { useState, useEffect, useRef } from "react";
import { Pagination} from "antd";
import SinglePost from './SinglePost';

const Posts = () => {

    const [totalPage, setTotalPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [responsedData, setResponsedData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);

    useEffect(() => {

        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10&_start=0';
        fetchAPI(url);
    
    }, []);

    const paginationHandler = (pageNumber) => {
        setCurrentPage(pageNumber);
        const url = `https://jsonplaceholder.typicode.com/posts?_limit=10&_start=${((pageNumber - 1) * 10)}`;
        fetchAPI(url);
    };
    const fetchAPI = async(url, searched) => {

        try {

            let data = await fetch(url)
            .then((response) => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error(error);
            });
            if(searched){
                setTotalPage(searchedData.length);
                setSearchedData([...data]);
            }
            else{
                setResponsedData([...data]);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const searchPost = (event) => {

        if (event.target.value === ""){
            setTotalPage(100);
            const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10&_start=0';
            fetchAPI(url);
        }
        else{
            console.log(totalPage);
            let url = `https://jsonplaceholder.typicode.com/posts?title=${event.target.value}`;
            fetchAPI(url, "search")
            setCurrentPage(1)
            url = `https://jsonplaceholder.typicode.com/posts?_limit=10&_start=0&title=${event.target.value}`;
            fetchAPI(url);
        }


    };

  return (<>
    {/* <div style={{textAlign:"center", padding:"30px"}}>
      {responsedData !== [] && responsedData.map((singlePost) => {
        return <SinglePost key={singlePost.id} title = {singlePost.title} post = {singlePost.body} />
      })}
      <Pagination onChange={paginationHandler} style={{padding:"20px"}} defaultCurrent={1} total={200} showSizeChanger={false} />
    </div> */}
    {/* <SinglePost /> */}

    <div style={{paddingTop:"5px", textAlign:"center", paddingBottom:"0px"}}>

    <input type="text" onChange={searchPost} style={{width:"25rem"}} placeholder="Search with text"></input>

    {
        responsedData.length <= 5 && <div style={{display:"flex", paddingTop:"20px"}}>
        {
            responsedData.map((singlePost) => {
            return <SinglePost key={singlePost.id} title = {singlePost.title} post = {singlePost.body} />})
        }
        </div>
    }

    {
        responsedData.length > 5 && <><div style={{display:"flex", paddingTop:"20px"}}>
        {
    
            responsedData.slice(0, 5).map((singlePost) => {
            return <SinglePost key={singlePost.id} title = {singlePost.title} post = {singlePost.body} />})

        }
        </div>
        <div style={{display:"flex", paddingTop:"20px"}}>
        {
    
            responsedData.slice(5, responsedData.length).map((singlePost) => {
            return <SinglePost key={singlePost.id} title = {singlePost.title} post = {singlePost.body} />})

        }
        </div>
        </>
    }

      {
        (totalPage !== 0) && <Pagination current={currentPage} onChange={paginationHandler} style={{margin:"auto", width:"fit-content", padding:"30px"}} defaultCurrent={1} total={((Math.ceil(totalPage/10)) * 10 )} showSizeChanger={false} />
      }

    </div>
    </>
  );
};

export default Posts;