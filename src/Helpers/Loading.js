import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Loading.scss';

const Loading = () => {

  return (
    <div className="loading">
      <FontAwesomeIcon icon="circle-notch" spin />
    </div>
  )
}

export default Loading;