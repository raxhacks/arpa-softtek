"use client"
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios'

function MyTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Función para manejar el envío del formulario
  const sendFormDataToServer = async (formData) => {
    try {
      const response = await axios('https://arpa-2mgft7cefq-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token; 
        Cookies.set('token', token);
        
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Llama a la función para enviar los datos al servidor
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    await sendFormDataToServer(formDataObject);
  };

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} className={`mt-20 w-full lg:mt-0 flex flex-col flex-grow items-center justify-center`}>
      <Tab.Panels className={`w-full`}>
        <Tab.Panel>
          <Tab></Tab>
          {/* Inicio de Sesion Button */}
          <Tab className={`rounded-lg border border-transparent px-5 w-full lg:w-96 text-center py-4 font-semibold text-2xl lg:ml-14 bg-blue-600 transition-colors hover:border-blue-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20`}>
            Inicio sesion
          </Tab>
          <Tab className={`rounded-lg border border-transparent px-5 w-full lg:w-96 text-center py-4 mt-8 font-semibold text-2xl lg:ml-14 text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white`}>
            Registro
          </Tab>
        </Tab.Panel>

        {/* Inicio de Sesion tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow grid grid-cols-1 fixed pb-36 lg:pb-5 bg-slate-600 bg-opacity-95`}>
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
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mx-auto max-w-sm">
            <label className="block text-center">
              Correo electrónico:<br/>
              <input name="email" type="email" className="border w-96 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" />
            </label>
            <label className="block mb-2 text-center">
              Contraseña:<br/>
              <input name="password" type="password" className="border w-96 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" />
            </label>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-16 w-full">Enviar</button>
          </form>
        </Tab.Panel>
        
        {/* Registro tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow grid grid-cols-1 fixed pb-36 lg:pb-5  bg-slate-600 bg-opacity-95`}>
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
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mx-auto max-w-sm">
            <label className="block text-center">
              Correo electrónico:<br/>
              <input name="email" type="email" className="border w-96 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" />
            </label>
            <label className="block mb-2 text-center">
              Contraseña:<br/>
              <input name="password" type="password" className="border w-96 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" />
            </label>
            <label className="block mb-2 text-center">
              Confirmar contraseña:<br/>
              <input name="confirmPassword" type="password" className="border w-96 border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 text-black" />
            </label>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4 w-full">Enviar</button>
          </form>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
export default MyTabs;
