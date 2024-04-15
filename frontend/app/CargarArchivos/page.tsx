function ActiveSectionButton(name: any) {
    return (
      <button className="sections">
        <i className="material-icons" style={{fontSize: "4vw", verticalAlign: "middle", color: "rgb(217, 189, 122)"}}>{name.text}</i>
      </button>
    );
}
  
function InactiveSectionButton(name: any) {
    return (
      <button className="sections">
        <i className="material-icons" style={{fontSize: "4vw", verticalAlign: "middle"}}>{name.text}</i>
      </button>
    );
}
  
function Header() {
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
}
  
function Arrow() {
    return(
      <button className="arrow">
        <i className="material-icons" style={{fontSize: "400%"}}>keyboard_backspace</i>
      </button>
    );
}
  
function CenterHeader(title: any) {
    return(
      <h1 className="centerHeader">{title.text}</h1>
    );
}
  
function UploadButton(type: any) {
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
}
  
export default function CargaArchivos() {
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
}