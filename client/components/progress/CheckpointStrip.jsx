import React from 'react'




const CheckpointStrip = ({className,percentage}) => {

  // 1 10 30 50

  let points = 0;
  if(percentage >= 50){
    points = 4;
  }else if(percentage >= 30){
    points = 3;
  }else if(percentage >= 10){
    points = 2;
  }else if(percentage >= 1){
    points = 1;
  }

  const first = percentage >= 10 ? 10 : percentage;
  percentage -= first;
  const second = percentage >= 20 ? 20 : percentage;
  percentage -= second;
  const third = percentage >= 20 ? 20 : percentage;
  percentage -= third;

  const width = (first/10 * 100/3) + (second/20 * 100/3) + (third/20 * 100/3);
 

  
  return (
    
      <div className={`h-1 w-full  rounded-full
                      relative bg-gray-50
                      flex items-center justify-between 
                      ` + className}
      >
        <div className={`h-1 rounded-full absolute top-0 left-0 z-0 
                        bg-[#2dc653] `
        }
          style={{width: `${width}%`}}
        />
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className={`h-5.5 w-5.5 rounded-full z-10 
                        ${index < points ? 'bg-[#2dc653]' : 'bg-gray-100'} border-3 border-white
                        flex items-center justify-center
                        shadow-sm
                        
           `}
          >
            <div className='h-1.5 w-1.5  z-10 rounded-full bg-gray-200' />
          </div>
        ))}
         
      </div>
    
  )
}

export default CheckpointStrip
