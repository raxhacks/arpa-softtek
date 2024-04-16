'use client';

import './CargarArchivos.css';
import { useState } from 'react';

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
        &nbsp; &nbsp; &nbsp;
        <InactiveSectionButton text="book"/>
        &nbsp; &nbsp; &nbsp;
        <InactiveSectionButton text="history"/>
      </div>
    </div>
  );
}
  
/*function Header() {
    return (
      <div className="header">
        <h2 className="headerText">ARPA</h2>
        <div className="sectionGroup">
            <ActiveSectionButton text="feed"/>
            &nbsp; &nbsp; &nbsp;
            <InactiveSectionButton text="book"/>
            &nbsp; &nbsp; &nbsp;
            <InactiveSectionButton text="history"/>
        </div>
      </div>
    );
}*/
  
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
  return(
    <button className="format" onClick={() => {main.setType(main.title, main.type)}}>
      <i className="material-icons" style={{fontSize: "150px"}}>{main.icon}</i>
    </button>
  );
}

function Main(currentState: any) {
  if(currentState.type === "None"){
    return(
      <div style={{textAlign: "center"}}>
        <FormatButton icon="picture_as_pdf" type="PDF" title="Sube el artículo en formato PDF" setType={currentState.setType} />
        <FormatButton icon="http" type="URL" title="Ingresa la URL del artículo" setType={currentState.setType}/>
        <FormatButton icon="article" type="DOCX" title="Sube el artículo en formato DOCX" setType={currentState.setType}/>
      </div>
    );
  }
  else if(currentState.type === "URL"){
    return(
      <form style={{textAlign: "center"}}>
        <input type="text" className="urlField" />
        <button className="url">
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
        <input type="file" id="PDFUpload" name="filename" accept=".pdf" style={{opacity: "0", position: "absolute", zIndex: "-1"}} onChange={currentState.handleChage} />
        <label htmlFor="siguiente" className="siguiente">Siguiente</label>
        <input type="submit" id="siguiente" style={{opacity: "0", position: "absolute", zIndex: "-1"}} />
      </form>
    );
  }
  else if(currentState.type === "DOCX"){
    return(
      <form>
        <label htmlFor="DOCXUpload" className="upload">
          {currentState.file === undefined ? <i className="material-icons" style={{fontSize: "900%", textAlign: "center"}}>article</i> : <p>{currentState.file.name}</p>}
        </label>
        <input type="file" id="DOCXUpload" name="filename" accept=".docx" style={{opacity: "0", position: "absolute", zIndex: "-1"}} onChange={currentState.handleChage} />
        <label htmlFor="siguiente" className="siguiente">Siguiente</label>
        <input type="submit" id="siguiente" style={{opacity: "0", position: "absolute", zIndex: "-1"}} />
      </form>
    );
  }
}
  
/*function UploadButton(type: any) {
    return(
      <button className="upload">
        <i className="material-icons" style={{fontSize: "900%"}}>{type.text}</i>
      </button>
    );
}
  
function SiguienteButton() {
    return(
      <button className="siguiente">Siguiente</button>
    );
}*/

function CargaArchivos() {
  const [centerText, setTitle] = useState("Selecciona el formato del artículo");
  const [currentFormat, setFormat] = useState("None");
  const [formatSelected, setSelected] = useState(false);
  const [file, setFile] = useState();

  const setType = (text: any, type: any) => {
    setTitle(text)
    setFormat(type)
    setSelected(true)
  }

  function handleChange(event: any) {
    setFile(event.target.files[0])
  }

  const goBack = () => {
    setTitle("Selecciona el formato del artículo")
    setFormat("None")
    setSelected(false)
    setFile(undefined)
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
        <Main type={currentFormat} setType={setType} file={file} handleChage={handleChange} />
      </div>
    </>
  );
}
//bodyAttributes={{style: "background-color : rgb(48, 50, 61)"}}
/*export default function CargaArchivos() {
    return (
      <body className="main">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <Header />
        <Arrow />
        <CenterHeader text="Sube el artículo en formato PDF" />
        <UploadButton text="picture_as_pdf" />
        <SiguienteButton />
      </body>
    );
}*/

export default CargaArchivos;