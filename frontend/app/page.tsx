import MyTabs from './components/MyTabs'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-16 lg:pt-20 text-white">
      <div className=" max-w-5xl w-full items-center font-mono lg:px-5 text-lg lg:flex ">
        <div className="fixed left-0 top-0 flex w-full justify-center text-7xl lg:text-9xl font-semibold pb-5 pt-10 backdrop-blur-2xl lg:static lg:w-auto">
          ARPA
        </div>
      </div>    
      <div className="grid text-left pb-4 mt-10 w-full items-center flex-grow lg:mt-0 lg:w-full lg:grid-cols-2 lg:pr-20">
        <div className="flex flex-col pb-32 items-center justify-center">
          <div className='pl-16 max-w-[45ch]'>
            <div className="felx-col text-5xl font-semibold pb-5 pt-16 lg:pt-0 lg:text-6xl ">
              Analiza este articulo
            </div>
            <div className="flex felx-col text-3xl max-w-[15ch] font-semibold pt-5 lg:text-3xl">
              Y dime si habla sobre la capa de ozono
            </div>
          </div>
        </div>

        <div className='flex-grow items-center justify-center justify-items-center'>
          <MyTabs />
        </div>
      </div>
      
    </main>
  );
}
