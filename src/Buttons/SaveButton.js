import React from 'react';
import  './SaveButton.scss';

class SaveButton extends React.Component {

  constructor ( props ) {
    super ( props );
    this.state = {
      itemId: this.props.id,
      isSaved: this.props.isSaved
    }
  }

  toggleSave = ( value ) => {
    // first get any saved items from local storage
    let savedItems = JSON.parse( localStorage.getItem( 'savedItems' ) );

    // check to see if there are any saved items in local storage
    if ( savedItems && savedItems.length > 0 ) {
      // now check to see if the value already exists.
      if ( savedItems.includes( value ) ) {
        // item already exists in local storage. let's remove it.
        let savedItemIndex = savedItems.indexOf( value );
        if ( savedItemIndex > -1 ) {
          savedItems.splice( savedItemIndex, 1 );
          // now save updated value to local storage
          localStorage.setItem( 'savedItems', JSON.stringify( savedItems ) );
          this.setState({
            isSaved: false
          });
        }
      } else {
        // user wants to save this item
        savedItems = [ ...savedItems, value ];
        // now save new value to local storage
        localStorage.setItem( 'savedItems', JSON.stringify( savedItems ) );
        this.setState({
          isSaved: true
        });
      }
    } else {
      // there are no saved items in local storage
      // add new item to the savedItems array
      savedItems = [ value ];
      // now save new value to local storage
      localStorage.setItem( 'savedItems', JSON.stringify( savedItems ) );
      this.setState({
        isSaved: true
      });
    }

    // update state with newest changes
    this.props.handleSavedChanges( savedItems );
  }

  render () {
    const { itemId, isSaved } = this.state;

    return (
      <button data-id={ itemId } className={ `btn btn-save ${isSaved ? 'saved' : ''}` } onClick={ e => this.toggleSave( e.target.getAttribute( 'data-id' ) ) }>{ isSaved ? 'Saved' : 'Save Item' }</button>
    )
  }
}

export default SaveButton;