import React from "react";
import { useParams ,Link} from "react-router-dom";
import { useState,useEffect } from "react";
import SimilarAuthor from "../level3/SimilarAuthor";
import RecommendedPosts from "../level3/RecommendedPosts";
import NavBar from './NavBar'
import readingTime from '../level5/readingTime';
import SaveForLater from "../level5/SaveForLater";
import { getDateString } from "./Post";
const PostDetails = () => {
  const params= useParams();
  const [post,setPost]=useState({});
  const [loading,setLoading]=useState(true);
  const [similar,setSimilar]=useState(true);
  const [readTime,setReadTime]=useState(0);
  useEffect(()=>{
    setLoading(true);
    try{
      const url=`http://localhost:3000/articles/${params.id}`;
      const getRequest=async ()=>{
        const options = {
          method: 'GET',
          headers: new Headers({'content-type': 'application/json'
          })};
        const data=await fetch(url,options);
        const getPosts=await data.json();
        setPost(getPosts);
        //console.log(posts);
      }  
      getRequest();
    }
    catch (err){
        console.log(err);
    }
    setLoading(false);
},[params.id])

  if (loading) {
    return <div>Post not found</div>;
  }
  const clickHandler=()=>{

  }

  return (
    <div className="details-container">
      <NavBar hideFilter={true}/><br />
      {post.topic!==undefined &&<span className="post-topic">{post.topic}</span>}
      <h1>{post.title}</h1>
      <div className="flex">
        <p className="flex-item">Author: {post.author} </p>
        <button className="flex-item" onClick={clickHandler}>Follow author</button>

      </div>
      <div className="flex">
        <div className="flex-item"> {`  ${readTime}`} min read</div>
        <p className="flex-item">Date: {getDateString(post.datetime)}</p>
      </div>
      
      <div >
      <div className="flex space-between">
        <div>
          <svg className="flex-item" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
          <svg className="flex-item" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
       
        </div>
        <div className='navbar-right'>
          <SaveForLater />
          <Link to={`/edit/${post.id}`}>
            <svg className="flex-item" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>                  
          </Link>
        </div>

      </div>
      <br />
      <br />
      <img src={post.image} style={{ width: '100%', height: 'auto' ,maxHeight:'400px'}} />
      <br />
      <p>{post.text}</p>
      
      <br />
      <div className="flex space-between pointer">
      <span onClick={()=>setSimilar(true)}>Similar posts </span>
      <span onClick={()=>setSimilar(false)}>Recommended posts</span>
      </div>
      <br />
      {similar&& <SimilarAuthor author={post.author} id={post.id}/>}
      {!similar &&<RecommendedPosts />}
    </div>
    </div>
  );
};

export default PostDetails;
