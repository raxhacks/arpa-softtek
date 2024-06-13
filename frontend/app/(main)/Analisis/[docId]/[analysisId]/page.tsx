'use client';

import Link from 'next/link';
import './Analisis.css';

import { useState, useEffect, useRef } from 'react';
import Chat from './Chat/Chat';
import Segmented from 'rc-segmented';
import cx from "classnames";
import Collapsible from 'react-collapsible';
import Header from '../../../header';
import { Analysis, Section, Keyword, QuantitativeDatum } from '@/model/analysis';
import { getDocument, deleteDocument } from '@/services/document.service';
import { Doc } from '../../../../../model/document';
import { toggleFavorite } from '@/services/favorites.service';
import { getAnalysis } from '@/services/analysis.service';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import { PieChart } from 'react-minimal-pie-chart';
import Modal from 'react-modal';
import { updateTitle } from '@/services/document.service';
import { Bounce } from "react-awesome-reveal";
import { getText } from '@/services/document.service';
import { Fade } from "react-awesome-reveal";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import { useSortable, arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

function SectionTitle(title: string){
  return(
    <div className="flex">
      <div className="-rotate-90">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-down-filled" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z" stroke-width="0" fill="currentColor" />
        </svg>
      </div>
      <div className="ml-3 text-4xl">
        {title}
      </div>
    </div>
  );
}

function SectionTitleOpen(title: string){
  return(
    <div className="flex">
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-down-filled" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z" stroke-width="0" fill="currentColor" />
      </svg>
      <div className="ml-3 text-4xl">
        {title}
      </div>
    </div>
  );
}

function SectionCollapsible(section: Section){
  return(
    <Collapsible trigger={SectionTitle(section.title)} triggerWhenOpen={SectionTitleOpen(section.title)} transitionTime={150} className="mb-[4vh]">
      <div className="pl-[2vw] mb-[4vh] lg:pl-[4vw]">
        {section.content}
      </div>
    </Collapsible>
  );
}

function TextoPlano(props: {contenido: string}){
  return(
      <div className="pl-[2vw] mb-[4vh] md:pl-[4vw]">
        {props.contenido}
      </div>
  );
}


interface ContentProps{
  currentTab: string;
  originalDocTab: string;
  sections: Section[] | undefined;
  analysisId: string;
  docId: string;
  docUrl: string | undefined;
  searchTarget: string;
  loading: Boolean;
  setOriginalDocTab: any;
  text: string | undefined;
}

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  if(props.currentTab === "Resumen"){
    return(
     <div className="text-[#FCFAF5] text-[3vh] mx-[8vw] mt-[8vh] lg:mx-[10vw]">
        {props.loading ? (
          <div className='flex justify-center items-center pt-44'>
            <div>
              <svg className="animate-spin h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </div>
          </div>
        ) : props.sections?.length == 0 ? (
          <p></p>
        ) : (
          <div>
            {props.sections?.map((section, index) => (
            props.searchTarget !== "" && section.content.includes(props.searchTarget)?
            <Collapsible key={index} trigger={SectionTitle(section.title)} triggerWhenOpen={SectionTitleOpen(section.title)} transitionTime={150} className="mb-[4vh]" open >
              <div className="pl-[2vw] mb-[4vh] lg:pl-[4vw]" data-cy="section-with-word">
                <p> {section.content.substring(0,section.content.indexOf(props.searchTarget))}
                <span style={{fontWeight: 'bold', backgroundColor: '#5456F5'}}> {props.searchTarget} </span>
                {section.content.substring(section.content.indexOf(props.searchTarget) + props.searchTarget.length, section.content.length)} </p>
              </div>
            </Collapsible>
            :
            <Collapsible key={index} trigger={SectionTitle(section.title)} triggerWhenOpen={SectionTitleOpen(section.title)} transitionTime={150} className="mb-[4vh]" data-cy="section-title" >
              <div className="pl-[2vw] mb-[4vh] lg:pl-[4vw]" data-cy="section-open">
                {section.content}
              </div>
            </Collapsible>
            ))}
          </div>
        )}
      </div>
    );
  }
  else if(props.currentTab === "Texto Original"){
    return(
      <div className="flex flex-col items-center justify-center mt-[2vh]">
        <Segmented options={["Texto plano", "Vista completa"]} onChange={(value) => props.setOriginalDocTab(value)} />
        {props.originalDocTab === "Texto plano" ? (
            props.searchTarget !== "" && props.text?.includes(props.searchTarget)?
            <div className="flex items-center justify-start text-[#FCFAF5] w-[70vw] mt-[2vh] p-10">
              <p>{props.text.substring(0,props.text.indexOf(props.searchTarget))} 
              <span style={{fontWeight: 'bold', backgroundColor: '#5456F5'}}>{props.searchTarget}</span>
              {props.text.substring(props.text.indexOf(props.searchTarget)+ props.searchTarget.length, props.text.length)} </p>
            </div> 
            : 
            <div className="flex items-center justify-start text-[#FCFAF5] w-[70vw] mt-[2vh] p-10">
              {props.text}
            </div>
        ) : (
          <div className="flex items-center justify-center h-[60vh] w-[70vw] mt-[2vh]">
            <iframe
            src={`https://docs.google.com/viewer?url=${props.docUrl}&embedded=true`}
            width="70%"
            height="100%" />
          </div>
        )}
      </div>
    );
  }
  else if(props.currentTab === "Chatbot"){
    return(
      <div className="text-[#FCFAF5] text-[3vh] mx-[8vw] mt-[3vh] lg:mx-[10vw] lg:mt-[5vh]" data-cy="chatbot-main">
        <Chat docId={props.docId}/>
      </div>
    );
  }
  else if(props.currentTab === "Texto Plano"){
    return(
      <div className="text-[#FCFAF5] text-[3vh] mx-[8vw] mt-[8vh] md:mx-[10vw]">
        <TextoPlano contenido={props.text || ""} />
      </div>
    );
  }
}

function PieLabel(data: any){
  return(
    <div className="flex justify-center w-full">
      <div className="flex justify-between w-[90%] items-center py-[1vh] pl-[2vw]">
        <div className="h-[3vh] w-[3vh] rounded-[3px] bg-[#7951e8] mr-[1vw]" style={{backgroundColor: data.color}}/>
        <div data-cy="etiqueta-palabra-clave">{data.name}</div>
      </div> 
    </div>
  );
}

function KeywordButton(data: any){
  return(
    <div className="flex justify-center w-full">
      <button className="flex justify-between items-center w-full px-[2vw] py-[0.5vh] my-[1vh] rounded-[10px] hover:bg-[#3E4051]"
      onClick={() => data.setTarget(data.name)} data-cy="elemento-palabra-clave">
        <div className="font-semibold rounded-[10px] py-[1vh] px-[1.5vh] bg-[#5456F5]">{data.count}</div>
        <div className="font-semibold text-[2.5vh]">:{data.name}</div>  
      </button>
    </div>
  );
}

interface LeftProps{
  propWords: Keyword[] | undefined;
  setTarget: (target:string) => void;
  loading: Boolean;
}

const LeftBarContent: React.FC<LeftProps> = (props: LeftProps) => {
  const pieColors = ["#54f55f", "#54f5ba", "#54d2f5", "#549ff5", "#5456f5", "#9f54f5", "#ea54f5", "#f5548a", "#f56954", "#f5b554"];
  const [keywords, setKeywords]= useState<Keyword[]>([])
  useEffect(() => {
    if(props.propWords){
      setKeywords(props.propWords)
    }
  }, [[props.propWords]])
  return(
    <div>
      {props.loading ? (
        <div className='flex justify-center items-center pt-44'>
          <div>
            <svg className="animate-spin h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        </div>
      ): props.propWords?.length == 0 ? (
        <div>
          error
        </div>
      ): (
        <div>
          <div className="text-center font-bold text-[3vh]">Frecuencia de palabras clave</div>
            <PieChart
              className="my-[-5vh]"
              data={keywords.map((content: any, index: number) => ({title: content.keyword, value: content.count, color: pieColors[index]}))}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
              labelStyle={(index) => ({fill: "#FCFAF5", fontSize: "0.75vh", fontFamily: "sans-serif", fontWeight: "600"})}
              labelPosition={70}
              radius={35}
              data-cy="grafica-palabras-clave"
            />
            <div>
              {keywords.map((content: any, index: number) => (
                <PieLabel key={index} name={content.keyword} color={pieColors[index]}/>
              ))}
            </div>
            <br/> <br/>
            <div className="text-center font-bold text-[3vh]">Cantidad de palabras clave</div>
            <br/>
            <div>
              {keywords.map((content: any, index: number) => (
                <KeywordButton key={index} name={content.keyword} count={content.count} setTarget={props.setTarget} />
              ))}
          </div>
        </div>)}
    </div>
  );
}

function QuantitativeSection(prop: any) {
  let target = prop.sentence.indexOf(prop.data);
  
  return(
    <div className="flex justify-center">
      <button className="inline text-start items-center border-[2px] border-[#5456F5] w-[80%] px-[1vw] py-[1vh] my-[1vh]
      rounded-[10px]" onClick={() => prop.setTarget(prop.sentence)} data-cy="elemento-cuantitativo">
        <div className="font-semibold text-[2.5vh]">
          {prop.sentence.includes(prop.data)?
          <p> {prop.sentence.substring(0,target)} <span style={{fontWeight: 'bold', backgroundColor: '#5456F5'}}> {prop.data} </span> {prop.sentence.substring(target + prop.data.length, prop.sentence.length)} </p> 
          : <p> Error: no se detectó el dato {prop.data} en la oración {prop.sentence} </p>}
        </div>  
      </button>
    </div>
  );
}

interface RightProps{
  propData: QuantitativeDatum[] | undefined;
  setTarget: (target:string) => void;
  loading: Boolean;
}

const RightBarContent: React.FC<RightProps> = (props: RightProps) => {
  return (
    <div>
      {props.loading ? (
        <div className='flex justify-center items-center pt-44'>
          <div>
            <svg className="animate-spin h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        </div>
      ) : props.propData?.length == 0 ? (
        <div>No hay datos cuantitativos relevantes por mostrar</div>
      ) : (
        <div>
          <div className="text-center font-bold text-[3vh] mb-[2vh]">Datos cuantitativos encontrados en el documento</div>
          {props.propData?.map((content: any, index: number) =>
            <QuantitativeSection key={index} data={content.datum} sentence={content.sentence} setTarget={props.setTarget} />
          )}
        </div>
      )} 
    </div>
  );
}

function BotonFavorito(favorito: any, {
  params
}:{ 
  params: { docId: string };
}){
  if(favorito.state == true){    
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star hover:stroke-[#BCBAB5] hover:fill-[#BCBAB5]
        lg:stroke-[#5756F5] lg:fill-[#5756F5] lg:hover:stroke-[#2F31AB] lg:hover:fill-[#2F31AB]" width="50" height="50"
        viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="#FCFAF5" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>
    );
  }
  else{
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star hover:stroke-[#BCBAB5] lg:stroke-[#5756F5] lg:hover:stroke-[#2F31AB]"
      width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
    );
  }
}

function BotonHome(){
  const router = useRouter()
  return(
    <button onClick={()=> {
      router.push('/CargarArchivos');
      localStorage.setItem("button", 'CargarArchivos')
    }}
    className="fixed top-[1.5vh] left-[2vw] z-30 lg:relative lg:top-auto lg:left-auto lg:z-auto lg:mr-[2vw]"
    data-cy="boton-home">
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-2 hover:stroke-[#BCBAB5] active:fill-[#BCBAB5]
      lg:stroke-[#5756F5] lg:hover:stroke-[#2F31AB] lg:active:fill-[#2F31AB]" width="50" height="50" viewBox="0 0 24 24"
      stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M10 12h4v4h-4z" />
      </svg>
    </button>

  );
}

function MostrarAnalisis({
  params,
}:{ 
  params: { docId: string, analysisId: string };
}) {
  const [currentTab, setTab] = useState("Resumen");
  const [originalDocTab, setOriginalDocTab] = useState("Texto plano");
  const [leftBarOpen, setLeftBar] = useState(false);
  const [rightBarOpen, setRightBar] = useState(false);
  const [isFavorito, setFavorito] = useState(false);
  const [documentInfo, setDocumentInfo] = useState<Doc>();
  const [analysis, setAnalysis] = useState<Analysis>();  
  const [searchTarget, setTarget] = useState("");
  const [loading, setloading] = useState(true);
  const [togglingToFav, setLoadingFav] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(documentInfo?.title);
  const [text, setText] = useState();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const[errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      setDocumentInfo(await getDocument(params.docId));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log("Getting text")
      setText(await getText(params.docId));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const analysisResponse = await getAnalysis(params.docId, params.analysisId)
      setAnalysis(analysisResponse);
      setloading(false)
    })();
  }, []);

  function handleTabChange(value: any){
    setTab(value)
  }

  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite-${params.docId}`);
    if (storedFavorite !== null) {
      setFavorito(storedFavorite === 'true');
    } else {
      (async () => {
        const docInfo = await getDocument(params.docId);
        setFavorito(docInfo.favorite);
        localStorage.setItem(`favorite-${params.docId}`, docInfo.favorite.toString());
      })();
    }
  }, [params.docId]);
  
  const toggleFav = async () => {
    const newFavoriteState = !isFavorito;
    setLoadingFav(true);
    const response = await toggleFavorite(params.docId, newFavoriteState.toString());
    setLoadingFav(false);
    setFavorito(newFavoriteState);
    localStorage.setItem(`favorite-${params.docId}`, newFavoriteState.toString());
    if (!response) {
      console.log('error al marcar como favorito');
      setFavorito(!newFavoriteState);
      localStorage.setItem(`favorite-${params.docId}`, (!newFavoriteState).toString());
    }
  };
  const openModal = (docId: string) => {
    setSelectedDocId(docId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDocId(null);
  };

  const deleteDoc = async () => {
    if (!selectedDocId) return;

    const response = await deleteDocument(selectedDocId);
    if (!response) {
      console.log('Error al eliminar el documento');
      return;
    }
    router.push('/CargarArchivos');
    localStorage.setItem("button", 'CargarArchivos')
  }; 

  useEffect(() => {
    setTitle(documentInfo?.title)
  },[documentInfo?.title]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: any) => {
    if (event.length <= 0){
      setErrorMessage('Ingrese un titulo');
      return
    } else if (event.length >= 50){
      setErrorMessage('El titulo debe ser menor a 50 caracteres');
      return
    } else {
      setTitle(event.target.value);
    }
  };

  const handleSaveClick = async (docId: string, title: string | undefined) => {
    if (docId && title){
      const response = await updateTitle(docId, title);
      if (response) setIsEditing(false); setTitle(title);
    } else (
      console.log("Error editando el titulo del documento")
    )
  };

  const handleClickOutside = (event: any) => {
    if (
      inputRef.current && !inputRef.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target)
    ) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div className="flex items-top justify-center" data-cy="analisis-main">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar eliminación"
        className="z-50 fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <Bounce className="bg-[#4D5061] p-8 rounded-lg shadow-lg w-3/5 max-w-2xl">
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Confirmar eliminación</h2>
            <p className='text-white'>¿Estás seguro de que quieres eliminar este documento?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={deleteDoc}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </Bounce>
      </Modal>
      <Header />
      <div className="flex items-center h-screen left-[-100vw] lg:left-auto">
        <div className={cx("sideBarLeft", {"sideBarLeft-closed":!leftBarOpen})}>
          <div className={cx("sideBarLeftText", {"sideBarLeftText-closed":!leftBarOpen})}>
            <div className="text-center text-[4vh] font-semibold pb-[3vh] lg:text-[0vw] lg:pb-[0vh]">
              Análisis cualitativo
            </div>
            {/* <LeftBarContent keywords={analysis?.Keywords} /> */}
            <LeftBarContent propWords={analysis?.Keywords} setTarget={setTarget} loading={loading}/>
          </div>
        </div>
        <div className={cx("sideBarLeftSpace", {"sideBarLeftSpace-closed":!leftBarOpen})} />
        <button onClick={() => {setLeftBar(!leftBarOpen), setRightBar(false)}}
        className={cx("sideBarLeftButton hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarLeftButton-closed":!leftBarOpen})}
        data-cy="boton-cualitativo-large">
          Palabras clave
        </button>
        <button onClick={() => {setLeftBar(!leftBarOpen), setRightBar(false)}}
        className={cx("sideBarLeftButton2 hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarLeftButton2-closed":!leftBarOpen})}
        data-cy="boton-cualitativo-small">
          +
        </button>
      </div>
      <div className="bg-[#30323D] pt-[25vh] mb-[15vh] bottom-0 font-semibold basis-[93vw] md:pt-[125px] md:mb-auto">
        <div className="w-[50%] mx-auto text-center font-bold text-white text-[3vh] mt-[-5vh] mb-[2vh] text-ellipsis overflow-hidden">
          {isEditing ? (
            <input
            type="text"
            value={title}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveClick(params.docId, title)}
            className={`text-white p-2 rounded-md h-8 bg-slate-600 border-b-white`}
            placeholder='...'
            ref={inputRef}
            />
          ): (
            <button className='hover:bg-slate-600 transition-all' onClick={handleEditClick}>{title}</button>
          )}
          <button className='ml-2' onClick={isEditing ? () => handleSaveClick(params.docId, title) : handleEditClick} ref={buttonRef}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24h24H0z" fill="none"/>
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center">
          <BotonHome />
          <div className="w-[10vw] lg:w-0"/>
          <Segmented options={["Resumen", "Texto Original", "Chatbot"]} onChange={(value) => handleTabChange(value)} />
          <div className="w-[10vw] lg:w-0"/>
          <button className="fixed top-[1.5vh] right-[2vw] z-30 lg:relative lg:top-auto lg:right-auto lg:z-auto lg:ml-[2vw]"
          onClick={toggleFav} data-cy="boton-favorito">
            {togglingToFav ? (
                <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="blue"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
            ) : (            
              <BotonFavorito state={isFavorito} setFavorito={setFavorito} docId={params.docId}/>
            )}
          </button>
          <button className="fixed top-[1.5vh] right-[2vw] z-30 md:relative md:top-auto md:right-auto md:z-auto md:ml-[2vw]" onClick={() => openModal(params.docId)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash hover:stroke-[#BCBAB5] md:stroke-[#5756F5] md:hover:stroke-[#2F31AB]"
              width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
          <div/>
        </div>
        {/* <Content currentTab={currentTab} sections={analysis?.Sections} analysisId={params.analysisId} docId={documentInfo?.id} docUrl={documentInfo?.publicURL} /> */}
        <Content currentTab={currentTab} originalDocTab={originalDocTab} sections={analysis?.Sections} analysisId={params.analysisId}
        docId={params.docId} docUrl={documentInfo?.publicURL} searchTarget={searchTarget} loading={loading} setOriginalDocTab={setOriginalDocTab} text={text}/>
      </div>
      <div className="flex items-center h-screen">
        <button onClick={() => {setRightBar(!rightBarOpen), setLeftBar(false)}}
        className={cx("sideBarRightButton hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarRightButton-closed":!rightBarOpen})}
        data-cy="boton-cuantitativo-large">
          Datos cuantitativos
        </button>
        <button onClick={() => {setRightBar(!rightBarOpen), setLeftBar(false)}}
        className={cx("sideBarRightButton2 hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarRightButton2-closed":!rightBarOpen})}
        data-cy="boton-cuantitativo-small">
          +
        </button>
        <div className={cx("sideBarRightSpace", {"sideBarRightSpace-closed":!rightBarOpen})} />
        <div className={cx("sideBarRight", {"sideBarRight-closed":!rightBarOpen})}>
          <div className={cx("sideBarRightText", {"sideBarRightText-closed":!rightBarOpen})}>
            <div className="text-center text-[4vh] font-semibold pb-[3vh] lg:text-[0vw] lg:pb-[0vh]">
              Análisis cuantitativo
            </div>
            <RightBarContent propData={analysis?.QuantitativeData} setTarget={setTarget} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostrarAnalisis;