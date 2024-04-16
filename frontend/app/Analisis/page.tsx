'use client';

import Link from 'next/link';
import './Analisis.css';
import { useState } from 'react';
import Typewriter from 'typewriter-effect';

function ActiveSectionButton(name: any) {
    return (
      <button className="sections">
        <i className="material-icons" style={{fontSize: "250%", verticalAlign: "middle", color: "rgb(217, 189, 122)"}}>{name.text}</i>
      </button>
    );
}
    
function InactiveSectionButton(name: any) {
    return (
      <button className="sections">
        <i className="material-icons" style={{fontSize: "250%", verticalAlign: "middle"}}>{name.text}</i>
      </button>
    );
}
  
function ARPAHeader() {
    return (
      <div className="ARPA_header">
        <h2 className="headerText">ARPA</h2>
      </div>
    );
}
  
function SectionsHeader() {
    return (
      <div className="sections_header">
        <div className="sectionGroup">
          <ActiveSectionButton text="feed"/>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <InactiveSectionButton text="book"/>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <InactiveSectionButton text="history"/>
        </div>
      </div>
    );
}

function Arrow(back: any) {
    return(
      <button className="arrow">
        <Link href="/CargarArchivos">
          <i className="material-icons" style={{fontSize: "400%"}}>keyboard_backspace</i>
        </Link>
      </button>
    );
}

function MostrarAnalisis() {
    const [sampleText, setSample] = useState("Este texto se reemplazará con el documento parseado que se suba en la pagina siguiente y se envie a la base de datos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum");
  
    return (
      <>
        <div className="main">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          <ARPAHeader />
          <SectionsHeader />
          <Arrow />
          <div className="text">
            <Typewriter onInit={(typewriter) => {typewriter.changeDelay(5).typeString(sampleText).start()}} />
          </div>
        </div>
      </>
    );
}

export default MostrarAnalisis;