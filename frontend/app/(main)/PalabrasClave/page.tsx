'use client';

import './PalabrasClave.css';
import { useState, useRef } from 'react';
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
    const handleClick = () => {
        data.setArray((oldArray: string[]) => [...oldArray, data.text])
    }

    return(
        <button className="flex flex-inline w-[27vw] h-[7vh] items-center border-[2px] border-[#5756F5] rounded-[10px] bg-transparent text-left text-[1.2vw]
        my-[2vh] py-[1vh] px-[2vw] text-[#FCFAF5] hover:bg-[#5756F5]" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled mr-[1vw]" width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
            </svg>
            {data.text}
        </button>
    );
}

function PalabraPropia(data: any){
    const [inputWord, setInputWord] = useState<string>("");
    const [isActive, setActive] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputWord(event.target.value);
    };

    const handleClickConfirm = () => {
        if(inputWord !== ""){
            data.setArray((oldArray: string[]) => [...oldArray, inputWord])
            setActive(true);
        }
    }

    const handleClickDelete = () => {
        data.setArray((oldArray: string[]) => oldArray.filter(item => item !== data.wordList[data.id-1]));
    }

    if(data.wordList.length+1 < data.id){
        if(inputWord !== ""){
            setInputWord("");
        }
        return(
            <></>
        );
    }
    else if(data.wordList.length+1 == data.id){
        if(data.wordList[data.id-1] !== "" && isActive == true){
            setInputWord("");
            setActive(false);
        }

        return(
            <div className="flex flex-inline justify-between items-center my-[2vh] w-[26vw] h-[7vh]">
                <div className="flex flex-inline items-center text-left text-[1.2vw] text-[#FCFAF5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled mr-[1vw]" width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
                    </svg>
                    <input className="bg-transparent border-[2px] border-[#5756F5] rounded-[10px] py-[1vh] px-[1vw] hover:bg-[#5756F5]
                    active:rounded-[#5756F5]" type="text" id="palabraPropia" value={inputWord} onChange={handleInputChange} maxLength={30} autoComplete="off"/>
                </div>
                <div className="flex items-center">
                    <button onClick={handleClickConfirm}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus hover:stroke-[#5756F5]" width="30" height="30" viewBox="0 0 24 24" stroke-width="3" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
    else{
        return(
            <div className="flex flex-inline justify-between items-center my-[2vh] w-[27vw] h-[7vh]">
                <div className="flex flex-inline items-center text-left text-[1.2vw] text-[#FCFAF5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled mr-[1vw]" width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
                    </svg>
                    {data.wordList[data.id-1]}
                </div>
                <div className="flex items-center">
                    <button onClick={handleClickDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash mx-[1vw] hover:stroke-[#5756F5]" width="34" height="38" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}

function Palabras(data: any) {
    if(data.tab === "Palabras clave del autor"){
        return(
            <div className="flex flex-inline justify-center mt-[2vh]">
                <div className="flex flex-inline mr-[5vw]">
                    <div className="flex flex-col mr-[3vw]">
                        <PalabraAutor text="Palabra clave de prueba 1" setArray={data.setArray}/>
                        <PalabraAutor text="Palabra clave de prueba 2" setArray={data.setArray}/>
                        <PalabraAutor text="Palabra clave de prueba 3" setArray={data.setArray}/>
                        <PalabraAutor text="Palabra clave de prueba 4" setArray={data.setArray}/>
                        <PalabraAutor text="Palabra clave 5" setArray={data.setArray}/>
                    </div>
                    <div className="flex flex-col ml-[3vw]">
                        <PalabraAutor text="Palabra clave de prueba 6" setArray={data.setArray}/>
                        <PalabraAutor text="Palabra clave de prueba 7" setArray={data.setArray}/>
                        <PalabraAutor text="Palabra clave de prueba 8" setArray={data.setArray}/>
                        <PalabraAutor text="Palabra clave de prueba 9" setArray={data.setArray}/>
                        <PalabraAutor text="Palabra 10" setArray={data.setArray}/>
                    </div>
                </div>
                <button className="h-[8vh] w-[12vw] self-center border-[5px] border-[#FCFAF5] text-[#FCFAF5] rounded-[10px] bg-transparent ml-[5vw]
                text-[3vh] hover:bg-[#FCFAF5] hover:text-[#24252E]">Confirmar</button>
            </div>
        );
    }
    else if(data.tab === "Mis propias palabras clave"){
        return(
            <div className="flex flex-inline justify-center mt-[2vh]">
                <div className="flex flex-inline mr-[4vw]">
                    <div className="flex flex-col mr-[2vw]">
                        <PalabraPropia text="Palabra clave de prueba 1" wordList={data.propias} id={1} setArray={data.setArray}/>
                        <PalabraPropia text="Palabra clave de prueba 2" wordList={data.propias} id={2} setArray={data.setArray}/>
                        <PalabraPropia text="Palabra clave de prueba 3" wordList={data.propias} id={3} setArray={data.setArray}/>
                        <PalabraPropia text="Palabra clave de prueba 4" wordList={data.propias} id={4} setArray={data.setArray}/>
                        <PalabraPropia text="Palabra clave 5" wordList={data.propias} id={5} setArray={data.setArray}/>
                    </div>
                    <div className="flex flex-col ml-[2vw]">
                        <PalabraPropia text="Palabra clave de prueba 6" wordList={data.propias} id={6} setArray={data.setArray}/>
                        <PalabraPropia text="Palabra clave de prueba 7" wordList={data.propias} id={7} setArray={data.setArray}/>
                        <PalabraPropia text="Palabra clave de prueba 8" wordList={data.propias} id={8} setArray={data.setArray}/>
                        <PalabraPropia text="Palabra clave de prueba 9" wordList={data.propias} id={9} setArray={data.setArray}/>
                        <PalabraPropia text="Palabra 10" wordList={data.propias} id={10} setArray={data.setArray}/>
                    </div>
                </div>
                <button className="h-[8vh] w-[12vw] self-center border-[5px] border-[#FCFAF5] text-[#FCFAF5] rounded-[10px] bg-transparent ml-[4vw]
                text-[3vh] hover:bg-[#FCFAF5] hover:text-[#24252E]">Confirmar</button>
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
            <Palabras tab={currentTab} propias={palabrasPropias} setArray={setPropias} />
        </div>
    );
}

export default Main;
