import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import CharacterBox from './components/character_box';
import ComicBox from './components/comic_box';
import Modal from 'react-modal';
import Pager from 'react-pager';
import CryptoJS from 'crypto-js';
import styles from './less/style.less';


var $ = require('jquery');
const PUBLIC_KEY = '241328638ad6321eb015fa420ebb26ec';
const PRIVATE_KEY = 'ef49e3bbefc86b92aad3aa192719a4f50d9a4f92';
const LIMIT = 10;
var hash;
var ts;


const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '50px',
    left                       : '250px',
    right                      : '250px',
    bottom                     : '50px',
    border                     : 'none',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '1px',
    outline                    : 'none',

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
      total:       149,
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
      sort: 'name',

      
    };
    this.sortBy = this.sortBy.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getFavorites();
    this.characterSearch("");
    //this.characterSearch = this.characterSearch.bind(this);
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
      this.setState("favoriteComics", []);
    }else{
      this.setState("favoriteComics", JSON.parse(localStorage.getItem('favoriteComics')));
    }
    if(comic){
      this.state.favoriteComics.push(comic);
      localStorage.setItem('favoriteComics', JSON.stringify(this.state.favoriteComics));  
    }
    
  }

  getFavorites(){
    var favoriteComics = JSON.parse(localStorage.getItem("favoriteComics"));

    if (favoriteComics) {
      this.setState("favoriteComics", favoriteComics);
    }
  }

  removeFromFavorites(comic){
    if(comic){
      console.log("removing...");
      this.setState("favoriteComics", this.state.favoriteComics.filter((c) => c.id !== comic.id));
      localStorage.setItem('favoriteComics', JSON.stringify(this.state.favoriteComics));  
      this.characterSearch("");
    }

  }

  isAddedToFavorites(comic){
    if(comic){
      return !!this.state.favoriteComics.find((c) => c.id === comic.id);
    }
  }


  characterSearch(term) {
    this.term = term;
    
    var url = '';
    var offset;
    var sort = this.state.sort;
    if(this.state.current > 0){
      offset = this.state.current * 10;
    }else{
      offset = this.state.current;
    }
    if(term){
      url = 'http://gateway.marvel.com/v1/public/characters?orderBy='+sort+'&nameStartsWith='+term+'&offset='+offset+'&limit='+LIMIT+'&apikey='+PUBLIC_KEY+'&hash='+hash+'&ts='+ts+'';
    }else{
      url = 'http://gateway.marvel.com/v1/public/characters?orderBy='+sort+'&offset='+offset+'&limit='+LIMIT+'&apikey='+PUBLIC_KEY+'&hash='+hash+'&ts='+ts+'';
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

  sortBy(event){
    this.state.sort = event.target.value;
    if(this.term){
          this.characterSearch(this.term);
        }else{
          this.characterSearch("");
      }
  }

  render() {
    const Search = _.debounce((term) => { this.characterSearch(term) }, 300);
    return (
      <div>
        
        <SearchBar onSearchTermChange={this.characterSearch.bind(this)}/>
        <div className="big-box">
          <h2><img src="/src/images/icons/characters.png" />Characters</h2>
          <select className="form-control sort-by" value={this.state.sort} onChange={this.sortBy}>
            <option value="name">name</option>
            <option value="modified">modified</option>
            <option value="-name">name desc</option>
            <option value="-modified">modified desc</option>
          </select>
          <CharacterBox 
          characters={this.state.characters} 
          onClickCharacter={this.onClickCharacter.bind(this)}
          comics={this.state.comics}
          selectedCharacter={this.state.selectedCharacter}
          openModal={this.openModal.bind(this)}
          getComics={this.getComics.bind(this)}
          
          />
          <div className="pager">
          <Pager
                total={this.state.total}
                current={this.state.current}
                visiblePages={this.state.visiblePage}
                titles={{ 
                  first: 'first', 
                  last: 'last' 
                }}
                onPageChanged={this.handlePageChanged}
            />
            </div>
        </div>
        <div className="comic-box">
          <ComicBox comics={this.state.favoriteComics} isFavoriteComicList={true} removeFromFavorites={this.removeFromFavorites.bind(this)}/>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          /*onAfterOpen={this.afterOpenModal}*/
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          
          {this.selectedComic && 
          <div className="modal-comic">
            <a  href="#" onClick={this.closeModal}></a>  
            <img className="comic-image" src={this.selectedComic.thumbnail.path+"."+this.selectedComic.thumbnail.extension} />
            <h2>{this.selectedComic.title}</h2>
            <p>{this.selectedComic.description}</p>
          </div>
          }
          
            {          
              this.isAddedToFavorites(this.selectedComic) ? 
              <div className="modal-button added">
              <div className="center">
                <p><img src="/src/images/icons/btn-favourites-primary.png"/>Added to Favourites</p>
              </div>
              </div>:
              <div className="modal-button left">
            <div className="center">
              <a href="#" onClick={() => {this.addToFavorites(this.selectedComic)}}>
                <img src="/src/images/icons/btn-favourites-default.png"/>Add to Favourites</a>
            </div>
            </div>}         
          <div className="modal-button">
            <div className="center"><a href="#"><img src="/src/images/icons/shopping-cart-primary.png"/>Buy For $3.99</a></div>
          </div>
          
          
        </Modal>
        
      </div>
    );
  }

  getComics(character, limit){
    this.onClickCharacter(character, limit);
    return this.state.comics;
  }

  onClickCharacter(character, limit) {
    var url = 'http://gateway.marvel.com/v1/public/characters/'+character.id+'/comics?limit='+limit+'&apikey='+PUBLIC_KEY+'&hash='+hash+'&ts='+ts+'';
    return $.getJSON(url)
      .then((data, comics) => {
        //console.log("first character: "+data.data.results[0].title);
        //this.state.selectedComic = data.data.results[0];
        //console.log("selectedComic: "+this.state.selectedComic.title);
        this.setState({ 
          comics: data.data.results,
          selectedCharacter: character
         });
      });
  }

}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('#container'));
