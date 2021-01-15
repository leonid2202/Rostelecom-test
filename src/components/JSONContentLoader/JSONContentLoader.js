import React, { useEffect, useRef } from 'react';
import './JSONContentLoader.css';

export default function JSONContentLoader() {
  const container = useRef();

  useEffect(() => {
    fetch('Json.txt')
      .then(response => response.json())
      .then(jsonResponse => {
        container.current.insertAdjacentHTML('afterbegin', jsonResponse[0].text);
      });
  }, []);

  return (
    <div
      className='json-content-container'
      ref={container}
    >
    </div>
  );
}
