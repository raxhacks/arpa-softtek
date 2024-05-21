'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Fade } from "react-awesome-reveal";
import { getFavorites } from '../../../services/favorites.service';
import { Document } from '../../../model/document';
import './Favorites.css';
import Header from '../header';

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
        <div className="pt-12 lg:pt-24 pb-20 lg:pb-24">
          <div className='font-semibold w-full text-4xl lg:text-5xl md:text-5xl text-center fixed pt-8 pb-2 lg:pb-4 md:pb-4 text-white bg-background-500 z-10'>Favoritos</div>
          {favoriteDocs.length === 0 && 
            <p className='pt-56 text-center'>No hay favoritos guardados</p>
          }
          <div className='w-full p-8'></div>
          <div className='flex justify-center items-start p-4 lg:p-20 z-0'>
              <div className="w-full grid lg:grid-cols-2">
                {favoriteDocs?.map((doc, index) => 
                  ( 
                    <div key={index} className='pb-4 w-full flex justify-center items-center text-center text-white'>
                      <Link href={`/Analisis/${doc.id}/${doc.analysis_id}`}>
                        <Fade className='w-72 lg:w-96 h-56 rounded-2xl p-4 bg-favsnhistory-500 transition-colors shadow-md hover:border-blue-200 hover:bg-blue-400'>
                          <div>
                            <h1 className='font-bold'>{doc.title}</h1>
                            <p className='font-bold'>{doc.createdAt}</p>
                            <hr></hr>
                            <div className='flex justify-center items-center'>
                              <iframe
                                src={`https://docs.google.com/viewer?url=${encodeURIComponent(doc.publicURL)}&embedded=true`}
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
