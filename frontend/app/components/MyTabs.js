"use client"
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { createUser } from '@/services/user.service';
import { login } from '@/services/login.service';
import { eventNames } from 'process';

function MyTabs() {
  const [values, setValues] = useState({
    email: "",
    pasword: "",
    confirmPassword: ""
  })

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();
    const body = {
      email: values.email,
      password: values.password
    }
    await login(body);
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const body = {
      email: values.email,
      password: values.password
    }
    createUser(body);
  }


  return (
    <Tab.Group className={`w-full flex flex-grow items-center justify-center`}>
      <Tab.Panels>
        <Tab.Panel className={`static lg:w-full rounded-lg lg:pb-32 bg-opacity-95`}>
          <Tab></Tab>
          {/* Inicio de Sesion Button */}
          <Tab className={`rounded-lg border border-transparent px-5 py-4 w-full text-center font-semibold text-2xl bg-blue-600 transition-colors hover:border-blue-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20`}>
            Inicio sesion
          </Tab>
          {/* Registro Button */}
          <Tab className={`rounded-lg border border-transparent px-5 py-4 w-full text-center mt-8 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white`}>
            Registro
          </Tab>
        </Tab.Panel>

        {/* Inicio de Sesion tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow grid grid-cols-1 fixed lg:pb-0 pb-96 bg-gray-900 bg-opacity-95`}>
          <Tab className={`rounded-lg ml-2 mt-2 border w-16 border-transparent px-5 py-2 text-black`}>
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
          <form onSubmit={handleForm} className="flex flex-col items-center justify-center mx-auto max-w-sm">
            <label className="block text-center">
              Correo electrónico:<br/>
              <input 
                name="email" 
                type="email" 
                value={values.email}
                onChange={handleInputChange}
                className="border w-full border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
              />
            </label>
            <label className="block mb-2 text-center">
              Contraseña:<br/>
              <input 
                name="password" 
                type="password"
                value={values.password}
                onChange={handleInputChange} 
                className="border w-full border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" 
              />
            </label>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-16 w-full">Enviar</button>
          </form>
        </Tab.Panel>
        
        {/* Registro tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow grid grid-cols-1 fixed pb-96 lg:pb-32 bg-opacity-95 bg-[rgb(77, 80, 97)]`}>
          <Tab className={`rounded-lg ml-2 mt-2 border w-16 border-transparent px-5 py-2 text-black`}>
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
          <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-center mx-auto ">
            <label className="block text-center">
              Correo electrónico:<br/>
              <input
                className="border w-96 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"  
                type="email" 
                name="email"
                placeholder = "Correo electrónico"
                value = {values.email}
                onChange={handleInputChange}
              />
            </label>
            <label className="block mb-2 text-center">
              <input 
                className="border w-96 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" 
                type="password" 
                name='password'
                value={values.password}
                placeholder = "Contraseña"
                onChange={handleInputChange}
              />
            </label>
            <label className="block mb-2 text-center">
              <input 
                className="border w-full border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black"
                type="password" 
                name='confirmPassword'
                value={values.confirmPassword}
                placeholder='Confirmar contraseña'
                onChange={handleInputChange}

              />
            </label>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4 w-full">Enviar</button>
          </form>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
export default MyTabs;
