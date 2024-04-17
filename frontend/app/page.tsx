import MyTabs from './components/MyTabs'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="grid lg:grid-cols-2 w-full flex-grow">
        <div className="lg:ml-10 flex items-center justify-center ">
          <div className='p-16 lg:pl-20 lg:ml-10 flex-grow'>
            <div className=" flex-col text-7xl text-center font-semibold lg:text-left lg:pb-16 lg:text-8xl lg:static ">
              ARPA
            </div>
            <div className="felx-col text-5xl max-w-[20ch] pb-5 pt-16 lg:pt-0 lg:text-5xl lg:static ">
              Analiza este articulo
            </div>
            <div className="felx-col text-3xl max-w-[15ch] pt-5 lg:text-3xl">
              Y dime si habla sobre la capa de ozono
            </div>
          </div>
        </div>
        <MyTabs />
      </div>
      
    </main>
  );
}
