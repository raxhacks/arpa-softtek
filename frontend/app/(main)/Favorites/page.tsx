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
  const [loading, setLoading] = useState(true);
  
  const encodedUrl = encodeURIComponent("https://storage.googleapis.com/arpa-softtek.appspot.com/users/hNb7IaKYx7bRUWEWB9cn575nATF2/Raymundo_Guzman_Mata_English_CV%20%281%29.pdf");
  const viewerURL = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;

  useEffect(() => {
    (async () => {
      const docs = await getFavorites();
      setFavoriteDocs(docs);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="pt-12 pb-20">
        <Header />
        <div className='font-semibold w-full lg:text-5xl text-4xl text-center fixed lg:pt-16 lg:pb-6 pt-10 pb-4 text-white bg-background-500 z-10'>Favoritos</div>
        
        {loading ? (
          <div className='flex justify-center items-center pt-56 lg:pt-72'>
          <div>
            <svg className="animate-spin h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        </div>
        ) : favoriteDocs.length === 0 ? (
          <p className='pt-60 text-center text-white'>No hay favoritos guardados</p>
        ) : (
          <div className='flex justify-center items-start mt-20 p-4 lg:p-20 z-0'>
            <div className="w-full grid lg:grid-cols-2">
              {favoriteDocs.map((doc, index) => (
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
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
