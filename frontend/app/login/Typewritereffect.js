'use client'
import Typewriter from 'typewriter-effect';

export default function Typewritereffect() {
    return (
        <div className="pr-16 pt-16 lg:pt-10 flex-col text-3xl text-center font-mono lg:text-left lg:text-4xl h-32">
            <Typewriter
                options={{
                    strings: [
                        "y dime si habla de la capa de ozono",
                        "y dime si habla sobre la pandemia por COVID-19",
                        "y explícame el marco teórico",
                        "y dime si toca el tema de los microplásticos",
                        "y dime si habla de las nebulosas",
                        "y dime si habla de la Guerra Fría",
                        "y dime si menciona a los mayas",
                        "y dime si trata sobre ciberseguridad", 
                        "y dime si habla del cambio climático",
                        "y dime si trata sobre el Porfiriato",
                        "y haz un resumen de la metodología",
                        "  ",
                        "y ayúdame a seguir aprendiendo"
                    ],
                    autoStart: true,
                    loop: true,
                }}
            />
        </div>

    )
} 