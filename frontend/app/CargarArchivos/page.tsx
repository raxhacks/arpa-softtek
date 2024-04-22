'use client';

import { deleteCookie } from "cookies-next";

import Link from 'next/link';
import './CargarArchivos.css';
import { useState } from 'react';
import axios from 'axios';
import { Fade } from "react-awesome-reveal";
import { createDocument } from '@/services/document.service';
import { useRouter } from 'next/navigation';
import exp from "constants";

function ActiveSectionButton(name: any) {
  let svg = null;

  if (name.text === "feed") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-news" width="70" height="70" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5C556" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
        <path d="M8 8l4 0" />
        <path d="M8 12l4 0" />
        <path d="M8 16l4 0" />
      </svg>
    );
  }
  else if (name.text === "book") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-bookmarks" width="70" height="70" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5C556" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M15 10v11l-5 -3l-5 3v-11a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3z" />
        <path d="M11 3h5a3 3 0 0 1 3 3v11" />
      </svg>
    );
  }
  else if (name.text === "history") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-history" width="70" height="70" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F5C556" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 8l0 4l2 2" />
        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
      </svg>
    );
  }

  return (
    <button className="sections">
      {svg}
    </button>
  );
}
  
function InactiveSectionButton(name: any) {
  let svg = null;

  if (name.text === "feed") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-news" width="70" height="70" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
        <path d="M8 8l4 0" />
        <path d="M8 12l4 0" />
        <path d="M8 16l4 0" />
      </svg>
    );
  }
  else if (name.text === "book") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-bookmarks" width="70" height="70" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M15 10v11l-5 -3l-5 3v-11a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3z" />
        <path d="M11 3h5a3 3 0 0 1 3 3v11" />
      </svg>
    );
  }
  else if (name.text === "history") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-history" width="70" height="70" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 8l0 4l2 2" />
        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
      </svg>
    );
  }

  return (
    <button className="sections">
      {svg}
    </button>
  );
}

function ARPAHeader() {
  return (
    <div className="ARPA_header">
      <h2 className="headerText">ARPA</h2>
    </div>
  );
}

function SectionsHeader() {
  return (
    <div className="sections_header">
      <div className="sectionGroup">
        <ActiveSectionButton text="feed"/>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <InactiveSectionButton text="book"/>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <InactiveSectionButton text="history"/>
      </div>
    </div>
  );
}
  
function Arrow(back: any) {
  return(
    <button className="arrow" onClick={() => {back.selected && back.goBack()}}>
      <i className="material-icons" style={{fontSize: "400%"}}>keyboard_backspace</i>
    </button>
  );
}
  
function CenterHeader(title: any) {
  return(
    <h1 className="centerHeader">{title.text}</h1>
  );
}

function FormatButton(main: any) {
  let svg = null;

  if (main.type === "PDF") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-file-type-pdf" width="200" height="200" viewBox="0 0 24 24" strokeWidth="1" stroke="#5756F5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
        <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
        <path d="M17 18h2" />
        <path d="M20 15h-3v6" />
        <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
      </svg>
    );
  }
  else if (main.type === "URL") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-forms" width="200" height="200" viewBox="0 0 24 24" stroke-width="1" stroke="#5756F5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
        <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
        <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
        <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
        <path d="M17 12h.01" />
        <path d="M13 12h.01" />
      </svg>
    );
  }
  else if (main.type === "DOCX") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-file-type-doc" width="200" height="200" viewBox="0 0 24 24" stroke-width="1" stroke="#5756F5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
        <path d="M5 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
        <path d="M20 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
        <path d="M12.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5z" />
      </svg>
    );
  }

  return (
    <button className="format" onClick={() => {main.setType(main.title, main.type)}}>
      {svg}
    </button>
  );
}

function Main(currentState: any) {
  const [url, setURL] = useState("");
  const router = useRouter();

  const handleUrlChange = (event: any) => {
    setURL(event.target.value)
  }

  const getPdfBlob = async (e:any, url: any, setFState: any) => {
    try {
      e.preventDefault();
      const body = {url: url};
      const response = await axios.post('http://localhost:3000/api/pdf_retrieve', body);
      localStorage.setItem("text", response.data.text);
      setFState("Correct")
      router.push('/Analisis');
    } catch (error) {
      console.error(error);
      setFState("ErrorUploading")
    }
  }

  if(currentState.type === "None"){
    return(
      <div className="formatsContainer">
        <Fade cascade direction="up" damping={0.1} triggerOnce fraction={1}>
          <FormatButton icon="picture_as_pdf" type="PDF" title="Sube el artículo en formato PDF" setType={currentState.setType} />
          <FormatButton icon="http" type="URL" title="Ingresa la URL del artículo" setType={currentState.setType}/>
          <FormatButton icon="article" type="DOCX" title="Sube el artículo en formato DOCX" setType={currentState.setType}/>
        </Fade> 
      </div>
    );
  }
  else if(currentState.type === "URL"){
    return(
      <div style={{textAlign: "center"}}>
        <input type="text" className="urlField" 
        value={url}
        onChange={handleUrlChange}
        />
        <button className="url"
        onClick={(e)=>getPdfBlob(e,url,currentState.setfileState)}>
          <i className="material-icons" style={{fontSize: "50px"}}>search</i>
        </button>
        <FileStateMessage state={currentState.fileState} file={currentState.file} type={currentState.type}/>
      </div>
    );
  }
  else if(currentState.type === "PDF"){
    console.log(currentState.file)
    return(
      <form>
        <label htmlFor="PDFUpload" className="upload" style={{textAlign: "center"}}>
          {currentState.file === undefined ?
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-file-type-pdf" width="200" height="200" viewBox="0 0 24 24" strokeWidth="1" stroke="#5756F5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
            <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
            <path d="M17 18h2" />
            <path d="M20 15h-3v6" />
            <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
          </svg> : <p>{currentState.file.name}</p>}
        </label>
        <input type="file" id="PDFUpload" name="filename" accept=".pdf" style={{opacity: "0", position: "absolute", zIndex: "-1"}} onChange={currentState.handleChangePDF} />
        <FileStateMessage state={currentState.fileState} file={currentState.file} type={currentState.type}/>
      </form>
    );
  }
  else if(currentState.type === "DOCX"){
    return(
      <form>
        <label htmlFor="DOCXUpload" className="upload" style={{textAlign: "center"}}>
          {currentState.file === undefined ?
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-file-type-doc" width="200" height="200" viewBox="0 0 24 24" stroke-width="1" stroke="#5756F5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
            <path d="M5 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
            <path d="M20 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
            <path d="M12.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5z" />
          </svg> : <p>{currentState.file.name}</p>}
        </label>
        <input type="file" id="DOCXUpload" name="filename" accept=".docx" style={{opacity: "0", position: "absolute", zIndex: "-1"}} onChange={currentState.handleChangeDOCX} />
        <FileStateMessage state={currentState.fileState} file={currentState.file} type={currentState.type}/>
      </form>
    );
  }
}

function FileStateMessage(fileState: any) {
  const router = useRouter();
  const handleSubmitDocument = async (e:any) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", fileState.file);
      formData.append("extension", fileState.type); 
      const res = await createDocument(formData);
      const text = res.text;
      localStorage.setItem("text", text);
      router.push('/Analisis');
    } catch (error) {
      console.error(error);
    }
  }
  if(fileState.state === "None"){
    return(<></>);
  }
  else if(fileState.state === "WrongFormat"){
    return(<p className="errorMessage">Error: El formato del archivo es incorrecto</p>);
  }
  else if(fileState.state === "ErrorUploading"){
    return(<p className="errorMessage">Error: No se ha podido cargar el archivo</p>);
  }
  else if(fileState.state === "Correct"){
    return(
      <div style={{display: "flex", justifyContent: "center"}}>
        <button onClick={handleSubmitDocument}>
          <label htmlFor="siguiente" className="siguiente">Siguiente</label>
          <input type="submit" id="siguiente" style={{opacity: "0", position: "absolute", zIndex: "-1"}} />
        </button>
      </div>
    );
  }
}

function CargaArchivos() {
  const [centerText, setTitle] = useState("Selecciona el formato del artículo");
  const [currentFormat, setFormat] = useState("None");
  const [formatSelected, setSelected] = useState(false);
  const [file, setFile] = useState();
  const [fileState, setFState] = useState("None");

  const setType = (text: any, type: any) => {
    setTitle(text)
    setFormat(type)
    setSelected(true)
  }

  function handleChangePDF(event: any) {
    const file = event.target.files[0]
    if(file.type == "application/pdf"){
      setFile(file)
      setFState("Correct")
    }
    else{
      setFile(undefined)
      setFState("WrongFormat")
    }
  }

  function handleChangeDOCX(event: any) {
    const file = event.target.files[0]
    if(file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      setFile(file)
      setFState("Correct")
    }
    else{
      setFile(undefined)
      setFState("WrongFormat")
      console.log(file.type)
    }
  }

  const goBack = () => {
    setTitle("Selecciona el formato del artículo")
    setFormat("None")
    setSelected(false)
    setFile(undefined)
    setFState("None")
  }

  return (
    <>
      <div className="main">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <ARPAHeader />
        <SectionsHeader />
        <Arrow selected={formatSelected} goBack={goBack} />
        <CenterHeader text={centerText} />
        <Main type={currentFormat} setType={setType} file={file} fileState={fileState} handleChangePDF={handleChangePDF} handleChangeDOCX={handleChangeDOCX} setfileState={setFState} />
      </div>
    </>
  );
}

export default CargaArchivos;