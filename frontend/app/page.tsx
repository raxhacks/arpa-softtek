'use client';

import MyTabs from './components/MyTabs'
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="grid lg:grid-cols-2 w-full flex-grow">
        <div className="lg:ml-10 flex items-center justify-center ">
          <div className='pl-16 pb-16 lg:pl-20 lg:ml-10 flex-grow'>
            <div className="pr-16 pt-16 lg:pt-10 flex-col text-7xl text-center font-semibold lg:text-left lg:pb-16 lg:text-8xl lg:static ">
              ARPA
            </div>
            <div className="felx-col text-5xl max-w-[50ch] pb-5 pt-16 lg:pt-0 lg:static font-mono">
              Analiza este articulo
            </div>
            <div className="felx-col text-3xl max-w-[20ch] pt-5 lg:text-4xl font-mono h-32">
              <Typewriter
                options={{
                  strings:[
                    "Y dime si habla sobre la capa de ozono",
                    "Y dime si habla sobre el capitalismo",
                    "Y dime si habla sobre la guerra fria",
                    "Y dime si menciona algo sobre las nebulosas",
                    "    ",
                    "Y ayudame a seguir aprendiendo     ",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 25
                }} 
              />
            </div>
          </div>
        </div>
        <MyTabs />
      </div>
      
    </main>
  );
}
