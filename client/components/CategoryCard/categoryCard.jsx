import Link from "next/link";
import ProgressBar from "../ProgessBar/progressBar";

const categoryCard = ({category}) => {
  return (
    <div
        className='w-full bg-[#ffffffd8] py-4 pl-6 pr-10 text-2xl text-gray-600 font-[500] border-2 border-gray-200 shadow-sm shadow-gray-200 rounded-2xl
                    grid grid-cols-[1.5fr_1fr_1fr_0.7fr] items-center
                   '
    >


      <h3 className=" ">{category}</h3>


      <h4 className="text-lg   ">14/20 lessons</h4>



      <ProgressBar/>
      


      <div className="flex flex-row-reverse">
        <Link 
          href={`/categories/${category}`}
          className="text-[16px]  text-white px-3 py-[6px] bg-blue-600 rounded-xl hover:scale-[103%] "> Do it
        </Link>
      </div>


    </div>
  )
}

export default categoryCard
