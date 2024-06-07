'use client';

import './PalabrasClave.css';
import { useState, useRef } from 'react';
import Header from '../header';
import Segmented from 'rc-segmented';
import { createAnalysis } from '@/services/analysis.service';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Arrow() {
    return(
        <button className="border-0 bg-transparent align-middle ml-[2vw] fixed top-[1.5vh] z-30 md:top-[14vh] md:z-auto" onClick={() => {}} data-cy="palabras-atras" >
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
        if(!data.propias.includes(data.wordList[data.id-1])){
            data.setArray((oldArray: string[]) => [...oldArray, data.wordList[data.id-1]])
        }
    }

    if(data.wordList.length < data.id){
        return(
            <></>
        );
    }
    else{
        return(
            <button className="flex flex-inline w-[70vw] md:w-[27vw] h-[8vh] md:h-[7vh] items-center border-[2px] border-[#5756F5] rounded-[10px] bg-transparent
            text-left text-[3.5vw] md:text-[1.2vw] my-[2vh] py-[1vh] px-[2vw] md:px-[1vw] text-[#FCFAF5] hover:bg-[#5756F5]" onClick={handleClick} data-cy="palabra-autor">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled mr-[1vw]" width="25" height="25" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
                </svg>
                {data.wordList[data.id-1]}
            </button>
        );
    }
}

function PalabraPropia(data: any){
    const [inputWord, setInputWord] = useState<string>("");
    const [isActive, setActive] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputWord(event.target.value);
    };

    const handleClickConfirm = () => {
        if(inputWord !== "" && inputWord.match(/\S(.*\S)?/)){
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
            <div className="flex flex-inline justify-between items-center my-[2vh] w-[70vw] md:w-[26vw] h-[8vh] md:h-[7vh]">
                <div className="flex flex-inline items-center text-left text-[3.5vw] md:text-[1.2vw] text-[#FCFAF5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled mr-[2vw] md:mr-[1vw]" width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
                    </svg>
                    <input className="bg-transparent border-[2px] border-[#5756F5] rounded-[10px] py-[1vh] px-[1vw] hover:bg-[#5756F5] w-[55vw]
                    md:w-[20vw] h-[6vh] md:h-auto active:rounded-[#5756F5]" type="text" id="palabraPropia" value={inputWord} onChange={handleInputChange} maxLength={30}
                    autoComplete="off" data-cy="input-propia" />
                </div>
                <div className="flex items-center">
                    <button onClick={handleClickConfirm} data-cy="add-propia" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus ml-[2vw] md:ml-[1vw] hover:stroke-[#5756F5]" width="30" height="30" viewBox="0 0 24 24" stroke-width="3" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
            <div className="flex flex-inline justify-between items-center my-[2vh] w-[70vw] md:w-[27vw] h-[8vh] md:h-[7vh]" data-cy="palabra-propia" >
                <div className="flex flex-inline items-center text-left text-[3.5vw] md:text-[1.2vw] text-[#FCFAF5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled mr-[2vw] md:mr-[1vw]" width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
                    </svg>
                    {data.wordList[data.id-1]}
                </div>
                <div className="flex items-center">
                    <button onClick={handleClickDelete} data-cy="delete-propia">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash ml-[2vw] md:ml-[1vw] hover:stroke-[#5756F5]" width="34" height="38" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
    const [loading, setLoading] = useState(false)
    const handleConfirm = () => {
        setLoading(true);
        data.handleConfirm();
    }
    if(data.tab === "Palabras clave del autor"){
        return(
            <div className="flex flex-col md:flex-row justify-center items-center mt-[2vh] h-auto md:h-[60vh]">
                <div className="flex flex-col md:flex-row mr-0 md:mr-[4vw]">
                    <div className="flex flex-col mr-0 md:mr-[2vw]">
                        <PalabraAutor wordList={data.autor} id={1} propias={data.propias} setArray={data.setArray}/>
                        <PalabraAutor wordList={data.autor} id={2} propias={data.propias} setArray={data.setArray}/>
                        <PalabraAutor wordList={data.autor} id={3} propias={data.propias} setArray={data.setArray}/>
                        <PalabraAutor wordList={data.autor} id={4} propias={data.propias} setArray={data.setArray}/>
                        <PalabraAutor wordList={data.autor} id={5} propias={data.propias} setArray={data.setArray}/>
                    </div>
                    <div className="flex flex-col ml-0 md:ml-[2vw]">
                        <PalabraAutor wordList={data.autor} id={6} propias={data.propias} setArray={data.setArray}/>
                        <PalabraAutor wordList={data.autor} id={7} propias={data.propias} setArray={data.setArray}/>
                        <PalabraAutor wordList={data.autor} id={8} propias={data.propias} setArray={data.setArray}/>
                        <PalabraAutor wordList={data.autor} id={9} propias={data.propias} setArray={data.setArray}/>
                        <PalabraAutor wordList={data.autor} id={10} propias={data.propias} setArray={data.setArray}/>
                    </div>
                </div>
                {loading ? 
                    <button className="h-[8vh] w-[12vw] self-center border-[5px] border-[#FCFAF5] text-[#FCFAF5] rounded-[10px] bg-transparent ml-0
                    md:ml-[4vw] text-[3vh] mt-[5vh] md:mt-0 min-w-[150px] hover:bg-[#FCFAF5] hover:text-[#24252E] flex justify-center">
                        <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </button>
                     :
                    <button className="h-[8vh] w-[12vw] self-center border-[5px] border-[#FCFAF5] text-[#FCFAF5] rounded-[10px] bg-transparent ml-0
                    md:ml-[4vw] text-[3vh] mt-[5vh] md:mt-0 min-w-[150px] hover:bg-[#FCFAF5] hover:text-[#24252E]"
                    onClick={handleConfirm} data-cy="palabras-confirm" >Confirmar</button>
                }
            </div>
        );
    }
    else if(data.tab === "Mis propias palabras clave"){
        return(
            <div className="flex flex-col md:flex-row justify-center items-center mt-[2vh] h-auto md:h-[60vh]">
                <div className="flex flex-col md:flex-row mr-0 md:mr-[4vw]">
                    <div className="flex flex-col mr-0 md:mr-[2vw]">
                        <PalabraPropia wordList={data.propias} id={1} setArray={data.setArray}/>
                        <PalabraPropia wordList={data.propias} id={2} setArray={data.setArray}/>
                        <PalabraPropia wordList={data.propias} id={3} setArray={data.setArray}/>
                        <PalabraPropia wordList={data.propias} id={4} setArray={data.setArray}/>
                        <PalabraPropia wordList={data.propias} id={5} setArray={data.setArray}/>
                    </div>
                    <div className="flex flex-col ml-0 md:ml-[2vw]">
                        <PalabraPropia wordList={data.propias} id={6} setArray={data.setArray}/>
                        <PalabraPropia wordList={data.propias} id={7} setArray={data.setArray}/>
                        <PalabraPropia wordList={data.propias} id={8} setArray={data.setArray}/>
                        <PalabraPropia wordList={data.propias} id={9} setArray={data.setArray}/>
                        <PalabraPropia wordList={data.propias} id={10} setArray={data.setArray}/>
                    </div>
                </div>
                <button className="h-[8vh] w-[12vw] self-center border-[5px] border-[#FCFAF5] text-[#FCFAF5] rounded-[10px] bg-transparent ml-0
                md:ml-[4vw] text-[3vh] mt-[5vh] md:mt-0 min-w-[150px] hover:bg-[#FCFAF5] hover:text-[#24252E]"
                onClick={handleConfirm} data-cy="palabras-confirm">Confirmar</button>
            </div>
        );
    }
}

function PalabrasClave(props:any){
    const [currentTab, setTab] = useState("Palabras clave del autor");
    const [palabrasPropias, setPropias] = useState<string[]>([]);
    const [palabrasAutor, setAutor] = useState<string[]>(!props.precreationObject.keywords ? [] : props.precreationObject.keywords);

    const router = useRouter();
    function handleTabChange(value: any){
        setTab(value)
    }

    const handleConfirm = () => {
        if (palabrasPropias.length > 0) {
            props.precreationObject["keywords"] = palabrasPropias;
            props.precreationObject["userOwnKeywords"]=true;
        } else {
            props.precreationObject["userOwnKeywords"]=false;
        }
        axios.post("/api/analysis",props.precreationObject).then((response) => {
            const docId = response.data.document_id;
            const analysisId = response.data.analysis_id;
            router.push(`/Analisis/${docId}/${analysisId}`);
        });
    }

    return(
        <div className="bg-[#30323D] pt-[15vh] pb-[15vh] font-semibold md:pt-[15vh] md:pb-[0vh]" data-cy="palabras-main">
            <Header/>
            <button onClick={()=>props.setPalabrasClaveView()}>
                <Arrow />
            </button>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#FCFAF5] text-center w-auto mb-[5vh] mx-[8vw] text-[5vh] md:text-[5vh] md:w-[70vw]">¿Cómo le gustaría realizar el análisis?</h1>
                <Segmented className="mx-[7vw] md:mx-auto" options={["Palabras clave del autor", "Mis propias palabras clave"]} onChange={(value) => handleTabChange(value)} />
            </div>
            <Palabras handleConfirm={handleConfirm} tab={currentTab} autor={palabrasAutor} propias={palabrasPropias} setArray={setPropias} />
        </div>
    );
}

export default PalabrasClave;
