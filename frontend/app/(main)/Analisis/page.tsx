'use client';

import Link from 'next/link';
import './Analisis.css';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import Chat from './components/Chat/Chat';

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
    const [sampleText, setSample] = useState("");

    useEffect(() => {
      const text = localStorage.getItem('text');
      setSample(text || "");
    }, []);


    // esta url esta hardcodeada, cambienla y reciban la url de manera dinamica
    const encodedUrl = encodeURIComponent("https://storage.googleapis.com/arpa-softtek.appspot.com/users/hNb7IaKYx7bRUWEWB9cn575nATF2/Raymundo_Guzman_Mata_English_CV%20%281%29.pdf");
    const viewerURL = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
    return (
      <>
        <div className="main">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          {/* <ARPAHeader />
          <SectionsHeader /> */}
          <Arrow />
          <div className="text">
          {/* {sampleText &&
            <Typewriter 
            onInit={(typewriter) => {typewriter.changeDelay(1).typeString(sampleText).start()}} />} */}
            <Chat />
            <iframe
            src={viewerURL}
            width="100%"
            height="100%"
            />
          </div>
        </div>
      </>
    );
}
//.pauseFor(3000).deleteAll()
export default MostrarAnalisis;