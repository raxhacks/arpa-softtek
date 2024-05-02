import MyTabs from './login/MyTabs'
import Typewritereffect from './login/Typewritereffect'

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
              Analiza este artículo
            </div>
            <Typewritereffect />
          </div>
        </div>
        <MyTabs />
      </div>
      
    </main>
  );
}