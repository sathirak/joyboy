import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Logo from '../../logo.svg';
import Account_Icon from '../../assets/icons/ui/Account.svg';
import Payments_Icon from '../../assets/icons/ui/Payments.svg';

import './Navigator.css'

function Navigator() {

  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {

    const handleOutsideClick = (event) => {
      if (search && !event.target.closest('#Nav-Container')) {
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
          <div className='Nav-Container' id='Nav-Container'>

            <CSSTransition in={search === false} timeout={300} classNames="Nav-Left" unmountOnExit >

              <div className='Nav-Hold'>
                
                <a href="/AboutUs"  className='Nav-Logo'>
                <img src={Logo} alt="Logo of Company" style={{width: 'clamp(2em, 10vw, 45px)', height: 'clamp(2em, 10vw, 45px)', WebkitFontSmoothing: 'antialiased',MozOsxFontSmoothing: 'grayscale',}}  />
                </a>
            
                <ul className="Nav-Inner">
                  
                    <a href="/Food" className="Nav-Link">Food</a>
                    <a href="/Hotels" className="Nav-Link">Hotels</a>
                    <a href="/Travel" className="Nav-Link">Travel</a>
                    <a href="/Events" className="Nav-Link">Events</a>
                  
                </ul>

                <div className='Nav-Icon' onClick={() => setSearch(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="var(--joy-hue-ui)" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" style={{ enableBackground: "new 0 0 513.749 513.749" }} xmlSpace="preserve" width="20px" height="20px">
                    <g>
                    <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" />
                    </g>
                  </svg>
                </div>

                <div className='Nav-Icon' onClick={() => setMenu(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20" fill="var(--joy-hue-ui)">
                    <path d="M0,3.5c0-.83,.67-1.5,1.5-1.5H17.5c.83,0,1.5,.67,1.5,1.5s-.67,1.5-1.5,1.5H1.5c-.83,0-1.5-.67-1.5-1.5Zm17.5,14.5H1.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5H17.5c.83,0,1.5-.67,1.5-1.5s-.67-1.5-1.5-1.5Zm5-8H6.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5H22.5c.83,0,1.5-.67,1.5-1.5s-.67-1.5-1.5-1.5Z"/>
                  </svg>
                </div>

              </div>

            </CSSTransition>

            <CSSTransition in={search === true} timeout={300} classNames="Nav-Right" unmountOnExit >

              <div className='Nav-Hold'>         

                <div className='Nav-Icon' onClick={() => setSearch(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="var(--joy-hue-ui)" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" style={{ enableBackground: "new 0 0 513.749 513.749" }} xmlSpace="preserve" width="20px" height="20px">
                    <g>
                    <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" />
                    </g>
                  </svg>
                </div>

                <input placeholder="I'm looking for..." className="Nav-Input" maxLength="2048" autoComplete="off" autoCorrect="off" autoFocus={true}
                  spellCheck={false} title="Search" type="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)} aria-label="Search for foods, hotels, places or events!"/>
              
                <div className="Nav-Icon" onClick={() => setInputValue('')} style={{opacity: search && inputValue ? 1 : 0,transition: 'opacity 0.5s',}}>
                  <svg width="12" height="12" viewBox="0 0 56 56" fill="var(--joy-hue-ui)" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.6 56L0 50.4L22.4 28L0 5.6L5.6 0L28 22.4L50.4 0L56 5.6L33.6 28L56 50.4L50.4 56L28 33.6L5.6 56Z" fill="var(--joy-hue-ui)"/>
                  </svg>
                </div>

              </div>

            </CSSTransition>

          </div>
      </div>
      {menu && ( <>
        <div id='Menu-Overlay' onClick={() => setMenu(false)}></div>
        <div id='Menu' className='Menu'>

          <div className='Menu-Close' onClick={() => setMenu(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill='var(--joy-hue-error)' id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
              <path d="m23.341,9.48l-3.501-6c-.893-1.53-2.547-2.48-4.318-2.48h-7.071c-1.771,0-3.426.951-4.319,2.48L.631,9.48c-.906,1.554-.906,3.485,0,5.039l3.501,6c.893,1.53,2.547,2.48,4.318,2.48h7.071c1.771,0,3.426-.951,4.319-2.48l3.5-6c.906-1.554.906-3.485,0-5.039Zm-7.634,4.812c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.293,2.293,2.293,2.293Z"/>
            </svg>
          </div>

          <div className='Menu-Inner'>

            <a className='Menu-Option' href='/Account'>
              <img className='Menu-Option-Icon' src={Account_Icon} alt='Account Icon'/>
              Account
            </a>

            <a className='Menu-Option' href='/Payments'>
              <img className='Menu-Option-Icon' src={Payments_Icon} alt='Account Icon'/>
              Payments
            </a>

            <a className='Menu-Option' href='/ContactUs'>
              <img className='Menu-Option-Icon' src={Account_Icon} alt='Account Icon'/>
              Contact Us!
            </a>

            <a className='Menu-Option' href='/AboutUs'>
              <img className='Menu-Option-Icon' src={Account_Icon} alt='Account Icon'/>
              About Us!
            </a>

            <a className='Menu-Option' href='/PrivacyPolicy'>
              <img className='Menu-Option-Icon' src={Account_Icon} alt='Account Icon'/>
              Privacy Policy
            </a>              

            <a className='Menu-Option' href='/Report'>
              <img className='Menu-Option-Icon' src={Account_Icon} alt='Account Icon'/>
              Report!
            </a>                                   

          </div>


        </div>
        </>
      )}
    </nav>
  );
}

export default Navigator;
