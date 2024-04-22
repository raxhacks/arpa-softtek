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
  const [errorMessage, setErrorMessage] = useState("");
  const [errorInLogin, setErrorInLogin] = useState("");
  const [erroMessageInRegister, setErroMessageInRegister] = useState("");


  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function validatePassword(password, confirmPassword) {
    if (password != confirmPassword){
      setValues({
        password:'',
        confirmPassword: ''
      });
      setErroMessageInRegister("")
      setErrorMessage("La contraseña y la confirmacion deben ser iguales") 
      return false
    }
    else if (password.length < 7) {
      setValues({
        password:'',
        confirmPassword: ''
      });
      setErroMessageInRegister("")
      setErrorMessage("La contraseña debe ser mayor de 7 caracteres") 
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
      setErrorInLogin("Correo o contraseña invalido")
      setValues({
        email: "",
        password: "",
      });
    }
  }
  
  const registerSubmit = async (event) => {
    event.preventDefault();
    if ((validatePassword(values.password, values.confirmPassword))) {
      const body = {
        email: values.email,
        password: values.password
      }
      const registered = await createUser(body);
      if (registered){
        router.push('/CargarArchivos')
      }
      else if (!registered) {
        setValues({
          email: "",
          password: "",
          confirmPassword: ""
        });
        setErrorMessage("");
        setErroMessageInRegister("Esta cuenta ya esta registrada");
        return
      }
    }
  }

  const resetStates = () => {
    setErrorInLogin("");
    setErrorMessage("");
    setErroMessageInRegister("");
    setValues({
      email: "",
      password: "",
      confirmPassword: ""
    });
  }

  return (
    <Tab.Group className={`w-full flex flex-grow justify-center items-center`}>
      <Tab.Panels className={`flex-grow w-full rounded-lg bg-opacity-95`}>
        <Tab.Panel className={`w-full lg:pr-32 pr-20 pl-20 mb-10`}>
          <Tab></Tab>
          {/* Inicio de Sesion Button */}
          <Tab className={`rounded-lg border border-transparent py-4 w-full text-center font-semibold text-2xl bg-blue-600 transition-colors hover:border-blue-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20`} >
            <div onClick={resetStates}>Inicio sesion</div>
          </Tab>
          {/* Registro Button */}
          <Tab className={`rounded-lg border border-transparent py-4 w-full text-center mt-8 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white`} >
            <div onClick={resetStates}>Registrarse</div>
          </Tab>
        </Tab.Panel>

        {/* Inicio de Sesion tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow fixed h-screen bg-gray-600`}>
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
            {errorInLogin && <p className="text-red-700 text-center bg-white rounded-lg">{errorInLogin}</p>} 
            <input 
              name="email" 
              type="email" 
              value={values.email}
              onChange={handleInputChange}
              placeholder = "Correo electrónico"
              autoComplete='on'
              className="w-full mb-1 lg:mb-8 border-b-2 border-yellow-500 px-3 py-2 mt-1 focus:outline-none bg-transparent text-white" 
            />
            <input 
              name="password" 
              type="password"
              value={values.password}
              onChange={handleInputChange}
              placeholder = "Contraseña"
              autoComplete='on'
              className="w-full mb-1 lg:mb-8 border-b-2 border-yellow-500 px-3 py-2 mt-1 focus:outline-none bg-transparent text-white" 
            />
          
            <button type="submit" className="rounded-lg border border-transparent py-4 w-full text-center mt-4 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white">Iniciar sesión</button>
          </form>
        </Tab.Panel>
        
        {/* Registro tab */}
        <Tab.Panel className={`w-full lg:static rounded-lg flex-grow fixed h-screen p-12 pt-6 bg-gray-600`}>
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
          <form 
          onSubmit={registerSubmit} className="flex flex-col items-center justify-center mx-auto max-w-sm mt-4 lg:mt-40">
            {errorMessage && <p className="text-red-700 text-center bg-white rounded-lg">{errorMessage}</p>}
            {erroMessageInRegister && <p className="text-red-700 text-center bg-white rounded-lg">{erroMessageInRegister}</p>} 
            <input 
              name="email" 
              type="email" 
              value={values.email}
              onChange={handleInputChange}
              placeholder = "Correo electrónico"
              autoComplete = 'off'
              className= "w-full mb-2 lg:mb-8 border-b-2 border-yellow-500 px-3 py-2 mt-1 focus:outline-none bg-transparent text-white"
            />
            <input 
              name="password" 
              type="password"
              value={values.password}
              onChange={handleInputChange}
              placeholder = "Contraseña"
              autoComplete='off'
              className="w-full mb-1 lg:mb-8 border-b-2 border-yellow-500 px-3 py-2 mt-1 focus:outline-none bg-transparent text-white" 
            />
            <input 
              name="confirmPassword" 
              type="password"
              value={values.confirmPassword}
              onChange={handleInputChange}
              placeholder = "Confirmar contraseña"
              autoComplete='off'
              className="w-full mb-2 lg:mb-8 border-b-2 border-yellow-500 px-3 py-2 mt-1 focus:outline-none bg-transparent text-white" 
            /> 
            <button type="submit" className="rounded-lg border border-transparent py-4 w-full text-center mt-4 font-semibold text-2xl text-black bg-yellow-300 transition-colors hover:border-yellow-300 hover:bg-yellow-100 hover:dark:bg-neutral-800/20 hover:text-white">Registrarse</button>
          </form>
        </Tab.Panel>

      </Tab.Panels>
    </Tab.Group>
  )
}
export default MyTabs;
