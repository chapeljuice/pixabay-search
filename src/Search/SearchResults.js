import React from 'react';
import SaveButton from './../Buttons/SaveButton';
import  './SearchResults.scss';

class SearchResults extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
    }
  }



  render () {
    // get saved items from local storage
    let savedItems = JSON.parse( localStorage.getItem( 'savedItems' ) );

    return (
      <ul className="results">
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
                  <SaveButton id={ result.id } isSaved={ savedItems && savedItems.length > 0 && savedItems.includes( result.id.toString() ) ? true : false } />
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