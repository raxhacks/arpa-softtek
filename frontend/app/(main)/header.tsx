import { redirect } from "next/navigation";
import './layout.css';
import Link from 'next/link'
import { logout } from "../actions/session";

function ARPAHeader() {
    return (
      <div className="font-semibold ARPA_header z-20">
        <h2 className="headerText">ARPA</h2>
      </div>
    );
  }
  
  function SectionsHeader() {
    return (
      <div className="sections_header">
        <div className="sectionGroup">
          <div className="sections">
            <div className="flex flex-row items-center">
  
              {/* Boton 1  */}
              <Link className="mr-4 lg:mr-10" href={`/CargarArchivos`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-news" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
                  <path d="M8 8l4 0" />
                  <path d="M8 12l4 0" />
                  <path d="M8 16l4 0" />
                </svg>
              </Link>
  
              {/* Boton 2  */}
              <Link className="mr-4 lg:mr-10" href={`/Favorites`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-bookmarks" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M15 10v11l-5 -3l-5 3v-11a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3z" />
                  <path d="M11 3h5a3 3 0 0 1 3 3v11" />
                </svg>
              </Link>
  
              {/* Boton 3  */}
              <Link className="mr-4 lg:mr-10" href={`/History`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon-header icon-tabler icon-tabler-history" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 8l0 4l2 2" />
                  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>
              </Link>

              {/* Boton 4  */}
              <button className="mr-4 lg:mr-10" onClick={() => logout()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-logout-2" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                  <path d="M15 12h-12l3 -3" />
                  <path d="M6 15l-3 -3" />
                </svg>
              </button>         
  
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default function Header(){
    return <section>
    <ARPAHeader />
    <SectionsHeader />
  </section>
  }
