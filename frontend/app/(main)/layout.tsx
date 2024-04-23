import { redirect } from "next/navigation";
import './layout.css';

function ARPAHeader() {
  return (
    <div className="ARPA_header">
      <h2 className="headerText">ARPA</h2>
    </div>
  );
}

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

export default function FileUploadLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        {children}
        <ARPAHeader />
        <SectionsHeader />
      </section>
  }
