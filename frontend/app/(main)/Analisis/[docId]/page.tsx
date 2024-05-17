'use client';

import Link from 'next/link';
import './Analisis.css';
import { useRef, useState, useEffect } from 'react';
import Chat from './Chat/Chat';
import Segmented from 'rc-segmented';
import cx from "classnames";
import Collapsible from 'react-collapsible';
import Header from '../../header';
import { Section } from "@/model/section";
import { getDocument } from '@/services/document.service';
import { Document } from '../../../../model/document';
import { toggleFavorite } from '@/services/favorites.service';
import { PieChart } from 'react-minimal-pie-chart';
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

interface ContentProps{
  currentTab: string;
  sections: Section[];
  docId: string;
}

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  const encodedUrl = encodeURIComponent("https://storage.googleapis.com/arpa-softtek.appspot.com/users/hNb7IaKYx7bRUWEWB9cn575nATF2/Raymundo_Guzman_Mata_English_CV%20%281%29.pdf");
  const viewerURL = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
  const [docs, setDocs] = useState<Document>();
  useEffect(() => {
    (async () => {
      setDocs(await getDocument(props.docId));
    })();
    // Llama a fetchData directamente dentro del useEffect
  }, []);
  if(props.currentTab === "Resumen"){
    return(
      <div className="text-[#FCFAF5] text-[3vh] mx-[8vw] mt-[8vh] md:mx-[10vw]">
        {props.sections.map((section, index) => (
          <Collapsible trigger={SectionTitle(section.title)} triggerWhenOpen={SectionTitleOpen(section.title)} transitionTime={150} className="mb-[4vh]">
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
      <div className={data.style}/>
    </div>
  );
}

function KeywordButton(data: any){
  return(
    <div className="flex inline justify-center">
      <button className="flex inline justify-between items-center w-[80%] px-[2vw] py-[0.5vh] my-[1vh] rounded-[10px] hover:bg-[#3E4051]">
        <div className="font-semibold rounded-[10px] py-[1vh] px-[1.5vh] bg-[#5456F5]">{data.count}</div>
        <div className="font-semibold text-[2.5vh]">:{data.name}</div>  
      </button>
    </div>
  );
}

function LeftBarContent() {
  return(
    <div>
      <div className="text-center font-bold text-[3vh]">Frecuencia de palabras clave</div>
      <PieChart
        data={[
          {title: "Ejemplo 1", value: 10, color: "#5183e8"},
          {title: "Ejemplo 2", value: 20, color: "#7951e8"},
          {title: "Ejemplo 3", value: 5, color: "#44c7b3"}
        ]}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
        labelStyle={(index) => ({fill: "#FCFAF5", fontSize: "1vh", fontFamily: "sans-serif", fontWeight: "600"})}
        labelPosition={60}
        radius={35}
      />
      <div>
        <PieLabel name="Ejemplo 1" style="h-[3vh] w-[3vh] rounded-[3px] bg-[#7951e8] mr-[1vw] bg-[#5183e8]" />
        <PieLabel name="Ejemplo 2" style="h-[3vh] w-[3vh] rounded-[3px] bg-[#7951e8] mr-[1vw] bg-[#7951e8]" />
        <PieLabel name="Ejemplo 3" style="h-[3vh] w-[3vh] rounded-[3px] bg-[#7951e8] mr-[1vw] bg-[#44c7b3]" />
      </div>
      <br/> <br/>
      <div className="text-center font-bold text-[3vh]">Cantidad de palabras clave</div>
      <br/>
      <div>
        <KeywordButton name="Ácido cítrico" count="10"/>
        <KeywordButton name="Ejemplo 2" count="20"/>
        <KeywordButton name="Ejemplo 3" count="5"/>
      </div>
    </div>
  );
}

function QuantitativeSection(text: any) {
  return(
    <div className="flex justify-center">
      <button className="flex inline text-start items-center border-[2px] border-[#5456F5] w-[80%] px-[1vw] py-[1vh] my-[1vh]
      rounded-[10px] hover:bg-[#5456F5]">
        <div className="font-semibold text-[2.5vh]">{text.text}</div>  
      </button>
    </div>
  );
}

function RightBarContent() {
  return(
    <div>
      <div className="text-center font-bold text-[3vh] mb-[2vh]">Datos cuantitativos encontrados en el documento</div>
      <div>
        <QuantitativeSection text="Esta es una oración con un dato cuantitativo: 100%" />
        <QuantitativeSection text="Despite only making up 13% of the population, Black people commit 50% of all crimes in America" />
        <QuantitativeSection text="Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy" />
      </div>
    </div>
  );
}

function BotonFavorito(favorito: any, {
  params,
}:{ 
  params: { docId: string };
}){
  if(favorito.state == true){
    useEffect(() => {
      (async () => {
        await toggleFavorite(params.docId, favorito);
      })();
      // Llama a fetchData directamente dentro del useEffect
    }, []);
    
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
  params: { docId: string };
}) {
  const [currentTab, setTab] = useState("Resumen");
  const [leftBarOpen, setLeftBar] = useState(false);
  const [rightBarOpen, setRightBar] = useState(false);
  const [isFavorito, setFavorito] = useState(false);
  const prop_sections = [
    {
      title: "Titulo de seccion 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
      title: "Titulo de seccion 2",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
      title: "Titulo de seccion 3",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
  ]
  const [sections, setSections] = useState<Section[]>(prop_sections);
  
  function handleTabChange(value: any){
    setTab(value)
  }
  return (
    <div className="flex items-top justify-center">
      <Header />
      <div className="flex items-center h-screen left-[-100vw] md:left-auto">
        <div className={cx("sideBarLeft", {"sideBarLeft-closed":!leftBarOpen})}>
          <div className={cx("sideBarLeftText", {"sideBarLeftText-closed":!leftBarOpen})}>
            <div className="text-center text-[4vh] font-semibold pb-[3vh] md:text-[0vw] md:pb-[0vh]">
              Análisis cualitativo
            </div>
            <LeftBarContent />
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
          <button className="fixed top-[1.5vh] right-[2vw] z-30 md:relative md:top-auto md:right-auto md:z-auto md:ml-[2vw]" onClick={() => setFavorito(!isFavorito)}>
            <BotonFavorito state={isFavorito} setFavorito={setFavorito} docId={params.docId}/>
          </button>
          <div/>
        </div>
        <Content currentTab={currentTab} sections={sections} docId={params.docId}/>
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
            <RightBarContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostrarAnalisis;