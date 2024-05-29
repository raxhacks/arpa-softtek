
'use client'
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { useFormStatus, useFormState } from 'react-dom'
import { signup } from '@/app/actions/auth'
import { authLogin, login } from '@/app/actions/authLogin'

function MyTabs() {
  const [state, action] = useFormState(signup, undefined);
  const [loginstate, loginAction] = useFormState(authLogin, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordR, setShowPasswordR] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityR = () => {
    setShowPasswordR(!showPasswordR);
  };

  return (
    <Tab.Group className={`w-full flex flex-grow justify-center items-center`}>
      <Tab.Panels className={`flex-grow w-full rounded-lg bg-opacity-95`}>
        <Tab.Panel className={`w-full lg:pr-32 pr-20 pl-20 mb-10`}>
          <Tab></Tab>
          {/* Inicio de Sesion Button */}
          <Tab className={`rounded-lg border border-transparent py-4 w-full text-center font-semibold text-2xl bg-blue-600 transition-colors hover:border-blue-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20`} >
            <div 
            // onClick={resetStates}
            >Iniciar sesión</div>
          </Tab>
          {/* Registro Button */}
          <Tab className={`rounded-lg border border-transparent py-4 w-full text-center mt-8 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white`} >
            <div 
            // onClick={resetStates}
            >Registrarse</div>
          </Tab>
        </Tab.Panel>

        {/* Inicio de Sesion tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow fixed h-screen p-12 pt-6 bg-gray-600 overflow-y-auto`}>
          {/* Boton de atras  */}
          <Tab className={`rounded-lg border w-16 border-transparent py-2 text-white`}>
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
          </Tab>

          {/* form para login */}
          <form action={loginAction} 
            className="flex flex-col items-center justify-center mx-auto max-w-sm mt-10 lg:mt-40">
            {loginstate?.message && 
              <div className='pl-2 pr-2 rounded-2xl border border-red-500 mb-3' style={{ display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-exclamation-circle mr-1" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px' }}>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 9v4" />
                  <path d="M12 16v.01" />
                </svg>
                <p className='mr-1'>{loginstate.message}</p>
              </div>
            }
            <div className='w-full'>
              <input 
                id="email" 
                name="email" 
                placeholder = "Correo electrónico" 
                className="w-full mb-4 border border-blue-500 rounded-3xl px-4 py-3 mt-1 focus:outline-none bg-slate-600 text-white"/> 
            </div>
            <div className="w-full relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                autoComplete='on'
                className="w-full mb-1 border border-blue-500 rounded-3xl px-4 py-3 mt-1 focus:outline-none bg-slate-600 text-white" 
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
              >
                {showPassword ? 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-off" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                  <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                  <path d="M3 3l18 18" />
                </svg>
                }
              </button>
            </div>
            <LoginButton />
          </form>
        </Tab.Panel>

        {/* Registro tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow fixed h-screen p-12 pt-6 bg-gray-600 overflow-y-auto`}>   
          {/* Boton de atras */}
          <Tab className={`rounded-lg border w-16 border-transparent text-white`}>
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
          </Tab>
          
          {/* form para registro */}
          <form action={action} 
          // onSubmit={registerSubmit} 
            className="flex flex-col items-center justify-center mx-auto max-w-sm mt-4 lg:mt-40">
            {state?.message && 
              <div className='pl-2 pr-2 rounded-2xl border border-red-500 mb-3' style={{ display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-exclamation-circle mr-1" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px' }}>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 9v4" />
                  <path d="M12 16v.01" />
                </svg>
                <p className='mr-1'>{state.message}</p>
              </div>
            }

            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div className='w-full'>
              <input 
                name="email" 
                type="text" 
                id="email"
                placeholder = "Correo electrónico"
                autoComplete = 'off'
                className="w-full mb-4 border border-yellow-500 rounded-3xl px-4 py-3 mt-1 focus:outline-none bg-slate-600 text-white" 
              />
            </div>

            <div className='w-full relative'>
              <input 
                name="password" 
                type={showPasswordR ? "text" : "password"}
                id="password"
                placeholder = "Contraseña"
                autoComplete='off'
                className="w-full mb-1 border border-yellow-500 rounded-3xl px-4 py-3 mt-1 focus:outline-none bg-slate-600 text-white" 
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibilityR}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
              >
                {showPasswordR ? 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-off" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                  <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                  <path d="M3 3l18 18" />
                </svg>
                }
              </button>
            </div>
            {state?.errors?.password && (
              <div>
                <p>La contraseña debe:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <SignupButton />
          </form>
        </Tab.Panel>

      </Tab.Panels>
    </Tab.Group>
  )
}

export function SignupButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit" className="rounded-lg border border-transparent py-4 w-full text-center mt-4 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white">
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
