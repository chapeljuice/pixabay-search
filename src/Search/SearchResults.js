import React from 'react';

class SearchResults extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      
    }
  }

  render () {
    return (
      <ul className="results">
        {
          this.props.searchData.map( result => {
            return (
              <li key={result.id} className="search-result">
                <div className="result-image-container">
                  <img src={ result.previewURL } alt={`${ result.tags } by ${ result.user }`} />
                </div>
                <div className="result-details-container">

                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default SearchResults;