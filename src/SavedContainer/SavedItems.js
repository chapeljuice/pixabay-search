import React from 'react';
import  './SavedItems.scss';

class SavedItems extends React.Component {

  render () {
    let { savedItems } = this.props;

    console.log( 'SavedItems file savedItems: ', savedItems );

    return (
      <div className={ `saved-items-container ${ savedItems && savedItems.length > 0 ? '' : 'empty' }` }>
        {
          savedItems && savedItems.length > 0 ?
          <ul className="saved-items-list">
            {
              savedItems.map( item => {
                return <li key={ item }>{ item }</li>
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