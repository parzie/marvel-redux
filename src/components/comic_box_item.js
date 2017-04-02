import React, { Component } from 'react';

const ComicBoxItem = ({comic, openModal, isFavoriteComicList, removeFromFavorites}) => {
  if (!comic) {
    return <div>Loading....</div>;
  }
  const comicId = comic.id;
  return (
    <li className="comic-detail">
        <div>{comicId}</div>
      
      <div className="">
        
        <a href="#" onClick={() => {openModal(comic)}}>{comic.title}</a>
        
      </div>
      {isFavoriteComicList && <button  onClick={() => {removeFromFavorites(comic)}}>X</button>}
    </li>
  );

}

export default ComicBoxItem;