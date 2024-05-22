'use client'
import Typewriter from 'typewriter-effect';

export default function Typewritereffect() {
    return (
        <div className="pr-16 pt-16 lg:pt-10 flex-col text-3xl text-center font-mono lg:text-left lg:text-4xl h-32">
            <Typewriter
                options={{
                    strings: [
                        "y dime si habla de la capa de ozono",
                        "y dime si habla de las nebulosas",
                        "y dime si habla de la guerra fráa",
                        "y dime si menciona a los mayas",
                        "  ",
                        "y ayudame a seguir aprendiendo"
                    ],
                    autoStart: true,
                    loop: true,
                }}
            />
        </div>

    )
} 