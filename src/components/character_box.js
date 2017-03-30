import React, { Component } from 'react';
import CharacterBoxItem from './character_box_item';


const CharacterBox = (props) => {
  const characterItems = props.characters.map((character) => {
    return <CharacterBoxItem
      key={character.id}
      character={character} />
  });
  return (
    <ul className="col-md-4 list-group">
      {characterItems}
    </ul>
  );
};

export default CharacterBox;