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
        <img src={character.thumbnail.path+"."+character.thumbnail.extension} alt={character.name} />
        <h3>{character.name}</h3>
        <div className="description"><p>{character.description}</p><button>view more</button></div>
      <div className="details">
        
        
        <a  href="#" onClick={() => {
          onClickCharacter(character, 4);
      }}><h4>Related Comics</h4></a>
        <div className="related-comics">
          {comicItems}
        </div>
      </div>
      
    </div>
  );

  

}

export default CharacterBoxItem;