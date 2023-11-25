import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import './Navigator.css'

function Navigator() {

  const [search, setSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {

    const handleOutsideClick = (event) => {
      if (search && !event.target.closest('#Nav')) {
        setSearch(false);
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [search]);

  return (
    <nav id='Nav'>
        <div className='Nav-Outer'>
          <div className='Nav-Container'>

            <CSSTransition in={search === false} timeout={300} classNames="Nav-Left" unmountOnExit >

              <div className='Nav-Hold'>
                
                <div className='Nav-Icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="23" height="23">
                    <path d="M19.5,10H19V9a3,3,0,0,0-3-3H4A3,3,0,0,0,1,9V19a5.006,5.006,0,0,0,5,5h8a5.009,5.009,0,0,0,4.9-4A3.6,3.6,0,0,0,23,16.5v-3A3.5,3.5,0,0,0,19.5,10ZM14,22H6a3,3,0,0,1-3-3V9A1,1,0,0,1,4,8H16a1,1,0,0,1,1,1V19A3,3,0,0,1,14,22Zm7-5.5A1.621,1.621,0,0,1,19,18V12a1.621,1.621,0,0,1,2,1.5ZM9,3V1a1,1,0,0,1,2,0V3A1,1,0,0,1,9,3Zm4,0V1a1,1,0,0,1,2,0V3A1,1,0,0,1,13,3ZM5,3V1A1,1,0,0,1,7,1V3A1,1,0,0,1,5,3Z"/>
                  </svg>
                </div>
            
                <ul className="Nav-Inner">
                  
                    <a href="/food" className="Nav-Link">Food</a>
                    <a href="/hotels" className="Nav-Link">Hotels</a>
                    <a href="/places" className="Nav-Link">Places</a>
                    <a href="/events" className="Nav-Link">Events</a>
                  
                </ul>

                <div className='Nav-Icon' onClick={() => setSearch(true)}>
                <svg width="20" height="20" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M38.4905 34.8155C37.9538 34.264 37.217 33.9529 36.4475 33.9529H35.6412C35.4072 33.9529 35.1826 33.8606 35.0162 33.6961C34.6873 33.3708 34.6646 32.8488 34.9471 32.4825C37.5851 29.0614 39.1543 24.7469 39.1543 20.0779C39.1543 9.00875 30.4055 0.0362549 19.6122 0.0362549C8.81893 0.0362549 0.0700684 9.00875 0.0700684 20.0779C0.0700684 31.1471 8.81893 40.1196 19.6122 40.1196C24.1556 40.1196 28.3546 38.5168 31.6872 35.8213C32.0516 35.5266 32.5846 35.5499 32.9056 35.8914C33.0571 36.0524 33.1414 36.2651 33.1414 36.4862V37.3431C33.1414 38.1347 33.4511 38.8949 34.0043 39.4611L45.875 51.611C47.1355 52.9011 49.211 52.9 50.4701 51.6087C51.6851 50.3627 51.6861 48.3755 50.4723 47.1283L38.4905 34.8155ZM19.6122 33.9529C12.1261 33.9529 6.08303 27.7554 6.08303 20.0779C6.08303 12.4004 12.1261 6.20292 19.6122 6.20292C27.0983 6.20292 33.1414 12.4004 33.1414 20.0779C33.1414 27.7554 27.0983 33.9529 19.6122 33.9529Z" fill="#292D32"/>
                </svg>
              </div>

              <div className='Nav-Icon'>
                <svg width="20" height="20" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H52" stroke="#292D32" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M10 20L52 20" stroke="#292D32" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M3 37H52" stroke="#292D32" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </div>

              </div>

            </CSSTransition>

            <CSSTransition in={search === true} timeout={300} classNames="Nav-Right" unmountOnExit >

              <div className='Nav-Hold'>         

                <div className='Nav-Icon' onClick={() => setSearch(true)}>
                  <svg width="20" height="20" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38.4905 34.8155C37.9538 34.264 37.217 33.9529 36.4475 33.9529H35.6412C35.4072 33.9529 35.1826 33.8606 35.0162 33.6961C34.6873 33.3708 34.6646 32.8488 34.9471 32.4825C37.5851 29.0614 39.1543 24.7469 39.1543 20.0779C39.1543 9.00875 30.4055 0.0362549 19.6122 0.0362549C8.81893 0.0362549 0.0700684 9.00875 0.0700684 20.0779C0.0700684 31.1471 8.81893 40.1196 19.6122 40.1196C24.1556 40.1196 28.3546 38.5168 31.6872 35.8213C32.0516 35.5266 32.5846 35.5499 32.9056 35.8914C33.0571 36.0524 33.1414 36.2651 33.1414 36.4862V37.3431C33.1414 38.1347 33.4511 38.8949 34.0043 39.4611L45.875 51.611C47.1355 52.9011 49.211 52.9 50.4701 51.6087C51.6851 50.3627 51.6861 48.3755 50.4723 47.1283L38.4905 34.8155ZM19.6122 33.9529C12.1261 33.9529 6.08303 27.7554 6.08303 20.0779C6.08303 12.4004 12.1261 6.20292 19.6122 6.20292C27.0983 6.20292 33.1414 12.4004 33.1414 20.0779C33.1414 27.7554 27.0983 33.9529 19.6122 33.9529Z" fill="#292D32"/>
                  </svg>
                </div>

                <input placeholder="I'm looking for..." className="Nav-Input" maxLength="2048" autoComplete="off" autoCorrect="off" autoFocus={true}
                  spellCheck={false} title="Search" type="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)} aria-label="Search for foods, hotels, places or events!"/>
              
                <div className="Nav-Icon" onClick={() => setInputValue('')} style={{opacity: search && inputValue ? 1 : 0,transition: 'opacity 0.5s',}}>
                  <svg width="12" height="12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.6 56L0 50.4L22.4 28L0 5.6L5.6 0L28 22.4L50.4 0L56 5.6L33.6 28L56 50.4L50.4 56L28 33.6L5.6 56Z" fill="#292D32"/>
                  </svg>
                </div>

              </div>

            </CSSTransition>

          </div>
      </div>
    </nav>
  );
}

export default Navigator;
