'use client'

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function MyTabs() {
  const [showModal, setshowModal] = useState('menuTabs');

  function setModal(modalToShow: string){
    setshowModal(modalToShow);
  }
  return (
    <div className={`w-full flex flex-grow justify-center items-center`}>
        {showModal === 'login' ? ( 
            <div className={`w-full lg:static rounded-lg flex-grow fixed h-screen p-12 pt-6 bg-gray-700 overflow-y-auto transition z-20`}>
              {/* Boton de atras  */}
              <button 
                className={`rounded-lg border w-16 border-transparent py-2 text-white`}
                onClick={() => setModal('menuTabs')}
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 transform rotate-90"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v11.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
              </button>
              {/* form para login */}
              <LoginForm/>
            </div>
          ): showModal === 'register' ? (
            <div className={`w-full lg:static rounded-lg flex-grow fixed h-screen p-12 pt-6 bg-gray-600 overflow-y-auto transition z-20`}>   
            {/* Boton de atras */}
            <button   
              className={`rounded-lg border w-16 border-transparent text-white`}
              onClick={() => setModal('menuTabs')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" 
                fill="currentColor"
                className="w-6 h-6 transform rotate-90"
                >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v11.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* form para registro */}
            <SignUpForm/>
            </div>
          ) : showModal === 'menuTabs' ? (
          <div className={`w-full lg:pr-32 pr-20 pl-20 mb-10`}>
            <button 
              className={`rounded-lg border border-transparent py-4 w-full text-center font-semibold text-2xl bg-blue-600 transition-colors hover:border-blue-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20`}
              onClick={() => setModal('login')}
            >
              Iniciar sesión
            </button>
            <button 
              className={`rounded-lg border border-transparent py-4 w-full text-center mt-8 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white`}
              onClick={() => setModal('register')}
            >
              Registrarse
            </button>
          </div>
        ): (
          <div></div>
        )}
    </div>
  )
}

export function SignupButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit" className="rounded-lg border border-transparent py-2 px-9 w-mid text-center mt-6 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white">
      {pending ? 'Registrando...' : 'Registrarse'}
    </button>
  )
}

export function LoginButton() {
    const { pending } = useFormStatus()
  
    return (
      <button disabled={pending} type="submit" className="rounded-lg border border-transparent py-2 px-9 w-mid text-center mt-6 font-semibold text-2xl text-white bg-blue-500 transition-colors hover:border-blue-300 hover:bg-blue-100 hover:dark:bg-neutral-800/20 hover:text-white">
        {pending ? 'Iniciando sesion...' : 'Iniciar sesión'}
      </button>
    )
  }


export default MyTabs;
