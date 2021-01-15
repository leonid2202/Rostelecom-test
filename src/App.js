import React from 'react';

import './App.css';
import AlbumsList from './components/AlbumsList/AlbumsList';
import JSONContentLoader from './components/JSONContentLoader/JSONContentLoader';

export default function App() {
  return (
    <>
      <div className='app'>
        <AlbumsList />
        <JSONContentLoader />
      </div>
    </>
  );
}
