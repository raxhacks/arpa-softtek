'use client';

import Link from 'next/link';
import './CargarArchivos.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Fade } from "react-awesome-reveal";
import { createDocument } from '@/services/document.service';
import { useRouter } from 'next/navigation';
import Header from '../header';
import { useDropzone } from 'react-dropzone';
  
function Arrow(back: any) {
  if(back.selected){
    return(
      <button className="border-0 bg-transparent align-middle ml-[2vw] fixed top-[1.5vh] z-30 md:top-[20vh] md:z-auto" onClick={() => {back.goBack()}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left hover:stroke-[#BCBAB5] active:stroke-[#565553]" width="56" height="56" viewBox="0 0 24 24" stroke-width="3" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      </button>
    );
  }
  else{
    return(<></>);
  }
}
  
function CenterHeader(title: any) {
  return(
    <h1 className="text-[#FCFAF5] text-center mb-[3vh] mx-[8vw] text-[5vh] md:text-[6vh]">{title.text}</h1>
  );
}

function FormatButton(main: any) {
  let svg = null;

  if (main.type === "PDF") {
    svg = (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-file-type-pdf hover:stroke-[#2F31AB]" width="150" height="150" viewBox="0 0 24 24" strokeWidth="1" stroke="#5756F5" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-forms hover:stroke-[#2F31AB]" width="150" height="150" viewBox="0 0 24 24" stroke-width="1" stroke="#5756F5" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-file-type-doc hover:stroke-[#2F31AB]" width="150" height="150" viewBox="0 0 24 24" stroke-width="1" stroke="#5756F5" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
    <button className="bg-transparent mt-[5vh] mx-auto block relative md:mt-[10vh] md:mx-[5vw] md:inline" onClick={() => {main.setType(main.title, main.type)}}>
      {svg}
    </button>
  );
}

function Main(currentState: any) {
  const [url, setURL] = useState("");
  const router = useRouter();
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({noClick: true});

  useEffect(() => {
    if(currentState.type === "PDF" && acceptedFiles[0] != null){
      currentState.handleChangePDF(acceptedFiles[0])
    }
    else if(currentState.type === "DOCX" && acceptedFiles[0] != null){
      currentState.handleChangeDOCX(acceptedFiles[0])
    }
  },[acceptedFiles])

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
      router.push(`/Analisis`);
    } catch (error) {
      console.error(error);
      setFState("ErrorUploading")
    }
  }

  if(currentState.type === "None"){
    acceptedFiles.splice(0, 1)
    return(
      <div className="text-center md:flex md:justify-center">
        <Fade cascade direction="up" damping={0.1} triggerOnce fraction={1}>
          <FormatButton type="PDF" title="Sube el artículo en formato PDF" setType={currentState.setType} />
          <FormatButton type="URL" title="Ingresa la URL del artículo" setType={currentState.setType}/>
          <FormatButton type="DOCX" title="Sube el artículo en formato DOCX" setType={currentState.setType}/>
        </Fade>
      </div>
    );
  }
  else if(currentState.type === "URL"){
    return(
      <>
        <div className="flex justify-center items-center mt-[12vh] mb-[10vh] flex-col md:flex-row">
          <input type="text" className="h-[10vh] max-h-[60px] w-[90vw] text-[5vh] mb-[6vh] md:max-h-[50px] md:w-[70vw] md:max-w-[700px]
          md:text-[4vh] md:ml-[5vw] md:mb-[0vh]" value={url} onChange={handleUrlChange} />
          <button className="bg-[#5456F5] text-[#30323D] w-[40vw] rounded-[2vh] mx-[3vw] relative md:w-[4.5vw] md:h-[4.5vw] md:ml-[1vw]
          md:mr-[5vw] md:inline hover:bg-[#4345AF] active:bg-[#FCFAF5]" onClick={(e)=>getPdfBlob(e,url,currentState.setfileState)}>
            <i className="material-icons" style={{fontSize: "50px"}}>search</i>
          </button>
        </div>
        <FileStateMessage state={currentState.fileState} file={currentState.file} type={currentState.type}/>
      </>
    );
  }
  else if(currentState.type === "PDF"){
    console.log(currentState.file)
    return(
      <div {...getRootProps({className: 'dropzone'})}>
        <label htmlFor="PDFUpload" className="bg-transparent text-[#5756F5] mx-auto w-[70vw] max-w-[300px] h-[70vh] max-h-[300px] flex items-center justify-center text-center">
          {acceptedFiles.length === 0 ?
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-file-type-pdf border-dotted
          border-[#5756F5] border-[7px] rounded-[20px] w-[70vw] max-w-[300px] h-[70vh] max-h-[300px] hover:border-[#2F31AB]
          hover:stroke-[#2F31AB]" viewBox="-6 -6 36 36" strokeWidth="1" stroke="#5756F5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
            <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
            <path d="M17 18h2" />
            <path d="M20 15h-3v6" />
            <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
          </svg> :
          <div className="border-dotted border-[#5756F5] border-[7px] rounded-[20px] text-[#5756F5] w-[70vw] max-w-[300px] h-[70vh]
          max-h-[300px] hover:border-[#2F31AB] hover:text-[#2F31AB] flex items-center justify-center text-center break-words">
            {acceptedFiles[0].name}
          </div>}
        </label>
        <input {...getInputProps()} id="PDFUpload" accept=".pdf" style={{opacity: "0", position: "absolute", zIndex: "-1"}} />
        <FileStateMessage state={currentState.fileState} file={currentState.file} type={currentState.type}/>
      </div>
    );
  }
  else if(currentState.type === "DOCX"){
    return(
      <div {...getRootProps({className: 'dropzone'})}>
        <label htmlFor="DOCXUpload" className="bg-transparent text-[#5756F5] mx-auto w-[70vw] max-w-[300px] h-[70vh] max-h-[300px] flex items-center justify-center text-center">
          {acceptedFiles.length === 0 ?
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-format icon-tabler icon-tabler-file-type-doc border-dotted
          border-[#5756F5] border-[7px] rounded-[20px] w-[70vw] max-w-[300px] h-[70vh] max-h-[300px] hover:border-[#2F31AB]
          hover:stroke-[#2F31AB]" viewBox="-6 -6 36 36" stroke-width="1" stroke="#5756F5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
            <path d="M5 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
            <path d="M20 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
            <path d="M12.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5z" />
          </svg> :
          <div className="border-dotted border-[#5756F5] border-[7px] rounded-[20px] text-[#5756F5] w-[70vw] max-w-[300px] h-[70vh]
          max-h-[300px] hover:border-[#2F31AB] hover:text-[#2F31AB] flex items-center justify-center text-center break-words">
            {acceptedFiles[0].name}
          </div>}
        </label>
        <input {...getInputProps()} id="DOCXUpload" accept=".docx" style={{opacity: "0", position: "absolute", zIndex: "-1"}} />
        <FileStateMessage state={currentState.fileState} file={currentState.file} type={currentState.type}/>
      </div>
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
      const docId = res.document_id;
      const analysisId = res.analysis_id;
      console.log(analysisId);
      // const text = res.text;
      // localStorage.setItem("text", text);
      router.push(`/Analisis/${docId}/${analysisId}`);
    } catch (error) {
      console.error(error);
    }
  }
  if(fileState.state === "None"){
    return(<></>);
  }
  else if(fileState.state === "WrongFormat"){
    return(<p className="text-[#F5C556] flex justify-center text-center mx-[5vw] mt-[5vh] text-[3vh] md:mx-[25vw]">Error: El formato del archivo es incorrecto</p>);
  }
  else if(fileState.state === "ErrorUploading"){
    return(<p className="text-[#F5C556] flex justify-center text-center mx-[5vw] mt-[5vh] text-[3vh] md:mx-[25vw]">Error: No se ha podido cargar el archivo</p>);
  }
  else if(fileState.state === "Correct"){
    return(
      <div className="flex justify-center">
        <button onClick={handleSubmitDocument}>
          <label htmlFor="siguiente" className="bg-transparent text-[#FCFAF5] border-solid border-[#FCFAF5] border-[0.5vh] rounded-[2vh]
          mx-auto mt-[5vh] md:mt-[5vh] mb-[1vh] w-[70vw] max-w-[325px] h-[12vh] max-h-[80px] flex items-center justify-center text-[4vh]
          hover:bg-[#282933] active:bg-[#FCFAF5] active:border-[#30323D] active:text-[#30323D]">Siguiente</label>
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
  const [file, setFile] = useState<File | null>(null);;
  const [fileState, setFState] = useState("None");

  const setType = (text: any, type: any) => {
    setTitle(text)
    setFormat(type)
    setSelected(true)
  }

  function handleChangePDF(file: File) {
    if(file.type == "application/pdf"){
      setFile(file)
      setFState("Correct")
    }
    else{
      setFile(null)
      setFState("WrongFormat")
    }
  }

  function handleChangeDOCX(file: File) {
    if(file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      setFile(file)
      setFState("Correct")
    }
    else{
      setFile(null)
      setFState("WrongFormat")
      console.log(file.type)
    }
  }

  const goBack = () => {
    setTitle("Selecciona el formato del artículo")
    setFormat("None")
    setSelected(false)
    setFile(null)
    setFState("None")
  }

  return (
    <>
      <div className="bg-[#30323D] pt-[15vh] pb-[20vh] font-semibold md:pt-[20vh] md:pb-[0vh]">
        <Header/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <Arrow selected={formatSelected} goBack={goBack} />
        <CenterHeader text={centerText} />
        <Main type={currentFormat} setType={setType} file={file} fileState={fileState} handleChangePDF={handleChangePDF} handleChangeDOCX={handleChangeDOCX} setfileState={setFState} />
      </div>
    </>
  );
}

export default CargaArchivos;