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
        <div className="border-0 bg-transparent align-middle ml-[2vw] fixed top-[1.5vh] z-30 md:top-[14vh] md:z-auto" >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left hover:stroke-[#BCBAB5] active:stroke-[#565553]" width="56" height="56" viewBox="0 0 24 24" stroke-width="3" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
        </div>
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
            <button className="inline bg-[#24252E] h-[8vh] md:h-[7vh] rounded-[10px] text-[3.5vw] md:text-[1.2vw] my-[1vh] mx-[0.5vw]
            py-[1vh] px-[2vw] md:px-[1vw] text-[#FCFAF5] hover:bg-[#5756F5]" onClick={handleClick} data-cy="palabra-autor">
                {data.wordList[data.id-1]}
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus float-right ml-[1vw]" width="30" height="30" viewBox="0 0 24 24" stroke-width="3" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                </svg>
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
        if(inputWord !== "" && inputWord.match(/\S(.*\S)?/) && inputWord.match(/^[A-Za-zÀ-ÖØ-öø-ÿ][À-ÖØ-öø-ÿ\w\s.-]*$/)){
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
            <div className="flex flex-inline justify-start items-start w-[60vw] md:w-[15vw] h-[14vh]">
                <div className="text-[#FCFAF5]">{data.id}.</div>
            </div>
        );
    }
    else if(data.wordList.length+1 == data.id){
        if(data.wordList[data.id-1] !== "" && isActive == true){
            setInputWord("");
            setActive(false);
        }
        return(
            <div className="flex flex-inline justify-between items-start w-[60vw] md:w-[15vw] h-[14vh]">
                <div className="text-[#FCFAF5]">{data.id}.</div>
                <div className="text-left text-[3.5vw] md:text-[1vw] text-[#FCFAF5]">
                    <input className="bg-transparent w-auto md:w-[12vw] h-auto mx-[0.5vw]" type="text" id="palabraPropia" placeholder="Escriba aquí su palabra"
                    value={inputWord} onChange={handleInputChange} maxLength={30} autoComplete="off" data-cy="input-propia" />
                </div>
                <div>
                    <button onClick={handleClickConfirm} data-cy="add-propia" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus mt-[-0.3vh] hover:stroke-[#5756F5]" width="30" height="30" viewBox="0 0 24 24" stroke-width="3" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
            <div className="flex flex-inline justify-between items-start w-[60vw] md:w-[15vw] h-[14vh]">
                <div className="text-[#FCFAF5]">{data.id}.</div>
                <div className="text-left text-wrap text-[3.5vw] md:text-[1vw] text-[#FCFAF5] w-auto md:w-[12vw] h-auto mx-[0.5vw]"
                data-cy="palabra-propia">
                    {data.wordList[data.id-1]}
                </div>
                <div>
                    <button onClick={handleClickDelete} data-cy="delete-propia">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash mt-[-1.2vh] hover:stroke-[#5756F5]" width="34" height="38" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
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

function PalabrasRecomendadas(data: any) {
    return(
        <div className="block w-[30vw] h-[50vh] mr-[1vw]">
            <div className="flex justify-center w-auto text-[#FCFAF5] text-[1.5vw] h-[5vh] mb-[2vh]">
                Palabras del documento recomendadas
            </div>
            <div className="h-[42vh] overflow-y-auto">
                <PalabraAutor wordList={data.autor} id={1} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={2} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={3} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={4} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={5} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={6} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={7} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={8} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={9} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={10} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={11} propias={data.propias} setArray={data.setArray}/>
                <PalabraAutor wordList={data.autor} id={12} propias={data.propias} setArray={data.setArray}/>
            </div>
        </div>
    );
}

function ListaDePalabras(data: any) {
    return(
        <div className="flex flex-col md:flex-row justify-around items-center bg-[#24252E] rounded-[20px] w-[60vw] h-[50vh] ml-[1vw]">
            <div className="flex flex-col">
                <PalabraPropia wordList={data.propias} id={1} setArray={data.setArray}/>
                <PalabraPropia wordList={data.propias} id={2} setArray={data.setArray}/>
                <PalabraPropia wordList={data.propias} id={3} setArray={data.setArray}/>
            </div>
            <div className="flex flex-col">
                <PalabraPropia wordList={data.propias} id={4} setArray={data.setArray}/>
                <PalabraPropia wordList={data.propias} id={5} setArray={data.setArray}/>
                <PalabraPropia wordList={data.propias} id={6} setArray={data.setArray}/>
            </div>
            <div className="flex flex-col">
                <PalabraPropia wordList={data.propias} id={7} setArray={data.setArray}/>
                <PalabraPropia wordList={data.propias} id={8} setArray={data.setArray}/>
                <PalabraPropia wordList={data.propias} id={9} setArray={data.setArray}/>
            </div>
        </div>
    );
}

function BotonConfirmar(data: any) {
    const [loading, setLoading] = useState(false)
    const handleConfirm = () => {
        setLoading(true);
        data.handleConfirm();
    }
    
    if(data.wordList.length <= 0){
        return(
            <></>
        );
    }
    else{
        return(
            <div>
                {loading ? 
                    <button className="h-[8vh] w-[12vw] border-[5px] border-[#FCFAF5] text-[#FCFAF5] rounded-[10px] bg-transparent
                    text-[3vh] mt-[5vh] min-w-[150px] max-h-[60px] hover:bg-[#FCFAF5] hover:text-[#24252E] flex justify-center">
                        <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </button>
                     :
                    <button className="h-[8vh] w-[12vw] border-[5px] border-[#FCFAF5] text-[#FCFAF5] rounded-[10px] bg-transparent
                    text-[3vh] mt-[5vh] min-w-[150px] max-h-[60px] hover:bg-[#FCFAF5] hover:text-[#24252E]"
                    onClick={handleConfirm} data-cy="palabras-confirm" >Confirmar</button>
                }
            </div>
        );
    }
}

function PalabrasClave(props:any){
    const [palabrasPropias, setPropias] = useState<string[]>([]);
    const [palabrasAutor, setAutor] = useState<string[]>(!props.precreationObject.keywords ? [] : props.precreationObject.keywords);
    //const [palabrasAutor, setAutor] = useState<string[]>(["Palabra muy larga 1", "Palabra 2", "Palabra palabra palabra 3", "Pal 4", "Pal 5", "Pal 6", "Palabra 7", "Palabra 8", "Palabra 9", "Palabra 10", "Palaaaaabra 11", "P12"]);

    const router = useRouter();

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
        <div className="bg-[#30323D] pt-[15vh] pb-[15vh] font-semibold md:pt-[12vh] md:pb-[0vh]" data-cy="palabras-main">
            <Header/>
            <button onClick={()=>props.setPalabrasClaveView()} data-cy="palabras-atras">
                <Arrow />
            </button>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#FCFAF5] text-center w-auto mb-[5vh] mx-[8vw] text-[5vh] md:text-[5vh] md:w-[70vw]">Seleccione las palabras clave para realizar su análisis</h1>
                <div className="flex">
                    <PalabrasRecomendadas autor={palabrasAutor} propias={palabrasPropias} setArray={setPropias} />
                    <ListaDePalabras propias={palabrasPropias} setArray={setPropias} />
                </div>
                <BotonConfirmar handleClickConfirm={handleConfirm} wordList={palabrasPropias} />
            </div>
        </div>
    );
}

export default PalabrasClave;
