import React, { useState } from 'react';
import Joke from './Joke';

function App() {
  const [userQuery, setUserQuery] = useState('');

  window.a = { userQuery, setUserQuery };

  const updateUserQuery = event => {
    console.log('userQuery', userQuery);
    setUserQuery(event.target.value);
  };

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  };

  const handleKeyPress = event => {
    console.log('handleKeyPress', event);
    console.log('key:', event.key);
    if (event.key === 'Enter') {
      searchQuery();
    }
  };

  return (
    <div className="App">
      <h1>Hello, world!</h1>
      <div className="form">
        <input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress} />
        <button onClick={searchQuery}>Search</button>
      </div>
      <Joke />
    </div>
  );
}

export default App;
