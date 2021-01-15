import React, { useEffect, useState } from 'react';
import './AlbumListItem.css';

export default function AlbumListItem({ album, ownerName }) {
  const [image, setImage] = useState('');

  // useEffect(() => {
  //   if (album) {
  //     fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=1`)
  //       .then(response => response.json())
  //       .then(json => setImage(json[0].thumbnailUrl));
  //   }
  // }, [album]);

  return album && (
    <div className='album'>
      <img
        className='album-preview'
        src={album.thumbnailUrl}
        alt={album.title}
      />
      <h2 className='album-header'>
        {album.title}
        {ownerName && (<span className='album-owner'>{` by ${ownerName}`}</span>)}
      </h2>
    </div>
  );
}
