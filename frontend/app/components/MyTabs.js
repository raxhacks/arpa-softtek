"use client"
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { createUser } from '@/services/user.service';
import { login } from '@/services/login.service';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

function MyTabs() {
  const router = useRouter()

  const [values, setValues] = useState({
    email: "",
    pasword: "",
    confirmPassword: ""
  })

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function validatePassword(password) {
    if (password.length < 7) {
      setValues({
        password:'',
        confirmPassword: ''
      });
      return false
    }
    return true;
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    const body = {
      email: values.email,
      password: values.password
    }
    const logedIn = await login(body);
    if (logedIn){
      router.push('/CargarArchivos')
    } else {
      goBack()
    }
  }
  
  const registerSubmit = (event) => {
    event.preventDefault();
    if (!(validatePassword(values.password))) {
      console.log(validatePassword(values.password));
    } else {
      const body = {
        email: values.email,
        password: values.password
      }
      createUser(body);
    }

  }

  const goBack = () => {
    setValues({
      email: "",
      password: "",
      confirmPassword: ""
    });
  }


  return (
    <Tab.Group className={`w-full flex flex-grow justify-center items-center`}>
      <Tab.Panels className={`flex-grow w-full rounded-lg bg-opacity-95`}>
        <Tab.Panel className={`w-96 mb-10`}>
          <Tab></Tab>
          {/* Inicio de Sesion Button */}
          <Tab className={`rounded-lg border border-transparent py-4 w-full text-center font-semibold text-2xl bg-blue-600 transition-colors hover:border-blue-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20`}>
            Inicio sesion
          </Tab>
          {/* Registro Button */}
          <Tab className={`rounded-lg border border-transparent py-4 w-full text-center mt-8 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white`}>
            Registrarse
          </Tab>
        </Tab.Panel>

        {/* Inicio de Sesion tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow fixed h-screen bg-gray-600 bg-opacity-95`}>
          <Tab className={`rounded-lg ml-2 mt-2 border w-16 border-transparent px-5 py-2 text-white`}>
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
          <form onSubmit={loginSubmit} className="flex flex-col items-center justify-center mx-auto max-w-sm mt-10 lg:mt-40">
          
            <input 
              name="email" 
              type="text" 
              value={values.email}
              onChange={handleInputChange}
              placeholder = "Correo electrónico"
              autoComplete='off'
              className=" w-full mb-10 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
            />
            <input 
              name="password" 
              type="password"
              value={values.password}
              onChange={handleInputChange}
              placeholder = "Contraseña"
              autoComplete='off'
              className="border w-full mb-10 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" 
            />
          
            <button type="submit" className="rounded-lg border border-transparent py-4 w-full text-center mt-8 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white">Iniciar sesión</button>
          </form>
        </Tab.Panel>
        
        {/* Registro tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow fixed h-screen bg-gray-600 bg-opacity-95`}>
          <Tab className={`rounded-lg ml-2 mt-2 border w-16 border-transparent px-5 py-2 text-white`}>
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
          <form onSubmit={registerSubmit} className="flex flex-col items-center justify-center mx-auto max-w-sm mt-8 lg:mt-40">
            <input 
              name="email" 
              type="text" 
              value={values.email}
              onChange={handleInputChange}
              placeholder = "Correo electrónico"
              autoComplete = 'off'
              className= "w-full mb-8 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
            />
            <input 
              name="password" 
              type="password"
              value={values.password}
              onChange={handleInputChange}
              placeholder = "Contraseña"
              autoComplete='off'
              className="border w-full mb-8 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" 
            />
            <input 
              name="confirmPassword" 
              type="password"
              value={values.confirmPassword}
              onChange={handleInputChange}
              placeholder = "Confirmar contraseña"
              autoComplete='off'
              className="border w-full mb-4 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" 
            /> 
            <button type="submit" className="rounded-lg border border-transparent py-4 w-full text-center mt-8 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white">Registrarse</button>
          </form>
        </Tab.Panel>

      </Tab.Panels>
    </Tab.Group>
  )
}
export default MyTabs;
