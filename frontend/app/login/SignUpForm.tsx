import { useFormStatus, useFormState } from 'react-dom';
import { signup } from '@/app/actions/auth';
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Bounce } from "react-awesome-reveal";

export function SignupButton() {
    const { pending } = useFormStatus()
  
    return (
      <button disabled={pending} type="submit" className="rounded-lg border border-transparent py-2 px-9 w-mid text-center mt-6 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white">
        {pending ? 'Registrando...' : 'Registrarse'}
      </button>
    )
  }

export default function SignUpForm(){
  const [state, action] = useFormState(signup, undefined);
  const [showPasswordR, setShowPasswordR] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    if (state?.errors?.password) {
      setIsOpen(true);
    }
  }, [state?.errors?.password]);
  
  useEffect(() => {
    if (state?.message) {
      setIsOpenModal(true);
    }
  }, [state?.message]);
  
  function close() {
    setIsOpen(false)
  }

  function closeModal() {
    setIsOpenModal(false)
  }

  const togglePasswordVisibilityR = () => {
    setShowPasswordR(!showPasswordR);
  };
    return (
        <form action={action} 
        className="flex flex-col items-center justify-center mx-auto max-w-sm lg:mt-40">
        <Bounce>
          <h1 className='text-white font-bold text-3xl lg:mb-10 '>Crea tu cuenta</h1>
        </Bounce>
        {state?.message && 
          <Bounce>
            <div className='pl-2 pr-2 rounded-2xl border border-red-500 mb-3' style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-exclamation-circle mr-1" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px' }}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                <path d="M12 9v4" />
                <path d="M12 16v.01" />
              </svg>
              <p className='mr-1 text-white'>{state.message}</p>
            </div>
          </Bounce>
        }
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
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
            </svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
              <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
              <path d="M3 3l18 18" />
            </svg>
            }
          </button>
        </div>

        {/* Modal messages */}
        {(state?.errors?.password) && (
          <div className='z-30'>
            <Transition appear show={isOpen}>
              <Dialog as="div" className="relative z-30 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4">
                    <TransitionChild
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 transform-[scale(95%)]"
                      enterTo="opacity-100 transform-[scale(100%)]"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 transform-[scale(100%)]"
                      leaveTo="opacity-0 transform-[scale(95%)]"
                      >
                      <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                        <DialogTitle as="h1" className="text-base/7 font-bold text-white">
                          Error en registro
                        </DialogTitle>
                        {state?.errors?.email && 
                          <div>
                            <p className='mb-auto text-white'>
                            {state.errors.email}
                            </p>
                          </div>
                        }
                        <br/>
                        <p className='text-white'>La contraseña debe:</p>
                        {state?.errors?.password.map((error) => (
                          <ul>
                            <li className='text-white' key={error}>- {error}</li>
                          </ul>
                        ))}
                        <div className="mt-4">
                          <Button
                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                            onClick={close}
                          >
                            Entendido
                          </Button>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        )}


        <SignupButton />
      </form>
    )
}