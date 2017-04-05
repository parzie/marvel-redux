import React, { Component } from 'react';
import CharacterBoxItem from './character_box_item';


const CharacterBox = (props) => {
  const characterItems = props.characters.map((character) => {
    console.log("Character: "+character.name);
    //props.onClickCharacter(character, 4);

    
    return <CharacterBoxItem
      character={character}
      key={character.id}
      onClickCharacter={props.onClickCharacter} 
      comics={props.comics}
      //comics={props.getComics(character, 1)}
      selectedCharacter = {props.selectedCharacter}
      openModal = {props.openModal}
      />
  });
  return (
    <div className="character-box">
    
    <ul>
      {characterItems}
    </ul>
    </div>
  );
};


export default CharacterBox;