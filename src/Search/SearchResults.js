import React from 'react';
import SaveButton from './../Buttons/SaveButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  './SearchResults.scss';

class SearchResults extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      savedItems: this.props.savedItems
    }
  }

  handleSavedChanges = ( savedItems ) => {
    console.log( 'SearchResults.js savedItems: ', savedItems );
    this.props.onSavedChanges( savedItems );
  }

  render () {
    const { savedItems } = this.state;

    return (
      <ul className="results animate">
        {
          this.props.searchData.map( result => {
            return (
              <li key={result.id} className="search-result">
                <div className="result-image-container">
                  <img src={ result.webformatURL } alt={`${ result.tags } by ${ result.user }`} className={ result.imageHeight > result.imageWidth ? 'portrait' : 'landscape' } />
                </div>
                <aside className="result-details-container">
                  <ul className="tag-box">
                    {result.tags.split( ',' ).map( tag => {
                      return <li key={ tag } className="tag">{ tag.trim() }</li>
                    })}
                  </ul>
                  <div className="actions">
                    <SaveButton
                      id={ result.id }
                      isSaved={ savedItems && savedItems.length > 0 && savedItems.includes( result.id.toString() ) ? true : false }
                      handleSavedChanges={ this.handleSavedChanges } />
                    <div className="social">
                      <span><FontAwesomeIcon icon="thumbs-up" /> { result.likes }</span>
                      <span><FontAwesomeIcon icon="star" /> { result.favorites }</span>
                    </div>
                  </div>
                </aside>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default SearchResults;