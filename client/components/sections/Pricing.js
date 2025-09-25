import React from 'react'
import PriceCard from '../ui/PriceCard';
import Badge from '../ui/Badge';
import { LuCrown } from 'react-icons/lu';

const pricingPlans = [
  {
    title: "Basic Plan",
    price: "$0 ",
    description: "Great for beginners exploring learning.",
    features: [
      "Access to free lessons",
      "Community support",
      "Basic progress tracking"
    ],
    highlight: false
  },
  {
    title: "Standard Plan",
    price: "$19 ",
    description: "For learners who want AI and personalization.",
    features: [
      "Everything in Starter",
      "AI-powered guidance",
      "Unlimited practice",
      "Personalized learning path",
      "Priority support"
    ],
    highlight: true
  },
  {
    title: "Pro Plan",
    price: "$25 ",
    description: "Designed for teams and institutions.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Dedicated manager",
      "Custom integrations",
      "24/7 premium support"
    ],
    highlight: false
  }
];



const Pricing = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-8
                    py-32 px-40
    '>

      <div className='flex flex-col gap-4 items-center
      '>
        <Badge tag="Premium learning for everyone" icon={LuCrown} />
        <h2 className='text-[50px] leading-tight font-[400]'>Pricing Options</h2>
        <p className='text-lg font-[600] text-[#414141]'>Choose the subscription plan that suits your needs</p>
      </div>

      <div className=' w-full
                        flex justify-evenly 
      '>
        {pricingPlans.map((plan,i)=>(
            <PriceCard 
                key={i}
                i={i}
                title={plan.title}
                price={plan.price}
                features={plan.features}
            />
        ))}
      </div>
      
    </div>
  )
}

export default Pricing
