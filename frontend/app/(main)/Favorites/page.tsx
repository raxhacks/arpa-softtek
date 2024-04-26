'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Fade } from "react-awesome-reveal";
import { getFavorites } from '../../../services/favorites.service';
import { Document } from '../../../model/document';
import './Favorites.css';


export default function MostrarFavoritos() {

    const [favoriteDocs, setFavoriteDocs] = useState<Document[]>([]);
    const encodedUrl = encodeURIComponent("https://storage.googleapis.com/arpa-softtek.appspot.com/users/hNb7IaKYx7bRUWEWB9cn575nATF2/Raymundo_Guzman_Mata_English_CV%20%281%29.pdf");
    const viewerURL = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
  
    useEffect(() => {
      (async () => {
        setFavoriteDocs(await getFavorites());
      })();
      // Llama a fetchData directamente dentro del useEffect
    
    }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente
    
  
    return (
      <>
        <div className="pt-14 lg:pt-24">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          <div className='font-semibold w-full text-4xl lg:text-5xl text-center fixed p-4 lg:p-4 text-white bg-transparent z-10'>Favoritos</div>
          <div className='w-full p-8'></div>
          <div className='flex justify-center items-start p-4 lg:p-20'>
              <div className="w-full grid lg:grid-cols-2">
                {favoriteDocs.map((doc, index) => 
                  ( 
                    <div key={index} className='p-1 w-full flex justify-center items-center text-center text-white'>
                      <Link href={`/Analisis`}>
                        <Fade className='w-full rounded-2xl p-4 bg-blue-500 transition-colors shadow-md hover:border-blue-200 hover:bg-blue-400 '>
                          <div className='aspect-w-16 aspect-h-9'>
                            <h1>{doc.title}</h1>
                            <p>{doc.createdAt}</p>
                            <div className='flex justify-center items-center'>
                              <iframe
                                src={viewerURL}
                                width="100%"
                                height="100%"
                              />
                            </div>
                          </div>
                        </Fade>
                      </Link>
                    </div> 
                  )
                )}
              </div>
          </div>      
          
        </div>
      </>
    );
}
//.pauseFor(3000).deleteAll()
