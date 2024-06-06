'use client'

import React, { useState, useEffect } from 'react';
import { Fade } from "react-awesome-reveal";
import { Document } from '../../../model/document';
import './Favorites.css';
import Header from '../header';
import { useRouter } from 'next/navigation';
import { getFavorites } from '../../../services/favorites.service';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

interface ButtonPropsfav{
  state: string;
}

const MenuSortingButtonFav: React.FC<ButtonPropsfav> = (props: ButtonPropsfav) => {
  if (props.state === 'acending') {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-ascending hover:stroke-blue-600 transition-all duration-500" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 6l7 0" />
          <path d="M4 12l7 0" />
          <path d="M4 18l9 0" />
          <path d="M15 9l3 -3l3 3" />
          <path d="M18 6l0 12" />
        </svg>
      </div>
    )
  } else if (props.state === 'decending'){
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-descending hover:stroke-blue-600 transition-all duration-500" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 6l9 0" />
          <path d="M4 12l7 0" />
          <path d="M4 18l7 0" />
          <path d="M15 15l3 3l3 -3" />
          <path d="M18 6l0 12" />
        </svg>
      </div>
    )
  } else if (props.state === 'alfabetic'){
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-ascending-letters hover:stroke-blue-600 transition-all duration-500" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
          <path d="M19 21h-4l4 -7h-4" />
          <path d="M4 15l3 3l3 -3" />
          <path d="M7 6v12" />
        </svg>
      </div>
    )
  }
}

export default function MostrarFavoritos() {
  const [favoriteDocs, setFavoriteDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState('')
  const [orderfav, setOrderFav] = useState('decending')
  const [sortedDocs, setSortedDocs] = useState(favoriteDocs);

  useEffect(() => {
    setSortedDocs(favoriteDocs);
  }, [favoriteDocs]);

  useEffect(() => {
    (async () => {
      const docs = await getFavorites();
      setFavoriteDocs(docs);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const orderType = localStorage.getItem('orderTypeFav');
    if (orderType){
      setOrderFav(orderType);
      switch(orderType) {
        case 'acending':
          sortItemsAscending();
        case 'decending':
          sortItemsDescending();
        case 'alfabetic':
          sortItemsAlphabetically();
        default:
          setOrderFav('decending');
      }
    } else{
      setOrderFav('decending')
    }
  }, []);

  function handleClick(docId: string, analysisId: string){
    router.push(`/Analisis/${docId}/${analysisId}`)
  }
  const monthNames: {[key: string]: number} = {
    'enero': 0,
    'febrero': 1,
    'marzo': 2,
    'abril': 3,
    'mayo': 4,
    'junio': 5,
    'julio': 6,
    'agosto': 7,
    'septiembre': 8,
    'octubre': 9,
    'noviembre': 10,
    'diciembre': 11
  };

  const parseDate = (dateString: string) => {
    const [day, , month, , year] = dateString.split(' ');
    const date = new Date(parseInt(year), monthNames[month.toLowerCase()], parseInt(day));
    return date.getTime();  
  };

  function sortItemsAscending() {
    const sorted = [...sortedDocs].sort((a, b) => parseDate(a.createdAt) - parseDate(b.createdAt));
    setSortedDocs(sorted);
  };

  function sortItemsDescending() {
    const sorted = [...favoriteDocs].sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt));
    setSortedDocs(sorted);
  };

  function sortItemsAlphabetically() {
    const sorted = [...sortedDocs].sort((a, b) => a.title.localeCompare(b.title));
    setSortedDocs(sorted);
  };

  function handleOrder(orderType: string){
    localStorage.setItem('orderTypeFav', orderType);
    setOrderFav(orderType)
  }

  return (
    <>
      <div className="pt-12 pb-20">
      <Header/>
      <div className='grid grid-cols-3 p-4 lg:pt-16 lg:pb-6 z-20 fixed pt-10 pb-4 w-full items-center justify-around bg-background-500 ml-10'>
            <p className='font-semibold lg:text-5xl text-3xl text-white flex justify-end'>
              Favoritos
            </p>
            <div className="max-w-md mx-auto w-full ">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Buscar dentro del historial..." required 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <Menu>
              <MenuButton className={`w-2/5`}>
                <MenuSortingButtonFav state={orderfav}/>
              </MenuButton>
              <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 rounded-xl border border-white/5 bg-slate-500/90 p-1 text-sm/6 text-white focus:outline-none z-30"
                >
                <MenuItem>
                  {orderfav == 'acending' ? (
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-gray-700/50" onClick={() => {handleOrder('acending'), sortItemsAscending()}}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-ascending w-2/12 h-1/5" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 6l7 0" />
                        <path d="M4 12l7 0" />
                        <path d="M4 18l9 0" />
                        <path d="M15 9l3 -3l3 3" />
                        <path d="M18 6l0 12" />
                      </svg>
                      Orden Ascendente
                    </button>
                  ) : (
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={() => {handleOrder('acending'), sortItemsAscending()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-ascending w-2/12 h-1/5" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 6l7 0" />
                      <path d="M4 12l7 0" />
                      <path d="M4 18l9 0" />
                      <path d="M15 9l3 -3l3 3" />
                      <path d="M18 6l0 12" />
                    </svg>
                    Orden Ascendente
                    </button>
                  )}
                </MenuItem>

                <MenuItem>
                  {orderfav == 'decending' ?(
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-gray-700/50" onClick={() => {handleOrder('decending'), sortItemsDescending()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-descending w-2/12 h-1/5" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 6l9 0" />
                      <path d="M4 12l7 0" />
                      <path d="M4 18l7 0" />
                      <path d="M15 15l3 3l3 -3" />
                      <path d="M18 6l0 12" />
                    </svg>
                    Orden Descendente
                  </button>
                  ): (
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={() => {handleOrder('decending'), sortItemsDescending()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-descending w-2/12 h-1/5" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 6l9 0" />
                      <path d="M4 12l7 0" />
                      <path d="M4 18l7 0" />
                      <path d="M15 15l3 3l3 -3" />
                      <path d="M18 6l0 12" />
                    </svg>
                    Orden Descendente
                  </button>
                  )}
                  
                </MenuItem>

                <MenuItem>
                  {orderfav == 'alfabetic' ? (
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-gray-700/50" onClick={() => {handleOrder('alfabetic'), sortItemsAlphabetically()}}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-ascending-letters w-2/12 h-1/5" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
                        <path d="M19 21h-4l4 -7h-4" />
                        <path d="M4 15l3 3l3 -3" />
                        <path d="M7 6v12" />
                      </svg>
                      Orden Alfabético
                    </button> 
                  ) : (
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={() => {handleOrder('alfabetic'), sortItemsAlphabetically()}}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-ascending-letters w-2/12 h-1/5" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
                        <path d="M19 21h-4l4 -7h-4" />
                        <path d="M4 15l3 3l3 -3" />
                        <path d="M7 6v12" />
                      </svg>
                      Orden Alfabético
                    </button> 
                  )}
                
                </MenuItem>

              </MenuItems>
              </Transition>
            </Menu>
          </div>
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
          <p className='pt-60 text-center text-white'>No hay historial de análisis</p>
          ) : (
          <div className='flex justify-center items-start mt-28 p-4 lg:p-20 z-0'>
              <div className="w-full grid lg:grid-cols-2">
              {sortedDocs.filter((item) => {
                  if (search.toLowerCase() === '') {
                    return item;
                  } else {
                    const searchTerm = search.toLowerCase();
                    return item.title.toString().toLowerCase().includes(searchTerm) ||
                           item.createdAt.toString().toLowerCase().includes(searchTerm);
                  }
              }).map((item) => (
                  <div key={item.id} className='pb-4 w-full flex justify-center items-center text-center text-white'>
                  <Fade >
                    <button className='w-72 lg:w-96 h-56 rounded-2xl p-4 bg-favsnhistory-500 transition-colors shadow-md hover:border-blue-200 hover:bg-blue-400' onClick={() => handleClick(item.id, item.analysis_id)}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <h1 className='font-bold'>{item.title}</h1>
                              {item.favorite === true ? (
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler ml-2 icon-tabler-star md:stroke-[#FFFF00] md:fill-[#FFFF00]"
                                    width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="#FCFAF5" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                  </svg>
                                </div>
                              ):(
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler ml-2 icon-tabler-star hover:stroke-[#BCBAB5] md:stroke-[#FFFF00] md:hover:stroke-[#FFFF00]"
                                    width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                  </svg>
                                </div>
                              )}  
                            </div>        
                            <p className='font-bold'>{item.createdAt}</p>
                            <div className='flex justify-center'>
                              <iframe
                                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(item.publicURL)}&embedded=true`}
                                  width="100%"
                                  height="100%"
                              />
                              {/* <DocViewer documents={[
                                { 
                                  uri: `${item.publicURL}`,
                                  fileType: "pdf",
                                },
                              ]} 
                              pluginRenderers={DocViewerRenderers} 
                              /> */}
                            </div>
                        </button>
                  </Fade>
                  </div>
              ))}
              </div>
          </div>
          )}
    </div>  
    </>
  );
}
