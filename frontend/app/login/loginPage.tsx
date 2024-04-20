import MyTabs from './MyTabs'
import { useEffect, useState } from 'react';
// import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="grid lg:grid-cols-2 w-full flex-grow">
        <div className="lg:ml-10 flex items-center justify-center ">
          <div className='pl-16 pb-16 lg:pl-20 lg:ml-10 flex-grow'>
            <div className="pr-16 pt-16 lg:pt-10 flex-col text-7xl text-center font-semibold lg:text-left lg:text-8xl ">
              ARPA
            </div>
            <div className="pr-16 pt-16 lg:pt-10 flex-col text-5xl text-center font-mono lg:text-left lg:text-6xl">
              Analiza este articulo
              {/* pr-16 pt-16 flex-col text-5xl justify-center items-center lg:text-6xl pb-5 font-mono */}
            </div>
            <div className="pr-16 pt-10 lg:max-w-[20ch] flex-col text-3xl h-32 text-center font-mono lg:text-left lg:text-4xl">
            {/* flex-col text-3xl max-w-[20ch] pt-5 lg:text-4xl font-mono h-32 */}
              {/* <Typewriter
                options={{
                  strings:[
                    "Y dime si habla sobre la capa de ozono",
                    "Y dime si habla sobre el capitalismo",
                    "Y dime si habla sobre la guerra fria",
                    "Y dime si habla sobre las nebulosas",
                    "    ",
                    "Y ayudame a seguir aprendiendo     ",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 25
                }} 
              /> */}
            </div>
          </div>
        </div>
        <MyTabs />
      </div>
      
    </main>
  );
}
