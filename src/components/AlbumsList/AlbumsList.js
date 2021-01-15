import React, { useEffect, useState } from 'react';

import './AlbumsList.css';
import AlbumListFilter from './AlbumListFilters/AlbumListFilters';
import AlbumListItem from './AlbumListItem/AlbumListItem';

export default function AlbumsList() {
  const [albumsLoaded, setAlbumsLoaded] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]); // ideally should be fetched somewhere else

  const [filterName, setFilterName] = useState('');
  const [selectedUser, setSelectedUser] = useState(-1);
  const [sortType, setSortType] = useState('asc');

  const albumsLimit = 20;

  useEffect(() => {
    // server-side filtering for users
    const url = +selectedUser === -1
      ? `https://jsonplaceholder.typicode.com/albums?_limit=${albumsLimit}`
      : `https://jsonplaceholder.typicode.com/albums?_limit=${albumsLimit}&userId=${selectedUser}`;
    setAlbumsLoaded(false);

    fetch(url)
      .then(response => response.json())
      .then(json => {
        // fetching previews for all albums
        Promise.all(json.map(album =>
          fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=1`)
            .then(response => response.json())
            .then(previewJson => ({
              ...album,
              thumbnailUrl: previewJson[0].thumbnailUrl,
            }),
            ),
        ))
          .then(result => {
            setAlbums(result);
            setAlbumsLoaded(true);
          });
      })
      .catch(err => {
        setAlbumsLoaded(true);
        console.log(err);
      });
  }, [selectedUser]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        setUsers(json);
        setUsersLoaded(true);
      })
      .catch(err => {
        setUsersLoaded(true);
        console.log(err);
      });
  }, []);

  const compareAlbums = (a, b) => {
    if (sortType === 'asc') { return a.title < b.title ? -1 : 1; }
    if (sortType === 'desc') { return a.title < b.title ? 1 : -1; }
    return 0;
  };

  return (
    <div className='album-container'>
      <AlbumListFilter
        filterName={filterName}
        setFilterName={setFilterName}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        sortType={sortType}
        setSortType={setSortType}
        users={users}
      />
      {albumsLoaded && usersLoaded
        ? (
          <div className='albumslist'>
            {albums
              ?.filter(({ title }) => {
                const query = filterName.trim().toLowerCase();
                return query ? title.includes(query) : true;
              })
              ?.sort(compareAlbums)
              ?.map(album => (
                <AlbumListItem
                  album={album}
                  key={album.id}
                  ownerName={users.find(({ id }) => id === album.userId)?.name}
                />
              ))}
          </div>
        )
        : (
          <h1 className='loading'>{'Loading...'}</h1>
        )}
    </div>
  );
}
