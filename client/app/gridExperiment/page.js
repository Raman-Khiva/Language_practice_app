'use client'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [hidden, setHidden] = useState('');
    // const [aSize, setaSize] = useState( expanded?' h-0' : ' h-[20%]')
    let aSize = expanded? ' h-0' : ' h-[20%]';
    const cSize = expanded? ' h-[100%] ' : ' h-[80%] ';
    const leftDiv = expanded? ' w-[90%] justify-end gap-0' : '  w-[70%] justify-between gap-2';
    const rightDiv= expanded? ' w-[10%]' : '  w-[30%]';
    const contentPropery = expanded ? ' opacity-1' : ' opacity-1'
    
    // if(expanded){
    //     setTimeout(()=>{
    //         setaSize(' hidden');
    //     },1000)
    // }
    useEffect(()=>{
        
        if(expanded){
            setTimeout(()=>{
                setHidden(' border-none ');
            },1000)
        }
        else{
            setHidden('');
        }
    },[expanded])

    
  return (
    <div className={`w-full h-screen p-2
                    flex 
                    
                    `

        }>
        <div className={`h-full flex flex-col 
                         transition-all duration-1000 ease-linear
             ` + leftDiv}>
            <div className={`bg-amber-200 rounded-2xl border-3 border-amber-500
                             w-full flex justify-center items-center
                             
                            transition-all duration-1000 ease-linear
            ` + aSize + hidden }>
                <p className={contentPropery}>A</p>
            </div>

            <div className={` bg-red-400  border-3 border-red-700 rounded-2xl cursor-pointer
                             w-full 
                            transition-all duration-1000 ease-linear
                            ` + cSize }
                onClick={()=>{setExpanded(!expanded)}}
            >
                C
            </div>
        </div>

        <div className={`flex flex-col h-full transition-all duration-1000 ease-linear ` + rightDiv}>
            <div className={`bg-violet-400 border-3 border-violet-700 rounded-2xl
                            h-[30%]  w-full
            `}>
                B
            </div>

            <div className={`bg-green-400 border-3 border-green-700 rounded-2xl
                                h-[70%] w-full
            `}>
                D
            </div>

        </div>
      
    </div>
  )
}

export default page
