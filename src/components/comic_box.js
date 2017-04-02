import React, { Component } from 'react';
import ComicBoxItem from './comic_box_item';


const ComicBox = (props) => {
  const comicItems = props.comics.map((comic) => {
    return <ComicBoxItem
      key={comic.id}
      comic={comic} 
      isFavoriteComicList={props.isFavoriteComicList}
      removeFromFavorites = {props.removeFromFavorites}
      />
  });
  return (
    <ul className="">
      {comicItems}
    </ul>
  );
};

export default ComicBox;