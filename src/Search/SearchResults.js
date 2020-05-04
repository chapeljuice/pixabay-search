import React from 'react';
import SaveButton from './../Buttons/SaveButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  './SearchResults.scss';

class SearchResults extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      savedItems: this.props.savedItems,
      showModal: false,
      imageInModal: '',
      tagsInModal: ''
    }
  }

  handleSavedChanges = ( savedItems ) => {
    this.props.onSavedChanges( savedItems );
  }

  showInModal = ( image, tags ) => {
    this.setState({
      showModal: true,
      imageInModal: image,
      tagsInModal: tags
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  render () {
    const { savedItems } = this.state;

    return (
      <ul className="results animate">
        {
          this.props.searchData.map( result => {
            return (
              <li key={result.id} className="search-result">
                <div className="result-image-container" onClick={() => this.showInModal( result.webformatURL, `${ result.tags } by ${ result.user }` )}>
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
        <div className={`modal ${ this.state.showModal ? 'show' : '' }`} id="modal-box" onClick={() => this.closeModal()}>
          <div id="modalContent" className="modal-content">
            <div className="modal-image-box">
              <div id="closeModal" className="close-modal" onClick={() => this.closeModal()}><FontAwesomeIcon icon="times" size="lg" /></div>
              <img src={ this.state.imageInModal } alt={ this.state.tagsInModal } />
            </div>
          </div>
        </div>
      </ul>
    )
  }
}

export default SearchResults;