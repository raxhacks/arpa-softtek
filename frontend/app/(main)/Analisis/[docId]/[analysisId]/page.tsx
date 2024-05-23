'use client';

import Link from 'next/link';
import './Analisis.css';
import { useState, useEffect } from 'react';
import Chat from './Chat/Chat';
import Segmented from 'rc-segmented';
import cx from "classnames";
import Collapsible from 'react-collapsible';
import Header from '../../../header';
import { Section } from "@/model/section";
import { getDocument } from '@/services/document.service';
import { Document } from '../../../../../model/document';
import { toggleFavorite } from '@/services/favorites.service';
import { PieChart } from 'react-minimal-pie-chart';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import { useSortable, arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import { getSections } from '@/services/analysis.service';

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

interface ContentProps{
  currentTab: string;
  sections: Section[];
  analysisId: string;
  docId: string;
  searchTarget: string;
}

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  const encodedUrl = encodeURIComponent("https://storage.googleapis.com/arpa-softtek.appspot.com/users/hNb7IaKYx7bRUWEWB9cn575nATF2/Raymundo_Guzman_Mata_English_CV%20%281%29.pdf");
  const viewerURL = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
  const [docs, setDocs] = useState<Document>();
  const [section, setSections] = useState<Section[]>();
  
  useEffect(() => {
    (async () => {
      setDocs(await getDocument(props.docId));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setSections(await getSections(props.docId, props.analysisId))
    })();
  }, []);

  if(props.currentTab === "Resumen"){
    return(
      <div className="text-[#FCFAF5] text-[3vh] mx-[8vw] mt-[8vh] md:mx-[10vw]">
        {props.sections.map((section, index) => (
          props.searchTarget !== "" && section.content.includes(props.searchTarget)?
          <Collapsible trigger={SectionTitle(section.title)} triggerWhenOpen={SectionTitleOpen(section.title)} transitionTime={150} className="mb-[4vh]" open >
            <div className="pl-[2vw] mb-[4vh] md:pl-[4vw]">
              <p> {section.content.substring(0,section.content.indexOf(props.searchTarget))}
              <span style={{fontWeight: 'bold', backgroundColor: '#5456F5'}}> {props.searchTarget} </span>
              {section.content.substring(section.content.indexOf(props.searchTarget) + props.searchTarget.length, section.content.length)} </p>
            </div>
          </Collapsible>
          :
          <Collapsible trigger={SectionTitle(section.title)} triggerWhenOpen={SectionTitleOpen(section.title)} transitionTime={150} className="mb-[4vh]" >
            <div className="pl-[2vw] mb-[4vh] md:pl-[4vw]">
              {section.content}
            </div>
          </Collapsible>
        ))}
      </div>
    );
  }
  else if(props.currentTab === "Texto Original"){
    return(
      <div className="text h-screen">
         <iframe
         src={`https://docs.google.com/viewer?url=${docs?.publicURL}&embedded=true`}
         width="100%"
         height="100%"
         />    
      </div>
    );
  }
  else if(props.currentTab === "Chatbot"){
    return(
      <div className="text-[#FCFAF5] text-[3vh] mx-[8vw] mt-[3vh] md:mx-[10vw] md:mt-[5vh]">
        <Chat docId={props.docId}/>
      </div>
    );
  }
}

function PieLabel(data: any){
  return(
    <div className="flex inline justify-end items-center py-[1vh] pl-[2vw]">
      <div>{data.name}</div>
      <div className="h-[3vh] w-[3vh] rounded-[3px] bg-[#7951e8] mr-[1vw]" style={{backgroundColor: data.color}}/>
    </div>
  );
}

function KeywordButton(data: any){
  return(
    <div className="flex inline justify-center">
      <button className="flex inline justify-between items-center w-[80%] px-[2vw] py-[0.5vh] my-[1vh] rounded-[10px] hover:bg-[#3E4051]" onClick={() => data.setTarget(data.name)}>
        <div className="font-semibold rounded-[10px] py-[1vh] px-[1.5vh] bg-[#5456F5]">{data.count}</div>
        <div className="font-semibold text-[2.5vh]">:{data.name}</div>  
      </button>
    </div>
  );
}

interface KeywordProps{
  keyword: string;
  count: number;
}
interface LeftProps{
  propWords: KeywordProps[];
  setTarget: (target:string) => void;
}

const LeftBarContent: React.FC<LeftProps> = (props: LeftProps) => {
  const pieColors = ["#54f55f", "#54f5ba", "#54d2f5", "#549ff5", "#5456f5", "#9f54f5", "#ea54f5", "#f5548a", "#f56954", "#f5b554"];

  return(
    <div>
      <div className="text-center font-bold text-[3vh]">Frecuencia de palabras clave</div>
      <PieChart
        data={props.propWords.map((content: any, index: number) => ({title: content.keyword, value: content.count, color: pieColors[index]}))}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
        labelStyle={(index) => ({fill: "#FCFAF5", fontSize: "0.75vh", fontFamily: "sans-serif", fontWeight: "600"})}
        labelPosition={70}
        radius={35}
      />
      <div>
        {props.propWords.map((content: any, index: number) => (
          <PieLabel name={content.keyword} color={pieColors[index]}/>
        ))}
      </div>
      <br/> <br/>
      <div className="text-center font-bold text-[3vh]">Cantidad de palabras clave</div>
      <br/>
      <div>
        {props.propWords.map((content: any, index: number) => (
          <KeywordButton name={content.keyword} count={content.count} setTarget={props.setTarget} />
        ))}
      </div>
    </div>
  );
}

function QuantitativeSection(prop: any) {
  let target = prop.sentence.indexOf(prop.data);
  
  return(
    <div className="flex justify-center">
      <button className="flex inline text-start items-center border-[2px] border-[#5456F5] w-[80%] px-[1vw] py-[1vh] my-[1vh]
      rounded-[10px] hover:bg-[#5456F5]" onClick={() => prop.setTarget(prop.sentence)}>
        <div className="font-semibold text-[2.5vh]">
          {prop.sentence.includes(prop.data)?
          <p> {prop.sentence.substring(0,target)} <span style={{fontWeight: 'bold', backgroundColor: '#5456F5'}}> {prop.data} </span> {prop.sentence.substring(target + prop.data.length, prop.sentence.length)} </p> 
          : <p> Error: no se detectó el dato {prop.data} en la oración {prop.sentence} </p>}
        </div>  
      </button>
    </div>
  );
}

interface QuantDataProps{
  data: string;
  sentence: string;
}
interface RightProps{
  propData: QuantDataProps[];
  setTarget: (target:string) => void;
}

const RightBarContent: React.FC<RightProps> = (props: RightProps) => {
  return (
    <div>
      <div className="text-center font-bold text-[3vh] mb-[2vh]">Datos cuantitativos encontrados en el documento</div>
      {props.propData.map((content: any, index: number) =>
        <QuantitativeSection data={content.data} sentence={content.sentence} setTarget={props.setTarget} />
      )}
    </div>
  );
}

function BotonFavorito(favorito: any, {
  params,
}:{ 
  params: { docId: string };
}){
  if(favorito.state == true){    
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star hover:stroke-[#BCBAB5] hover:fill-[#BCBAB5] md:stroke-[#5756F5] md:fill-[#5756F5] md:hover:stroke-[#2F31AB] md:hover:fill-[#2F31AB]"
      width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="#FCFAF5" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
    );
  }
  else{
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star hover:stroke-[#BCBAB5] md:stroke-[#5756F5] md:hover:stroke-[#2F31AB]"
      width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
    );
  }
}

function BotonHome(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-2 hover:stroke-[#BCBAB5] active:fill-[#BCBAB5] md:stroke-[#5756F5] md:hover:stroke-[#2F31AB] md:active:fill-[#2F31AB]"
    width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M10 12h4v4h-4z" />
    </svg>
  );
}

function MostrarAnalisis({
  params,
}:{ 
  params: { docId: string, analysisId: string };
}) {
  const [currentTab, setTab] = useState("Resumen");
  const [leftBarOpen, setLeftBar] = useState(false);
  const [rightBarOpen, setRightBar] = useState(false);
  const [isFavorito, setFavorito] = useState(false);

  const prop_sections = [
    {
      title: "Titulo de seccion 1",
      content: "Lorem ipsum Ejemplo 1 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Esta es una oración con un dato cuantitativo: 100%. Ut enim ad minim veniam, Oración corta con dato cuantitativo: 1. quis Ejemplo 3 nostrud Ejemplo 1 exercitation ullamco laboris nisi ut aliquip ex ea commodo Ejemplo 3 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
      title: "Titulo de seccion 2",
      content: "Lorem ipsum dolor sit amet, Ejemplo 1 Esta es otra oración que contiene varios datos cuantitativo: 50%, 50.0. consectetur adipiscing Ejemplo 3 elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
      title: "Titulo de seccion 3",
      content: "Lorem ipsum dolor sit amet, Ejemplo 3 consectetur adipiscing elit, sed do eiusmod tempor incididunt Ejemplo 2 ut labore et dolore magna aliqua. Ut enim ad minim veniam, Oración corta con dato cuantitativo: 1. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Ejemplo 4 commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
  ]
  const [sections, setSections] = useState<Section[]>(prop_sections);

  const propWords = [
    {keyword: "Ejemplo 1", count: 10},
    {keyword: "Ejemplo 2", count: 10},
    {keyword: "Ejemplo 3", count: 10},
    {keyword: "Ejemplo 4", count: 10},
    {keyword: "Ejemplo 5", count: 10},
    {keyword: "Ejemplo 6", count: 10},
    {keyword: "Ejemplo 7", count: 10},
    {keyword: "Ejemplo 8", count: 10},
    {keyword: "Ejemplo 9", count: 10},
    {keyword: "Ejemplo 10", count: 10},
  ];
  const [keywords, setKeywords] = useState<KeywordProps[]>(propWords);

  const propData = [
    {data: "100%", sentence: "Esta es una oración con un dato cuantitativo: 100%."},
    {data: "50%", sentence: "Esta es otra oración que contiene varios datos cuantitativo: 50%, 50.0."},
    {data: "50.0", sentence: "Esta es otra oración que contiene varios datos cuantitativo: 50%, 50.0."},
    {data: "10%", sentence: "Esta es una oración contiene 10% un dato cuantitativo insertado arbitrariamente."},
    {data: "10%", sentence: "Esta es una oración contiene un dato cuantitativo 10% insertado arbitrariamente."},
    {data: "10%", sentence: "Esta es una oración 10% contiene un dato cuantitativo insertado arbitrariamente."},
    {data: "101", sentence: "101: Esta oración inicia con un dato cuantitativo."},
    {data: "22/2/2022", sentence: "Esta oración contiene un dato cuantitativo de tipo fecha: 22/2/2022."},
    {data: "10,502,365,820.51", sentence: "Esta es una oración muy, muy, pero muy larga que contiene un dato cuantitativo igualmente muy,. muy, pero muy largo: 10,502,365,820.51."},
    {data: "1", sentence: "Oración corta con dato cuantitativo: 1."},
  ];
  const [quantData, setQuantData] = useState<QuantDataProps[]>(propData);

  const [searchTarget, setTarget] = useState("");
  
  function handleTabChange(value: any){
    setTab(value)
  }

  useEffect(() => {
    (async () => {
      const document = await getDocument(params.docId)
      if (document){
        const favorite = Boolean(document.favorite)
        setFavorito(favorite)
      } else {
        console.log("error retrieving if its favorite or not")
      }
    })
  })

  const toggleFav = async () => {
    setFavorito(!isFavorito);
    console.log('ahora sera favorito -> ', isFavorito);
    const fav = !isFavorito
    console.log('valor a pasar -> ', fav);
    const favToString = fav.toString();
    console.log('valor a pasar enstring-> ', favToString);
    const response = await toggleFavorite(params.docId, favToString);
    if (response) {
      console.log(isFavorito);
    } else {
      console.log('error al marcar como favorito');
      setFavorito(!isFavorito);
    } 
  };

  return (
    <div className="flex items-top justify-center">
      <Header />
      <div className="flex items-center h-screen left-[-100vw] md:left-auto">
        <div className={cx("sideBarLeft", {"sideBarLeft-closed":!leftBarOpen})}>
          <div className={cx("sideBarLeftText", {"sideBarLeftText-closed":!leftBarOpen})}>
            <div className="text-center text-[4vh] font-semibold pb-[3vh] md:text-[0vw] md:pb-[0vh]">
              Análisis cualitativo
            </div>
            <LeftBarContent propWords={keywords} setTarget={setTarget} />
          </div>
        </div>
        <div className={cx("sideBarLeftSpace", {"sideBarLeftSpace-closed":!leftBarOpen})} />
        <button onClick={() => {setLeftBar(!leftBarOpen), setRightBar(false)}}
        className={cx("sideBarLeftButton hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarLeftButton-closed":!leftBarOpen})}>
          Análisis cualitativo
        </button>
        <button onClick={() => {setLeftBar(!leftBarOpen), setRightBar(false)}}
        className={cx("sideBarLeftButton2 hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarLeftButton2-closed":!leftBarOpen})}>
          +
        </button>
      </div>
      <div className="bg-[#30323D] pt-[15vh] mb-[15vh] bottom-0 font-semibold basis-[93vw] md:pt-[125px] md:mb-auto">
        <div className="flex items-center justify-center">
          <button className="fixed top-[1.5vh] left-[2vw] z-30 md:relative md:top-auto md:left-auto md:z-auto md:mr-[2vw]">
            <BotonHome />
          </button>
          <div className="w-[10vw] md:w-0"/>
          <Segmented options={["Resumen", "Texto Original", "Chatbot"]} onChange={(value) => handleTabChange(value)} />
          <div className="w-[10vw] md:w-0"/>
          <button className="fixed top-[1.5vh] right-[2vw] z-30 md:relative md:top-auto md:right-auto md:z-auto md:ml-[2vw]" onClick={toggleFav}>
            <BotonFavorito state={isFavorito} setFavorito={setFavorito} docId={params.docId}/>
          </button>
          <div/>
        </div>
        <Content currentTab={currentTab} sections={sections} analysisId={params.analysisId} docId={params.docId} searchTarget={searchTarget}/>
      </div>
      <div className="flex items-center h-screen">
        <button onClick={() => {setRightBar(!rightBarOpen), setLeftBar(false)}}
        className={cx("sideBarRightButton hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarRightButton-closed":!rightBarOpen})}>
          Análisis cuantitativo
        </button>
        <button onClick={() => {setRightBar(!rightBarOpen), setLeftBar(false)}}
        className={cx("sideBarRightButton2 hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarRightButton2-closed":!rightBarOpen})}>
          +
        </button>
        <div className={cx("sideBarRightSpace", {"sideBarRightSpace-closed":!rightBarOpen})} />
        <div className={cx("sideBarRight", {"sideBarRight-closed":!rightBarOpen})}>
          <div className={cx("sideBarRightText", {"sideBarRightText-closed":!rightBarOpen})}>
            <div className="text-center text-[4vh] font-semibold pb-[3vh] md:text-[0vw] md:pb-[0vh]">
              Análisis cuantitativo
            </div>
            <RightBarContent propData={quantData} setTarget={setTarget}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostrarAnalisis;