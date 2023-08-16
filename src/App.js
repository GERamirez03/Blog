import React from 'react';
import SiteHeader from './SiteHeader';
import Routes from './Routes';
import BlogContext from './blogContext';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <BlogContext.Provider value={{}} >
          <SiteHeader />
          <Routes />
        </BlogContext.Provider>
      </header>
    </div>
  );
}

export default App;
