import React from 'react';
import './AlbumListFilters.css';

export default function AlbumListFilter({
  filterName,
  setFilterName,
  users,
  selectedUser,
  setSelectedUser,
  sortType,
  setSortType,
}) {
  return (
    <form className='album-filter-form'>
      <input
        placeholder='Album name...'
        className='album-filter-name'
        value={filterName}
        onChange={e => setFilterName(e.target.value)}
      />
      <select
        className='album-filter-user'
        value={selectedUser}
        onChange={e => setSelectedUser(e.target.value)}
      >
        <option value={-1}>{'Any user'}</option>
        {users.map(user => (
          <option
            value={user.id}
            key={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
      <select
        className='album-filter-sort'
        value={sortType}
        onChange={e => setSortType(e.target.value)}
      >
        <option value={'desc'}>{'Descending'}</option>
        <option value={'asc'}>{'Ascending'}</option>
      </select>
    </form>
  );
}
