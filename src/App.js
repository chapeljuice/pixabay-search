import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretSquareDown, faCaretSquareUp, faCircleNotch, faExternalLinkAlt, faThumbsUp, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import SavedItems from './SavedContainer/SavedItems';
import './App.scss';

library.add( faCaretSquareDown, faCaretSquareUp, faCircleNotch, faExternalLinkAlt, faThumbsUp, faTimes, faStar );

class App extends React.Component {

  constructor ( props ) {
    super ( props );
    this.state = {
      savedItems: JSON.parse( localStorage.getItem( 'savedItems' ) )
    }
  }

  componentDidMount = () => {
    // call to get saved items from local storage
    this.getSavedItems();
  }

  // function to get the saved items from local storage
  getSavedItems = () => {
    // first get any saved items from local storage
    let savedItems = JSON.parse( localStorage.getItem( 'savedItems' ) );
    // check to see if there are any saved items
    if ( savedItems && savedItems.length > 0 ) {
      // if there are, update state
      this.setState({
        savedItems: savedItems
      });

    }
  } 
  
  // this is where savedItems is lifted up to
  handleSavedChanges = ( savedItems ) => {
    this.setState({
      savedItems: savedItems
    })
  }

  render () {
    return (
      <div className="App">
        <Search
          savedItems={ this.state.savedItems }
          handleSavedChanges={ this.handleSavedChanges } />
        <SavedItems savedItems={ this.state.savedItems } />
      </div>
    );
  }
}

export default App;