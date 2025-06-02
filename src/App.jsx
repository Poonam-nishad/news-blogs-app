import React, { useEffect, useState } from "react";
import News from "./component/News";
import Blogs from "./component/Blogs";

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  }, []);

  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlog) => {
      const updatedBlog = isEdit
        ? prevBlog.map((blog) => (blog === selectedPost ? newBlog : blog))
        : [...prevBlog, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlog));
      return updatedBlog;
    });
    setEditing(false);
    setSelectedPost(null);
  };
  const handleEditBlog = (blog) => {
    setSelectedPost(blog);
    setEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };
  const handleDeleteBlog = (blogToDelete) =>{
    setBlogs((prevBlogs)=>{
      const updatedBlogs = prevBlogs.filter((blog)=> blog!== blogToDelete)
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
  }
  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };
  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setEditing(false);
  };

  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            onDeleteBlog = {handleDeleteBlog}
          />
        )}

        {showBlogs && (
          <Blogs
            onBack={handleBackToNews}
            onCreateBlog={handleCreateBlog}
            editPost={selectedPost}
            isEditing = {editing}
          />
        )}
      </div>
    </div>
  );
}

export default App;
