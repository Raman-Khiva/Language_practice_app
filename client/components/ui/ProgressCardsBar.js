import React from 'react'

import { FaListCheck } from "react-icons/fa6";
import ProgressCard from './ProgressCard';
// import CircularProgressNew from './CircularProgressNew'
const ProgressCardsBar = ({className}) => {
  return (
    <div className={className}
            >
              <ProgressCard className="border-amber-400 ring-amber-100/60"  color='from-amber-300'  fillColor="#fe9a00" text={"Done"}>
                <FaListCheck className='text-[2rem] text-amber-400 '/>
              </ProgressCard>

              <ProgressCard className="border-blue-400 ring-blue-100  " color="from-blue-400" fillColor="#2b7fff" text={"Average"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36 36"
                    className='h-11 w-11 fill-blue-500'
                    // lets you control color via Tailwind (e.g. text-blue-600)
                  >
                    <path d="M23,24c-3.5991,0-5.0293-4.1758-6.4126-8.2139C15.2764,11.9583,13.92,8,11,8a3.44,3.44,0,0,0-3.0532,2.3215L6.0513,9.6838C6.1016,9.5334,7.3218,6,11,6c4.3491,0,6.0122,4.8547,7.48,9.1379C19.6885,18.6667,20.83,22,23,22a3.44,3.44,0,0,0,3.0532-2.3215l1.8955.6377C27.8984,20.4666,26.6782,24,23,24Z"></path>
                    <path d="M4,28V17H6V15H4V2H2V28a2,2,0,0,0,2,2H30V28Z"></path>
                    <rect x="8" y="15" width="2" height="2"></rect>
                    <rect x="12" y="15" width="2" height="2"></rect>
                    <rect x="20" y="15" width="2" height="2"></rect>
                    <rect x="24" y="15" width="2" height="2"></rect>
                    <rect x="28" y="15" width="2" height="2"></rect>
                    <rect width="24" height="24" fill="none"></rect>
                  </svg>
              </ProgressCard>

              <ProgressCard className=" border-purple-300 ring-purple-100" color="from-purple-400" fillColor="#c800de" text={"Attempts"}>
                <FaListCheck className='text-[2rem] text-fuchsia-500'/>
                
              </ProgressCard>
              <ProgressCard className="border-green-400  ring-green-100/50 " color="from-green-300" fillColor="#00a63e" text={"Ace"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      // size + color via Tailwind
                      className='w-10 h-10 fill-green-500'
                       // color controlled by text-* classes
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 10.874 21.803984 9.7942031 21.458984 8.7832031L19.839844 10.402344C19.944844 10.918344 20 11.453 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C13.633 4 15.151922 4.4938906 16.419922 5.3378906L17.851562 3.90625C16.203562 2.71225 14.185 2 12 2zM21.292969 3.2929688L11 13.585938L7.7070312 10.292969L6.2929688 11.707031L11 16.414062L22.707031 4.7070312L21.292969 3.2929688z"></path>
                    </svg>            
              </ProgressCard>
    </div>
  )
}

export default ProgressCardsBar
