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
    <div>
    <h2><img src="/src/images/icons/favourites.png" />My favourites</h2>
    <div >
      {comicItems}
    </div>
    </div>
  );
};

export default ComicBox;