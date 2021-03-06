import React, { useState } from 'react';
import Joke from './Joke';
import Stories from './Stories';
import Tasks from './Tasks';
//import Gallery from './Gallery';
import { useSavedState } from './hooks';

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const [showGallery, setShowGallery] = useSavedState('show-gallery', true);
  window.a = { userQuery, setUserQuery };

  const updateUserQuery = event => {
    setUserQuery(event.target.value);
  };

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      searchQuery();
    }
  };

  const toggleShowGallery = () => {
    setShowGallery(!showGallery);
  }

  return (
    <div className="App">
      <h1>Hello, world!</h1>
      <div className="form">
        <input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress} />
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <Tasks />
      <hr />
      <div>
        {
          //showGallery ? (<div><Gallery /><hr /></div>) : null // doesn't work on stackblitz
          showGallery ? <h3>Gallery goes here...</h3> : null
        }
        <button onClick={toggleShowGallery}>
          {showGallery ? 'Hide' : 'Show'} Gallery
        </button>
      </div>
      <Stories />
      {/* <Matrix /> */}
    </div>
  );
}

export default App;
