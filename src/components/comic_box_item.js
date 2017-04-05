import React, { Component } from 'react';

const ComicBoxItem = ({comic, openModal, isFavoriteComicList, removeFromFavorites}) => {
  if (!comic) {
    return <div>Loading....</div>;
  }
  const comicId = comic.id;
  return (
    <div className="comic-box-item">
      {isFavoriteComicList ?
      <div className="center">
        <img className="comic-image" src={comic.thumbnail.path+"."+comic.thumbnail.extension} />
        <a className="remove" href="#" onClick={() => {removeFromFavorites(comic)}}></a>  
        <h4 href="#" onClick={() => {openModal(comic)}}>{comic.title}</h4>
      </div>:
      <div className="comic-detail">
        <a href="#" onClick={() => {openModal(comic)}}>{comic.title}</a>
      </div>
      }    
    </div>
  );

}

export default ComicBoxItem;