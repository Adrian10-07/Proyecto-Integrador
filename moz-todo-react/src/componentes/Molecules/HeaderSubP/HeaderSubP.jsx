import React from 'react';
import LogoC from './AssetsHeaderS/LogoC.jpg';

export default function HeaderSubP() {
  return (
    <div>

        <header className='headerSub'>  
            <img src={LogoC} alt="Left" className='image-left' />
            <h1>{title}</h1>
            <img src={LogoC} alt="Right" className='image-right' />
        </header>

    </div>
  )
}
