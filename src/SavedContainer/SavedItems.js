import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  './SavedItems.scss';

class SavedItems extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      savedItemsData: []
    }
  }

  // this will get details for saved items
  getItemDetails = ( itemId ) => {
    // make sure itemId is an integer
    const numberItemId = Number( itemId );
    // api request
    console.log( 'Fetching data for id: ' + itemId );
    fetch( `https://pixabay.com/api/?key=13136421-266c28a6d61717bc2e4e6a83e&id=${ numberItemId }`)
      .then( response => response.json() )
      .then( data => {
        this.setState({
          savedItemsData: [ ...this.state.savedItemsData, data.hits[0] ],
        });
      })
  }

  getSavedItemsData = ( array ) => {
    // loop through and get details for each saved item
    for ( let i = 0; i < array.length; i++ ) {
      // convert string'd id back to number before getting details
      this.getItemDetails( array[i] );
    }
  }

  componentDidMount = () => {
    const { savedItems } = this.props;
    if ( savedItems && savedItems.length > 0 ) {
      this.getSavedItemsData( savedItems );
    }
  }

  componentDidUpdate = ( nextProps ) => {
    const { savedItems } = this.props;
    // compare arrays (doing it easy by stringifying here) and if they're different, loop through all savedItems again
    if ( JSON.stringify(nextProps.savedItems) !== JSON.stringify(savedItems) ) {
      this.setState({
        savedItemsData: [],
      }, () => this.getSavedItemsData( savedItems ) );
    }
   }

  render () {
    let { savedItemsData } = this.state;

    return (
      <div className={ `saved-items-container ${ savedItemsData && savedItemsData.length > 0 ? '' : 'empty' }` }>
        <p className="section-title">Saved Items</p>
        {
          savedItemsData && savedItemsData.length > 0 ?
          <ul className="saved-items-list">
            {
              savedItemsData.map( ( item, index ) => {
                return (
                  <li key={ item.id + index }>
                    <a href={ item.pageURL } target="_blank" className="link" rel="noreferrer noopener">
                      <div className="saved-image-box">
                        <img src={ item.previewURL } alt={ item.tags } />
                        <div className="hover-box">
                          <FontAwesomeIcon icon="external-link-alt" className="icon" />
                        </div>
                      </div>
                      <p>{ item.id }</p>
                    </a>
                  </li>
                )
              })
            }
          </ul>
          : <p>No saved items</p>
        }
      </div>
    )
  }
}

export default SavedItems;