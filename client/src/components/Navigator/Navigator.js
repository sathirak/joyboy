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
                  <svg width="23" height="23" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M48.7817 24H51.707C54.8102 24 57.7864 25.2643 59.9807 27.5147C62.1751 29.7652 63.4079 32.8174 63.4079 36C63.4079 39.1826 62.1751 42.2348 59.9807 44.4853C57.7864 46.7357 54.8102 48 51.707 48H48.7817" stroke="#292D32" strokeWidth="5" strokeLinecap="round"/>
                      <path d="M2.95312 24H48.7816V51C48.7816 54.1826 47.5745 57.2348 45.4259 59.4853C43.2773 61.7357 40.3631 63 37.3245 63H14.4103C11.3716 63 8.45747 61.7357 6.30884 59.4853C4.16021 57.2348 2.95313 54.1826 2.95312 51V24Z" stroke="#292D32" strokeWidth="5" strokeLinecap="round"/>
                      <path d="M14.6541 3V12" stroke="#292D32" strokeWidth="5" strokeLinecap="round" />
                      <path d="M25.3799 3V12" stroke="#292D32" strokeWidth="5" strokeLinecap="round" />
                      <path d="M37.0808 3V12" stroke="#292D32" strokeWidth="5" strokeLinecap="round" />
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
