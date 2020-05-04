import React from 'react';
import Loading from './../Helpers/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  './SavedItems.scss';

class SavedItems extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      isLoading: false,
      savedItemsData: [],
      savedBoxOpen: false
    }
  }

  // this will get details for saved items
  getItemDetails = ( itemId ) => {
    this.setState({
      isLoading: true
    });    

    // make sure itemId is an integer
    const numberItemId = Number( itemId );
    // api request
    fetch( `https://pixabay.com/api/?key=13136421-266c28a6d61717bc2e4e6a83e&id=${ numberItemId }`)
      .then( response => response.json() )
      .then( data => {
        this.setState({
          isLoading: false,
          savedItemsData: [ ...this.state.savedItemsData, data.hits[0] ],
          savedBoxOpen: true
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

  toggleSavedBox = () => {
    this.setState({
      savedBoxOpen: !this.state.savedBoxOpen
    });
  }

  render () {
    let { isLoading, savedItemsData } = this.state;

    return (
      <div className={ `saved-items-container ${ savedItemsData && savedItemsData.length > 0 ? '' : 'empty' }` }>
        <div className="saved-box-header" onClick={ () => this.toggleSavedBox() }>
          <p className="section-title">Saved Items</p>
          <FontAwesomeIcon icon={ this.state.savedBoxOpen ? 'caret-square-down' : 'caret-square-up' } size="lg" color="#09c" />
        </div>
          <ul className={`saved-items-list ${ this.state.savedBoxOpen ? 'open' : 'closed' }`}>
            {
              savedItemsData && savedItemsData.length > 0 ?
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
            :  isLoading ? <Loading /> : <p>No saved items</p>
            }
          </ul>
      </div>
    )
  }
}

export default SavedItems;