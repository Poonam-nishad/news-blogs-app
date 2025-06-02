import React from "react";
import "./Modal.css";
import "./Bookmarks.css";
// import NoImg from "../assets/images/No_Image.jpg";

const Bookmarks = ({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmark,
}) => {
  if(!show){
    return null
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className="bookmarks-heading">Bookmarked News</h2>
        <div className="bookmarks-list">
          {bookmarks.map((article, index)=>(

          <div key={index} className="bookmarks-item" onClick={()=>onSelectArticle(article )}>
            <img src={article.image  || NoImg} alt={article.title} />
            <h3 className="title">
              {article.title}
            </h3>
            <span className="delete-button" onClick={(e)=>{
              e.stopPropagation()
              onDeleteBookmark(article)
              }}>
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
