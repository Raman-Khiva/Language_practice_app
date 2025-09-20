'use client'
import React from 'react'
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CapabilityCard from '../ui/CapabilityCard';
import { RiStackLine } from 'react-icons/ri';
import Badge from '../ui/Badge';

const capabilites = [
  {
    title: "Supports All Aspects of Language Learning",
    description: "Learn, practice, speak, and read with a complete all-in-one language learning platform.",
    color: "from-blue-500 to-purple-600",
    badge: "Complete Learning Solution",
    badgeColor: "bg-blue-100 text-blue-800",
    points: [
      "Speaking, listening, reading, writing practice",
      "Balanced focus on fluency & comprehension",
      "Guided practice sessions with instant feedback",
      "Real-life conversational scenarios",
      "Progressively challenging tasks"
    ]
  },
  {
    title: "Real-Time Answer Validation, Suggestions & Review",
    description: "Get instant feedback with AI-powered corrections, smart suggestions, and personalized review sessions.",
    color: "from-green-500 to-blue-600",
    badge: "AI-Powered Feedback",
    badgeColor: "bg-green-100 text-green-800",
    points: [
      "Immediate error detection & corrections",
      "Smart suggestions for better phrasing",
      "Grammar and pronunciation review",
      "Confidence-building practice sessions",
      "Learn from mistakes in real time"
    ]
  },
  {
    title: "Pre-Arranged + Customizable Lessons",
    description: "Follow structured lessons or create customized learning paths tailored to your personal goals.",
    color: "from-purple-500 to-pink-600",
    badge: "Flexible Learning",
    badgeColor: "bg-purple-100 text-purple-800",
    points: [
      "Structured lessons for steady progress",
      "Customize topics & difficulty",
      "Adjust pace to personal learning goals",
      "Blend core content with self-chosen material",
      "Flexible learning that adapts to your needs"
    ]
  },
  {
    title: "Interaction with Native Speakers",
    description: "Practice authentic conversations with native speakers through text and video chat for fluency.",
    color: "from-orange-500 to-red-600",
    badge: "Native Speaker Practice",
    badgeColor: "bg-orange-100 text-orange-800",
    points: [
      "Text and video chat options",
      "Learn cultural nuances, not just words",
      "Boost fluency through authentic dialogue",
      "Feedback from native speakers",
      "(Coming Soon) Dedicated conversation partners"
    ]
  },
  {
    title: "Progress Tracking Made Simple",
    description: "Track your learning journey with daily, monthly, and category-wise insights to stay motivated.",
    color: "from-teal-500 to-green-600",
    badge: "Smart Analytics",
    badgeColor: "bg-teal-100 text-teal-800",
    points: [
      "Daily & monthly reports",
      "Difficulty-wise breakdown of skills",
      "Track strengths and areas to improve",
      "Visual learning journey dashboards",
      "Goal-based progress milestones"
    ]
  }
];

const Capabilites = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();
  const [scrollDir, setScrollDir] = useState("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDir = () => {
      const currentY = window.scrollY;
      setScrollDir(currentY > lastScrollY ? "down" : "up");
      lastScrollY = currentY > 0 ? currentY : 0;
    };
    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  useEffect(() => {
    if (inView && scrollDir === "down") {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 2, ease: "easeOut" },
      });
    }

    if (!inView && scrollDir === "up") {
      controls.start({
        x: -200,
        opacity: 0,
        transition: { duration: 2, ease: "easeIn" },
      });
    }
  }, [inView, scrollDir, controls]);

  return (
    <div className='flex flex-col items-center justify-center px-32 py-40'>
      <div className='flex items-start justify-evenly gap-10'>
        <motion.div 
          ref={ref}
          initial={{ x: -200, opacity: 0 }}
          animate={controls}
          className='h-[34rem] w-[29rem] bg-violet-300/30
                     flex items-center justify-center
                     rounded-3xl'
        >
        </motion.div>
        <div className='flex flex-col items-start gap-4 w-[45%] py-2'>
          <Badge tag="Key Capabilites" icon={RiStackLine} />
          <h2 className='text-[54px] leading-tight font-[700]'>
            Essential Capabilities for Lasting Language Mastery
          </h2>
          <p className='text-lg font-[500] text-[#3c3c3c]'>
            From structured lessons to real conversations, our platform supports every aspect of language learning with guidance and progress tracking.
          </p>
        </div>
      </div>
      <div className="relative">
        {capabilites.map((capability, index) => (
          <CapabilityCard 
            key={index}
            title={capability.title}
            description={capability.description}
            badge={capability.badge}
            badgeColor={capability.badgeColor}
            points={capability.points}
            index={index}
            totalCards={capabilites.length}
          />
        ))}
      </div>
    </div>
  )
}

export default Capabilites