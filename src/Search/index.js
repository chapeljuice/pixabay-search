import React from 'react';
import Loading from './../Helpers/Loading';
import SearchActions from './SearchActions';
import SearchResults from './SearchResults';
import './index.scss';

class Search extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      isLoading: false,
      searchCategory: '',
      searchData: [],
      searchPage: 1,
      searchQuery: '',
      searchTotalResultCount: 0
    }
  }

  // react component lifecycle function
  componentWillMount = () => {

    // call to get search result data from Pixabay API
    this.getSearchResults();
  }

  // function that gets search results data and saves to state
  getSearchResults = ( searchQuery = 'scottish fold', searchCategory = '', paging = false ) => {

    // when fetching display the loading spinner
    this.setState({
      isLoading: true
    });

    // decide which page to show (first page for new searches, next page for same query)
    let fetchPage = searchQuery === this.state.searchQuery ? this.state.searchPage : 1;

    // adds category to search if one is selected
    let chosenCategory = searchCategory ? `&category=${ searchCategory }` : '';

    // api request
    fetch( `https://pixabay.com/api/?key=13136421-266c28a6d61717bc2e4e6a83e&q=${ searchQuery }&image_type=photo&page=${ fetchPage }&per_page=10${ chosenCategory }` )
      .then( response => response.json() )
      .then( data => {
        console.log( 'Search result: ', data );

        this.setState({
          isLoading: false,
          searchCategory: searchCategory,
          searchData: paging ? [...this.state.searchData, ...data.hits] : data.hits,
          searchPage: fetchPage,
          searchTotalResultCount: data.total,
          searchQuery: searchQuery,
        }, () => {
          console.log( 'this.state.searchData: ', this.state.searchData );
        });
      })
      .catch( error => {
        console.log( 'Search result error: ', error );
        this.setState({
          isLoading: false
        });
      });
  }

  // what to do when the search query is modified
  handleSearchChange = ( searchQuery ) => {
    this.getSearchResults( searchQuery, this.state.searchCategory );
  }

  // what to do when the category is modified
  handleCategoryChange = ( category ) => {
    this.getSearchResults( this.state.searchQuery, category );
  }

  // render the component
  render () {
    return (
      <div>
        { this.state.searchData ? 
        
          <div>
            <SearchActions
              category={ this.state.searchCategory }
              query={ this.state.searchQuery }
              onSearchChange={ this.handleSearchChange }
              onCategoryChange={ this.handleCategoryChange } />

            <SearchResults searchData={ this.state.searchData } />
          </div>

        : <Loading /> }
      </div>
    )
  }

}

export default Search;