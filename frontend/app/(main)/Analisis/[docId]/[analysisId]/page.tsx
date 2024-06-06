'use client';

import Link from 'next/link';
import './Analisis.css';

import { useState, useEffect } from 'react';
import Chat from './Chat/Chat';
import Segmented from 'rc-segmented';
import cx from "classnames";
import Collapsible from 'react-collapsible';
import Header from '../../../header';
import { Analysis, Section, Keyword, QuantitativeDatum } from '@/model/analysis';
import { getDocument } from '@/services/document.service';
import { Document } from '../../../../../model/document';
import { toggleFavorite } from '@/services/favorites.service';
import { getAnalysis } from '@/services/analysis.service';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import { PieChart } from 'react-minimal-pie-chart';
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
      <div className="pl-[2vw] mb-[4vh] md:pl-[4vw]">
        {section.content}
      </div>
    </Collapsible>
  );
}


interface ContentProps{
  currentTab: string;
  sections: Section[] | undefined;
  analysisId: string;
  docId: string;
  docUrl: string | undefined;
  searchTarget: string;
  loading: Boolean;
}

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  if(props.currentTab === "Resumen"){
    return(
     <div className="text-[#FCFAF5] text-[3vh] mx-[8vw] mt-[8vh] md:mx-[10vw]">
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
        )}
      </div>
    );
  }
  else if(props.currentTab === "Texto Original"){
    return(
      <div className="text h-screen">
         <iframe
         src={`https://docs.google.com/viewer?url=${props.docUrl}&embedded=true`}
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
    <div className="flex justify-center w-full">
      <div className="flex justify-between w-[90%] items-center py-[1vh] pl-[2vw]">
        <div className="h-[3vh] w-[3vh] rounded-[3px] bg-[#7951e8] mr-[1vw]" style={{backgroundColor: data.color}}/>
        <div>{data.name}</div>
      </div> 
    </div>
  );
}

function KeywordButton(data: any){
  return(
    <div className="flex justify-center w-full">
      <button className="flex justify-between items-center w-full px-[2vw] py-[0.5vh] my-[1vh] rounded-[10px] hover:bg-[#3E4051]" onClick={() => data.setTarget(data.name)}>
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
            />
            <div>
              {keywords.map((content: any, index: number) => (
                <PieLabel name={content.keyword} color={pieColors[index]}/>
              ))}
            </div>
            <br/> <br/>
            <div className="text-center font-bold text-[3vh]">Cantidad de palabras clave</div>
            <br/>
            <div>
              {keywords.map((content: any, index: number) => (
                <KeywordButton name={content.keyword} count={content.count} setTarget={props.setTarget} />
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
        <div></div>
      ) : (
        <div>
          <div className="text-center font-bold text-[3vh] mb-[2vh]">Datos cuantitativos encontrados en el documento</div>
          {props.propData?.map((content: any, index: number) =>
            <QuantitativeSection data={content.datum} sentence={content.sentence} setTarget={props.setTarget} />
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
  const router = useRouter()
  return(
    <button onClick={()=> {
      router.push('/CargarArchivos');
      localStorage.setItem("button", 'CargarArchivos')
    }}
    className="fixed top-[1.5vh] left-[2vw] z-30 md:relative md:top-auto md:left-auto md:z-auto md:mr-[2vw]"
    >
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-2 hover:stroke-[#BCBAB5] active:fill-[#BCBAB5] md:stroke-[#5756F5] md:hover:stroke-[#2F31AB] md:active:fill-[#2F31AB]"
    width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
  const [leftBarOpen, setLeftBar] = useState(false);
  const [rightBarOpen, setRightBar] = useState(false);
  const [isFavorito, setFavorito] = useState(false);
  const [documentInfo, setDocumentInfo] = useState<Document>();
  const [analysis, setAnalysis] = useState<Analysis>();  
  const [searchTarget, setTarget] = useState("");
  const [loading, setloading] = useState(true);
  const [togglingToFav, setLoadingFav] = useState(false);


  useEffect(() => {
    (async () => {
      setDocumentInfo(await getDocument(params.docId));
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

  return (
    <div className="flex items-top justify-center">
      <Header />
      <div className="flex items-center h-screen left-[-100vw] md:left-auto">
        <div className={cx("sideBarLeft", {"sideBarLeft-closed":!leftBarOpen})}>
          <div className={cx("sideBarLeftText", {"sideBarLeftText-closed":!leftBarOpen})}>
            <div className="text-center text-[4vh] font-semibold pb-[3vh] md:text-[0vw] md:pb-[0vh]">
              Análisis cualitativo
            </div>
            {/* <LeftBarContent keywords={analysis?.Keywords} /> */}
            <LeftBarContent propWords={analysis?.Keywords} setTarget={setTarget} loading={loading}/>
          </div>
        </div>
        <div className={cx("sideBarLeftSpace", {"sideBarLeftSpace-closed":!leftBarOpen})} />
        <button onClick={() => {setLeftBar(!leftBarOpen), setRightBar(false)}}
        className={cx("sideBarLeftButton hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarLeftButton-closed":!leftBarOpen})}>
          Palabras clave
        </button>
        <button onClick={() => {setLeftBar(!leftBarOpen), setRightBar(false)}}
        className={cx("sideBarLeftButton2 hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarLeftButton2-closed":!leftBarOpen})}>
          +
        </button>
      </div>
      <div className="bg-[#30323D] pt-[25vh] mb-[15vh] bottom-0 font-semibold basis-[93vw] md:pt-[125px] md:mb-auto">
        <div className="flex items-center justify-center">
          <BotonHome />
          <div className="w-[10vw] md:w-0"/>
          <Segmented options={["Resumen", "Texto Original", "Chatbot"]} onChange={(value) => handleTabChange(value)} />
          <div className="w-[10vw] md:w-0"/>
          <button className="fixed top-[1.5vh] right-[2vw] z-30 md:relative md:top-auto md:right-auto md:z-auto md:ml-[2vw]" onClick={toggleFav}>
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
          <div/>
        </div>
        {/* <Content currentTab={currentTab} sections={analysis?.Sections} analysisId={params.analysisId} docId={documentInfo?.id} docUrl={documentInfo?.publicURL} /> */}
        <Content currentTab={currentTab} sections={analysis?.Sections} analysisId={params.analysisId} docId={params.docId} docUrl={documentInfo?.publicURL} searchTarget={searchTarget} loading={loading}/>
      </div>
      <div className="flex items-center h-screen">
        <button onClick={() => {setRightBar(!rightBarOpen), setLeftBar(false)}}
        className={cx("sideBarRightButton hover:bg-[#F5C556] hover:text-[#24252E]", {"sideBarRightButton-closed":!rightBarOpen})}>
          Datos cuantitativos
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
            <RightBarContent propData={analysis?.QuantitativeData} setTarget={setTarget} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostrarAnalisis;