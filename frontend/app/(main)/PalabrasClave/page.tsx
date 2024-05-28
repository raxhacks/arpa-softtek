'use client';

import './PalabrasClave.css';
import { useState } from 'react';
import Header from '../header';
import Segmented from 'rc-segmented';

function Arrow() {
    return(
        <button className="border-0 bg-transparent align-middle ml-[2vw] fixed top-[1.5vh] z-30 md:top-[20vh] md:z-auto" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left hover:stroke-[#BCBAB5] active:stroke-[#565553]" width="56" height="56" viewBox="0 0 24 24" stroke-width="3" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
        </button>
    );
}

function PalabraAutor(data: any){
    return(
        <button className="flex flex-inline items-center border-[2px] border-[#5756F5] rounded-[10px] bg-transparent text-left text-[3vh] my-[2vh]
        py-[1vh] px-[2vw] hover:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled mr-[2vw]" width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
            </svg>
            {data.text}
         </button>
    );
}

function Palabras(data: any) {
    if(data.tab === "Palabras clave del autor"){
        return(
            <div className="flex flex-inline justify-center mt-[2vh]">
                <div className="flex flex-inline mr-[5vw]">
                    <div className="flex flex-col mr-[3vw]">
                        <PalabraAutor text="Palabra clave de prueba 1"/>
                        <PalabraAutor text="Palabra clave de prueba 2"/>
                        <PalabraAutor text="Palabra clave de prueba 3"/>
                        <PalabraAutor text="Palabra clave de prueba 4"/>
                        <PalabraAutor text="Palabra clave 5"/>
                    </div>
                    <div className="flex flex-col ml-[3vw]">
                        <PalabraAutor text="Palabra clave de prueba 6"/>
                        <PalabraAutor text="Palabra clave de prueba 7"/>
                        <PalabraAutor text="Palabra clave de prueba 8"/>
                        <PalabraAutor text="Palabra clave de prueba 9"/>
                        <PalabraAutor text="Palabra 10"/>
                    </div>
                </div>
                <button className="h-[7vh] self-center border-[5px] border-[#FCFAF5] text-[#FCFAF5] rounded-[10px] bg-transparent ml-[5vw]
                py-[2vh] px-[3vw] hover:bg-gray-300">Confirmar</button>
            </div>
        );
    }
    else if(data.tab === "Mis propias palabras clave"){
        return(
            <div className="flex flex-inline">
                <div className="flex flex-inline">
                    <div>
                        Palabra3
                    </div>
                    <div>
                        Palabra4
                    </div>
                </div>
                <button>Confirmar</button>
            </div>
        );
    }
}

function Main(){
    const [currentTab, setTab] = useState("Palabras clave del autor");
    const [palabrasPropias, setPropias] = useState<string[]>([]);
    const [palabrasAutor, setAutor] = useState<string[]>(["Ejemplo 1", "Ejemplo 2", "Ejemplo 3", "Ejemplo 4", "Ejemplo 5", "Ejemplo 6", "Ejemplo 7", "Ejemplo 8", "Ejemplo 9", "Ejemplo 10"]);

    function handleTabChange(value: any){
        setTab(value)
    }

    return(
        <div className="bg-[#30323D] pt-[15vh] pb-[20vh] font-semibold md:pt-[20vh] md:pb-[0vh]">
            <Header/>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#FCFAF5] text-center mb-[3vh] mx-[8vw] text-[5vh] md:text-[5vh]">¿Cómo le gustaría realizar el análisis?</h1>
                <Segmented options={["Palabras clave del autor", "Mis propias palabras clave"]} onChange={(value) => handleTabChange(value)} />
            </div>
            <Palabras tab={currentTab} />
        </div>
    );
}

export default Main;