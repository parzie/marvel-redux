import React, { Component } from 'react';
const CharacterBoxItem = ({character}) => {
  if (!character) {
    return <div>Loading....</div>;
  }
  console.log("hero: "+character.name);
  const characterId = character.id;
  //const url = 'http://gateway.marvel.com/v1/public/characters/'+characterId+'?apikey=0bdc034cdac9e6bba2b885bbc39ce440&hash=2ed41249ca3bf735686e581fb9b20718&ts=1490815685786';

  return (
    <div className="video-detail">
        {/* <iframe className="embed-responsive-item" src={url}></iframe> */}
        <div>{characterId}</div>
      
      <div className="details">
        <div>{character.name}</div>
        <div>{character.description}</div>
      </div>
    </div>
  );

}

export default CharacterBoxItem;