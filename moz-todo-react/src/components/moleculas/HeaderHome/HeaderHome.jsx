import React from "react";
import './HeaderHome.css'
import ButtonLogout from "../../atomos/ButtonLogout/ButtonLogout";

export default function HeaderHome (){
    return(
        <div className='header'>
          <header>
            <h1>Instituto Montebello</h1>

            <ButtonLogout/>

          </header>
        </div>
    );
}