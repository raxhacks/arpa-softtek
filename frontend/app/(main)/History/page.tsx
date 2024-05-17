'use client';


// import './History.css'
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { Fade } from "react-awesome-reveal";``
import { getHistory } from '@/services/document.service'
import { Document } from '../../../model/document';
import Header from '../header';

export default function MostrarHistorial() {

  const [historyDocs, setHistoryDocs] = useState<Document[]>([]);

  useEffect(() => {
    (async () => {
      setHistoryDocs(await getHistory());
    })();
    // Llama a fetchData directamente dentro del useEffect
  }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente
    
    return (
      <>
        <div className="pt-12 lg:pt-24 pb-20 lg:pb-24">
          <Header />          
          <div className='font-semibold w-full text-4xl lg:text-5xl md:text-5xl text-center fixed pt-8 pb-2 lg:pb-4 md:pb-4 text-white bg-background-500 z-10'>Historial</div>
          {historyDocs.length === 0 && 
            <p className='pt-56 text-center'>Historial vacío</p>
          }
          <div className='w-full p-8'></div>
          <div className='flex justify-center items-start p-4 lg:p-20 z-0'>
              <div className="w-full grid lg:grid-cols-2">
              {historyDocs?.map((doc, index) => 
                   ( 
                    <div key={index} className='pb-4 w-full flex justify-center items-center text-center text-white'>
                      <Link href={`/Analisis/${doc.id}/`}>
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
