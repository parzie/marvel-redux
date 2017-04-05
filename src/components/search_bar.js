import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      <div className="search-bar">
        <img className="marvel-logo" src="/src/images/marvel-logo.png"/>
        <div className="center-stuff">
          <input type="text" className="form-control"  placeholder="Search character..."
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
        </div>
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
