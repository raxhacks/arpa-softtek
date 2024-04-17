'use client';
import { deleteCookie } from "cookies-next";
import Link from 'next/link';
import './CargarArchivos.css';
import { useState } from 'react';
import axios from 'axios';
import { Fade } from "react-awesome-reveal";

import { createDocument } from '@/services/document.service';
import { useRouter } from 'next/navigation';

function ActiveSectionButton(name: any) {
  return (
    <button className="sections">
      <i className="material-icons" style={{fontSize: "250%", verticalAlign: "middle", color: "rgb(217, 189, 122)"}}>{name.text}</i>
    </button>
  );
}
  
function InactiveSectionButton(name: any) {
  return (
    <button className="sections">
      <i className="material-icons" style={{fontSize: "250%", verticalAlign: "middle"}}>{name.text}</i>
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
  const router = useRouter();
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
  return(
    <button className="format" onClick={() => {main.setType(main.title, main.type)}}>
      <i className="material-icons" style={{fontSize: "150px"}}>{main.icon}</i>
    </button>
  );
}
/*
<FormatButton icon="picture_as_pdf" type="PDF" title="Sube el artículo en formato PDF" setType={currentState.setType} />
        <FormatButton icon="http" type="URL" title="Ingresa la URL del artículo" setType={currentState.setType}/>
        <FormatButton icon="article" type="DOCX" title="Sube el artículo en formato DOCX" setType={currentState.setType}/>
*/
function Main(currentState: any) {
  const [url, setURL] = useState("");
  
  const handleUrlChange = (event: any) => {
    setURL(event.target.value)
  }

  const getPdfBlob = async (e:any, url: any) => {
    try {
      e.preventDefault();
      const body = {url: url};
      const response = await axios.post('http://localhost:3000/api/pdf_retrieve', body);
      console.log(response);
    } catch (error) {
      console.error(error);
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
      <form style={{textAlign: "center"}}>
        <input type="text" className="urlField" 
        value={url}
        onChange={handleUrlChange}
        />
        <button className="url"
        onClick={(e)=>getPdfBlob(e,url)}>
          <i className="material-icons" style={{fontSize: "50px"}}>search</i>
        </button>
        <label htmlFor="siguiente" className="siguiente">Siguiente</label>
        <input type="submit" id="siguiente" style={{opacity: "0", position: "absolute", zIndex: "-1"}} />
      </form>
    );
  }
  else if(currentState.type === "PDF"){
    console.log(currentState.file)
    return(
      <form>
        <label htmlFor="PDFUpload" className="upload">
          {currentState.file === undefined ? <i className="material-icons" style={{fontSize: "900%", textAlign: "center"}}>picture_as_pdf</i> : <p>{currentState.file.name}</p>}
        </label>
        <input type="file" id="PDFUpload" name="filename" accept=".pdf" style={{opacity: "0", position: "absolute", zIndex: "-1"}} onChange={currentState.handleChangePDF} />
        <FileStateMessage state={currentState.fileState} file={currentState.file} type={currentState.type}/>
      </form>
    );
  }
  else if(currentState.type === "DOCX"){
    return(
      <form>
        <label htmlFor="DOCXUpload" className="upload">
          {currentState.file === undefined ? <i className="material-icons" style={{fontSize: "900%", textAlign: "center"}}>article</i> : <p>{currentState.file.name}</p>}
        </label>
        <input type="file" id="DOCXUpload" name="filename" accept=".docx" style={{opacity: "0", position: "absolute", zIndex: "-1"}} onChange={currentState.handleChangeDOCX} />
        <FileStateMessage state={currentState.fileState} file={currentState.file}/>
      </form>
    );
  }
}

function FileStateMessage(fileState: any) {
  const router = useRouter();
  const handleSubmitDocument = async (e:any) => {
    try {
      e.preventDefault();
      console.log(fileState)
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

export default function CargaArchivos({
  children,
}: {
  children: React.ReactNode
}) {
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
        <Main type={currentFormat} setType={setType} file={file} fileState={fileState} handleChangePDF={handleChangePDF} handleChangeDOCX={handleChangeDOCX} />
      </div>
    </>
  );
}




