import LessonCard from '@/components/LessonCard/lessonCard'
import allData from '@/DataBase/data';
import { notFound } from 'next/navigation';

const page = ({params}) => {
    const category = params.category;

    const totalLesson = Math.ceil(allData.filter(item=> item.category === category).length/5);

    const allCategories = [...new Set(allData.map(item => item.category))] ;

    if(!allCategories.includes(category)){
      return notFound();
    }


  return (
    <div className='w-screen flex flex-col px-40 py-20 min-h-screen
                    bg-gradient-to-r from-[#f1e9ff]  via-[#fff5d8cf] to-[#ffe3ec]
    '>
      <h1 className='text-4xl font-[600] text-[#5e5e5e]'>{category.charAt(0).toUpperCase() + category.slice(1)} </h1>
      <div className='flex flex-wrap gap-6 my-20'>

        

        {Array.from({length : totalLesson}).map((_ , i)=>(
          <LessonCard category={category} lessonId={i+1} key={i} />
        ))}
        

        {/* <LessonCard category={category} lessonId={1}/>
        <LessonCard category={category} lessonId={2}/>
        <LessonCard category={category} lessonId={3}/>
        <LessonCard category={category} lessonId={4}/>
        <LessonCard category={category} lessonId={5}/>
        <LessonCard category={category} lessonId={6}/>
        <LessonCard category={category} lessonId={7}/>
        <LessonCard category={category} lessonId={8}/>
        <LessonCard category={category} lessonId={9}/>
        <LessonCard category={category} lessonId={10}/>
        <LessonCard category={category} lessonId={11}/>
        <LessonCard category={category} lessonId={12}/>
        <LessonCard category={category} lessonId={13}/>
        <LessonCard category={category} lessonId={14}/>
        <LessonCard category={category} lessonId={15}/>
        <LessonCard category={category} lessonId={16}/>
        <LessonCard category={category} lessonId={17}/>
        <LessonCard category={category} lessonId={18}/>
        <LessonCard category={category} lessonId={19}/>
        <LessonCard category={category} lessonId={20}/> */}
        
      </div>
      


    </div>
  )
}

export default page
