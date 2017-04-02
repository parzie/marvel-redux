import React, { Component } from 'react';
import CharacterBoxItem from './character_box_item';


const CharacterBox = (props) => {
  const characterItems = props.characters.map((character) => {
    //console.log("id: "+character.id);
    
    return <CharacterBoxItem
      character={character}
      key={character.id}
      onClickCharacter={props.onClickCharacter} 
      comics={props.comics}
      selectedCharacter = {props.selectedCharacter}
      openModal = {props.openModal}
      />
  });
  return (
    <ul className="">
      {characterItems}
    </ul>
  );
};


export default CharacterBox;