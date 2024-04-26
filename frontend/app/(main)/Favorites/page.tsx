'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Fade } from "react-awesome-reveal";
import './Favorites.css'


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

function MostrarFavoritos() {
    // const [sampleText, setSample] = useState("");

    // useEffect(() => {
    //   const text = localStorage.getItem('text');
    //   setSample(text || "");
    // }, []);
    const [formatSelected, setSelected] = useState(false);
    const [centerText, setTitle] = useState("Selecciona el formato del artículo");
    const [currentFormat, setFormat] = useState("None");
    
    const setType = (text: any, type: any) => {
      setTitle(text)
      setFormat(type)
      setSelected(true)
    }
    const goBack = () => {
      setTitle("Selecciona el formato del artículo")
      setFormat("None")
      setSelected(false)
    }
  
    return (
      <>
        <div className="main">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          {/* <ARPAHeader />
          <SectionsHeader /> */}
          <Arrow selected={formatSelected} goBack={goBack} />
          {/* {sampleText &&
            <Typewriter 
            onInit={(typewriter) => {typewriter.changeDelay(1).typeString(sampleText).start()}} />} */}
          
          <div className='flex justify-center items-start p-4 lg:p-20'>
              <div className="w-full grid lg:grid-cols-2">
                  <div className='p-2 w-full flex justify-center items-center text-center text-white'>
                    <Fade className='rounded-2xl p-2 bg-blue-500'>
                      <div>
                        <h1>Modernidad</h1>
                        <p>Gayubas, A. (2024, 23 marzo). Modernidad: historia, economía, política y características. Enciclopedia Humanidades. https://humanidades.com/modernidad/</p>
                      </div>
                    </Fade>
                  </div>                 
                  <div className='p-2 w-full flex justify-center items-center text-center text-white'>
                    <Fade>
                      <div className='rounded-2xl p-2 bg-blue-500'>
                        <h1>Socialismo</h1>
                        <p>Gayubas, A. (2024, 23 marzo). Modernidad: historia, economía, política y características. Enciclopedia Humanidades. https://humanidades.com/modernidad/</p>
                      </div>
                    </Fade>
                  </div> 
              </div>
          </div>      
          
        </div>
      </>
    );
}
//.pauseFor(3000).deleteAll()
export default MostrarFavoritos;