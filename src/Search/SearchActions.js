import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import './SearchActions.scss';

class SearchActions extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      searchCategory: this.props.category,
      searchQuery: this.props.query
    }
  }

  updateSearchQuery = ( e ) => {
    this.setState({
      searchQuery: e.target.value.toLowerCase().trim()
    });
    this.props.onSearchChange( e.target.value );
  }

  updateSearchCategory = ( e ) => {
    this.setState({
      searchCategory: e.target.value
    });
    this.props.onCategoryChange( e.target.value );
  }

  render () {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="imageSearch" className="visually-hidden">Search for images:</label>
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            type="text"
            id="imageSearch"
            className="search-input form-input"
            placeholder="Search for image by keywords..."
            value={this.state.searchQuery}
            onChange={e => this.updateSearchQuery( e )}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageCategory" className="visually-hidden">
            Update search category:
            <select
              id="imageCategory"
              className="category-input form-input"
              value={this.state.searchCategory}
              onChange={e => this.updateSearchCategory( e )}>
                <option value="">Category...</option>
                <option value="animals">Animals</option>
                <option value="backgrounds">Backgrounds</option>
                <option value="buildings">Buildings</option>
                <option value="business">Business</option>
                <option value="computer">Computer</option>
                <option value="education">Education</option>
                <option value="fashion">Fashion</option>
                <option value="feelings">Feelings</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="industry">Industry</option>
                <option value="music">Music</option>
                <option value="nature">Nature</option>
                <option value="people">People</option>
                <option value="places">Places</option>
                <option value="religion">Religion</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="transportation">Transportation</option>
                <option value="travel">Travel</option>
            </select>
          </label>
        </div>
      </form>
    )
  }
}

export default SearchActions;