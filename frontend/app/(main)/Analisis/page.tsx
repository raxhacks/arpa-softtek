'use client';

import Link from 'next/link';
import './Analisis.css';
import { useRef, useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Chat from './components/Chat/Chat';
import Segmented from 'rc-segmented';
import cx from "classnames";
import { handleClientScriptLoad } from 'next/script';
import Collapsible from 'react-collapsible';
import Header from '../header';

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

function Content(center: any) {
  const encodedUrl = encodeURIComponent("https://storage.googleapis.com/arpa-softtek.appspot.com/users/hNb7IaKYx7bRUWEWB9cn575nATF2/Raymundo_Guzman_Mata_English_CV%20%281%29.pdf");
  const viewerURL = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
  if(center.currentTab === "Resumen"){
    return(
      <div className="text">
        <Collapsible trigger={SectionTitle("Sección 1")} triggerWhenOpen={SectionTitleOpen("Sección 1")} transitionTime={150} className="my-7">
          <div className="pl-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </div>
        </Collapsible>
        <Collapsible trigger={SectionTitle("Sección 2")} triggerWhenOpen={SectionTitleOpen("Sección 2")} transitionTime={150} className="my-7">
          <div className="pl-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </div>
        </Collapsible>
        <Collapsible trigger={SectionTitle("Sección 3")} triggerWhenOpen={SectionTitleOpen("Sección 3")} transitionTime={150} className="my-7">
          <div className="pl-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </div>
        </Collapsible>
      </div>
    );
  }
  else if(center.currentTab === "Texto Original"){
    return(
      <div className="text h-screen">
        <iframe
            src={viewerURL}
            width="100%"
            height="100%"
            />
      </div>
    );
  }
  else if(center.currentTab === "Chatbot"){
    return(
      <div className="text">
        <Chat />
      </div>
    );
  }
}

function LeftBarContent() {
  return(
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      <br/> <br/>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      <br/> <br/>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    </>
  );
}

function RightBarContent() {
  return(
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      <br/> <br/>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      <br/> <br/>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    </>
  );
}

function MostrarAnalisis() {
  const [currentTab, setTab] = useState("Resumen");
  const [leftBarOpen, setLeftBar] = useState(false);
  const [rightBarOpen, setRightBar] = useState(false);
  
  function handleTabChange(value: any){
    setTab(value)
  }
  return (
    <div className="flex items-center justify-center overflow-y-scroll overflow-x-hiddden">
      < Header />
      <div className="flex items-center">
        <div className={cx("sideBarLeft", {"sideBarLeft-closed":!leftBarOpen})}>
          <p className={cx("leftText", {"leftText-closed":!leftBarOpen})}>
            <LeftBarContent />
          </p>
        </div>
        <div className={cx("sideBarLeftSpace", {"sideBarLeftSpace-closed":!leftBarOpen})} />
        <button onClick={() => {setLeftBar(!leftBarOpen), setRightBar(false)}} className={cx("sideBarLeft_button", {"sideBarLeft_button-closed":!leftBarOpen})}>
          Analisis cualitativo
        </button>
      </div>
      <div className="main">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <div className="flex items-center justify-center">
          <Segmented options={["Resumen", "Texto Original", "Chatbot"]} onChange={(value) => handleTabChange(value)} />
        </div>
        <Content currentTab={currentTab}/>
      </div>
      <div className="flex items-center h-screen overflow-x-hidden">
        <button onClick={() => {setRightBar(!rightBarOpen), setLeftBar(false)}} className={cx("sideBarRight_button", {"sideBarRight_button-closed":!rightBarOpen})}>
          Analisis cuantitativo
        </button>
        <div className={cx("sideBarRightSpace", {"sideBarRightSpace-closed":!rightBarOpen})} />
        <div className={cx("sideBarRight", {"sideBarRight-closed":!rightBarOpen})}>
          <p className={cx("rightText", {"rightText-closed":!rightBarOpen})}>
            <RightBarContent />
          </p>
        </div>
      </div>
    </div>
  );
}

export default MostrarAnalisis;