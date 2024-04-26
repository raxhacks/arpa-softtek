'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { Fade } from "react-awesome-reveal";
import './History.css'
import { getFavorites } from '@/services/favorites.service'


function Arrow(back: any) {
    return(
      <button className="arrow">
        <Link href="/CargarArchivos">
          <i className="material-icons" style={{fontSize: "400%"}}>keyboard_backspace</i>
        </Link>
      </button>
    );
}

export default async function MostrarHistorial() {

    const [favoriteDocTitle, setFavoriteDocTitle] = useState('');
    const [favoriteDocId, setFavoriteDocId] = useState('');
    const response = await getFavorites();
    if (response){
      const title = JSON.stringify(response[0].title);
      const id = JSON.stringify(response[0].id)
      setFavoriteDocTitle(title);
      setFavoriteDocId(id);
    } else {
      setFavoriteDocTitle('');
      setFavoriteDocId('');
    }
  
    return (
      <>
        <div className="main">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          {/* <ARPAHeader />
          <SectionsHeader /> */}
          <Arrow />
          {/* {sampleText &&
            <Typewriter 
            onInit={(typewriter) => {typewriter.changeDelay(1).typeString(sampleText).start()}} />} */}
          
          <div className='flex justify-center items-start p-4 lg:p-20'>
              <div className="w-full grid lg:grid-cols-2">
                {favoriteDocTitle ? (
                    <div className='p-2 w-full flex justify-center items-center text-center text-white'>
                      <Fade className='rounded-2xl p-2 bg-blue-500'>
                        <div>
                          <h1>{favoriteDocTitle}</h1>
                          <p>{favoriteDocId}</p>
                        </div>
                      </Fade>
                    </div> 
                ): (
                  <div></div>
                )}
                {/* <div className='p-2 w-full flex justify-center items-center text-center text-white'>
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
                </div> */}

              </div>
          </div>      
          
        </div>
      </>
    );
}
//.pauseFor(3000).deleteAll()
