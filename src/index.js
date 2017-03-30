import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import CharacterBox from './components/character_box';
var $ = require('jquery');
var endpoint = "http://gateway.marvel.com:80/v1/public/";
const PUBLIC_KEY = '';
const PRIVATE_KEY = '';

// Create a new component. This component should produce some HTML
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      selectedCharacter: null
    };

    this.characterSearch('');
  }

  characterSearch(term) {
    var url = '';
    if(term){
      url = 'http://gateway.marvel.com/v1/public/characters?nameStartsWith='+term+'&apikey=0bdc034cdac9e6bba2b885bbc39ce440&hash=2ed41249ca3bf735686e581fb9b20718&ts=1490815685786';
    }else{
      url = 'http://gateway.marvel.com/v1/public/characters?apikey=0bdc034cdac9e6bba2b885bbc39ce440&hash=2ed41249ca3bf735686e581fb9b20718&ts=1490815685786'
    }
    return $.getJSON(url)
      .then((data, characters) => {
        console.log("data.results: "+data.data.results[0].name);
        this.setState({ 
          characters: data.data.results,
          selectedCharacter: data.data.results[0]
         });
      });

  }

  render() {
    const Search = _.debounce((term) => { this.characterSearch(term) }, 300);
    console.log("what?: "+this.state.selectedCharacter);
    return (
      <div>
        <SearchBar onSearchTermChange={this.characterSearch.bind(this)}/>
        <CharacterBox
          characters={this.state.characters} />
        {/*<CharacterBox character={this.state.selectedCharacter} />*/}
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
