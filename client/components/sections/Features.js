import React from 'react'

import { MdOutlineSupportAgent, MdOutlineAutoAwesome } from "react-icons/md";
import { RiRobotLine, RiGraduationCapLine } from "react-icons/ri";
import { BiLibrary } from "react-icons/bi";
import { IoBookOutline } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { FaRegLightbulb } from "react-icons/fa";
import FeatureCard from '../cards/FeatureCard';
import Badge from '../common/Badge';
import { BsFillPuzzleFill } from 'react-icons/bs';
import { LuBadgeCheck } from 'react-icons/lu';

const features = [
  {
    title: "Real-Time AI Guidance",
    description: "Always-on AI assistance that adapts instantly to your learning needs and pace.",
    icon: MdOutlineSupportAgent
  },
  {
    title: "Vast Content Pool",
    description: "Access thousands of lessons, exercises, and practice scenarios for all skill levels.",
    icon: BiLibrary
  },
  {
    title: "Expert-Curated Learning Path",
    description: "Professionally designed courses ensure steady progress without confusion or overwhelm.",
    icon: GiPathDistance
  },
  {
    title: "Personalized Learning Recommendations",
    description: "Get smart suggestions tailored to your strengths, weaknesses, and learning style.",
    icon: FaRegLightbulb
  }
];


const Features = () => {
  return (
    <div className='min-h-screen flex items-start justify-center py-28  px-8 md:px-32 gap-8 '>
      <div className='text-wrap text-start flex flex-col flex-2/5 gap-5 sticky top-60'>
        <Badge tag="Key Differentiators" icon={LuBadgeCheck}/>
        <h2 className='text-[50px] leading-tight font-[400]
        '>Features That Make Learning Smarter</h2>

        <h5 className='text-xl font-[600] text-start text-wrap text-gray-800'
        >This platform combines AI guidance, curated content, and personalization to deliver a truly modern learning journey.</h5>

      </div>

      <div className='flex-2/5 flex flex-col gap-4'>
        {features.map((feature,i)=>(
            <FeatureCard 
            key={i}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            />
        ))}
      </div>
    </div>
  )
}

export default Features
