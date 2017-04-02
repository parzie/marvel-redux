import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import CharacterBox from './components/character_box';
import ComicBox from './components/comic_box';
import Modal from 'react-modal';
import Pager from 'react-pager';
import CryptoJS from 'crypto-js';

var $ = require('jquery');
const PUBLIC_KEY = '0bdc034cdac9e6bba2b885bbc39ce440';
const PRIVATE_KEY = '7bef8636014521f17dd93e22e22ee9ff78572963';
var hash;
var ts;


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



// Create a new component. This component should produce some HTML
class App extends React.Component {

  constructor(props) {
    super(props);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    //
    ts = new Date().getTime(),
    hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString(),

    this.state = {
      total:       11,
      visiblePage: 5,
      current:     0,

      characters: [],
      comics: [],
      selectedCharacter: null,
      selectedComic: null,
      modalIsOpen: false,
      favoriteComics: [],
      isFavoriteComicList: false,
      term : null,

      
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.characterSearch('');
  }

  handlePageChanged(newPage) {
        this.state.current = newPage;
        if(this.term){
          this.characterSearch(this.term);
        }else{
          this.characterSearch("");
        }
    }

  openModal(comic) {
    this.setState({modalIsOpen: true});
    this.selectedComic = comic;
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  addToFavorites(comic){
    if(!this.favoriteComics){
      this.favoriteComics = [];
    }else{
      this.favoriteComics = JSON.parse(localStorage.getItem('favoriteComics'));
    }
    if(comic){        
      this.favoriteComics.push(comic);
      localStorage.setItem('favoriteComics', JSON.stringify(this.favoriteComics));  
    }
    console.log("fav comics: "+ this.favoriteComics);
    
  }

  getFavorites(){
    
    this.favoriteComics  = JSON.parse(localStorage.getItem("favoriteComics"));
    console.log("fav comics: "+ this.favoriteComics);

  }

  removeFromFavorites(comic){
    if(comic){
      console.log("removing...");
      this.favoriteComics = this.favoriteComics.filter((c) => c.id !== comic.id);
      localStorage.setItem('favoriteComics', JSON.stringify(this.favoriteComics));  
    }

  }

  isAddedToFavorites(comic){
    if(comic){
      return !!this.favoriteComics.find((c) => c.id === comic.id);
    }
  }


  characterSearch(term) {
    this.term = term;
    this.getFavorites();
    var url = '';
    var offset;
    console.log("offset"+this.state.current );
    if(this.state.current > 0){
      offset = this.state.current + 10;
    }else{
      offset = this.state.current;
    }
    if(term){
      url = 'http://gateway.marvel.com/v1/public/characters?nameStartsWith='+term+'&offset='+offset+'&limit=10&apikey='+PUBLIC_KEY+'&hash='+hash+'&ts='+ts+'';
    }else{
      url = 'http://gateway.marvel.com/v1/public/characters?offset='+offset+'&limit=10&apikey='+PUBLIC_KEY+'&hash='+hash+'&ts='+ts+'';
    }
    return $.getJSON(url)
      .then((data, characters) => {
        console.log("first character: "+data.data.results[0].name);
        this.setState({ 
          characters: data.data.results,
          selectedCharacter: data.data.results[0]
         });
      });

  }

  render() {
    const Search = _.debounce((term) => { this.characterSearch(term) }, 300);
    return (
      <div>
        
        <SearchBar onSearchTermChange={this.characterSearch.bind(this)}/>
        <div className="big-box">
          <CharacterBox 
          characters={this.state.characters} 
          onClickCharacter={this.onClickCharacter.bind(this)}
          comics={this.state.comics}
          selectedCharacter={this.state.selectedCharacter}
          openModal={this.openModal.bind(this)}
          
          />
        </div>
        <div className="comic-box">
          <ComicBox comics={this.favoriteComics} isFavoriteComicList={true} removeFromFavorites={this.removeFromFavorites.bind(this)}/>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <h2 ref="subtitle">Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>{this.selectedComic && this.selectedComic.title}</div>
          {this.isAddedToFavorites(this.selectedComic) ? <button >Added to Favorites</button>:<button onClick={() => {this.addToFavorites(this.selectedComic)}}>Add to Favorites</button>}
          
          <form>   
            <button>Buy For $3.99</button>
          </form>
        </Modal>
        <Pager
                total={this.state.total}
                current={this.state.current}
                visiblePages={this.state.visiblePage}
                titles={{ 
                  first: 'first', 
                  last: 'last' 
                }}
                className="pagination-sm pull-right"
                onPageChanged={this.handlePageChanged}
            />
      </div>
    );
  }
  onClickCharacter(character) {
    var url = 'http://gateway.marvel.com/v1/public/characters/'+character.id+'/comics?limit=4&apikey=0bdc034cdac9e6bba2b885bbc39ce440&hash=2ed41249ca3bf735686e581fb9b20718&ts=1490815685786';
    return $.getJSON(url)
      .then((data, comics) => {
        this.setState({ 
          comics: data.data.results,
          selectedCharacter: character
         });
      });
    //this.setState({ selectedCharacter: character });
  }

}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
