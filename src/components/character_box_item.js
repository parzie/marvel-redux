import React, { Component } from 'react';
import ComicBoxItem from './comic_box_item';
const CharacterBoxItem = ({character, onClickCharacter, comics, selectedCharacter, openModal, removeFromFavorites}) => {
  if (!character) {
    return <div>Loading....</div>;
  }
  //console.log("character: "+character.name);
  const characterId = character.id;
  const comicItems = comics.map((comic) => {
  if(character==selectedCharacter){  
    return <ComicBoxItem
      key={comic.id}
      comic={comic} 
      openModal={openModal}
      removeFromFavorites={removeFromFavorites}/>
  }

  });

  return (
    <div className="character-detail" >
        <div>{characterId}</div>
      
      <div className="details">
        <div>{character.name}</div>
        <div>{character.description}</div>
        <a href="#" onClick={() => {
          onClickCharacter(character);
      }}>Related Comics</a>
        <ul className="">
          {comicItems}
        </ul>
      </div>
      
    </div>
  );

  

}

export default CharacterBoxItem;