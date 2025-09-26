// "use client"

// import { useMemo, useState } from 'react'
// import Navbar from '@/components/Navbar/Navbar'
// import SideBar from '@/components/SideBar'
// import { storyCardData } from '@/mock/storyCards'
// import StoryCard from '@/components/ui/StoryCard'

// const StoriesPage = () => {
//   const [isSideBarOpen, setSideBarOpen] = useState(true)

//   const statsOverview = useMemo(
//     () => [
//       { label: 'Lessons Completed', value: '24', sublabel: 'This Month' },
//       { label: 'Active Journeys', value: '3', sublabel: 'In Progress' },
//       { label: 'Streak', value: '12 days', sublabel: 'Current streak' },
//     ],
//     []
//   )

//   const recentActivities = useMemo(
//     () => [
//       { title: 'Finished Lesson 17', timestamp: '2 hours ago' },
//       { title: 'Checkpoint 2 unlocked', timestamp: 'Yesterday' },
//       { title: 'New badge earned: Story Weaver', timestamp: '2 days ago' },
//     ],
//     []
//   )

//   const recommendationItems = useMemo(
//     () => [
//       { title: 'Try the Creative Writing Challenge', description: 'Push your narrative skills with a timed prompt.' },
//       { title: 'Join the Listening Lab', description: 'Improve comprehension with real-life stories.' },
//     ],
//     []
//   )

//   return (
//     <div className="min-h-screen bg-[#f6f7fb]">
//       <Navbar />

//       <div className="pt-24 pb-10">
//         <div className="mx-auto flex w-full max-w-[1400px] gap-6 px-6 lg:px-10">
//           <aside className="hidden lg:block w-[260px]">
//             <div className="sticky top-28 h-[calc(100vh-8rem)]">
//               <SideBar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />
//             </div>
//           </aside>

//           <main className="flex-1">
//             <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
//               {statsOverview.map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="rounded-2xl bg-white px-6 py-5 shadow-[0_10px_30px_rgba(79,114,205,0.12)]"
//                 >
//                   <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">
//                     {stat.label}
//                   </p>
//                   <p className="mt-3 text-2xl font-semibold text-[#1f2a5a]">{stat.value}</p>
//                   <p className="mt-1 text-sm text-[#64748b]">{stat.sublabel}</p>
//                 </div>
//               ))}
//             </section>

//             <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//               {storyCardData.map((card, index) => (
//                 <StoryCard
//                   key={`${card.lessonLabel}-${card.lessonNumber ?? index}-${index}`}
//                   className="h-full"
//                   {...card}
//                 />
//               ))}
//             </section>
//           </main>

//           <aside className="hidden xl:block w-[280px]">
//             <div className="sticky top-28 flex h-[calc(100vh-8rem)] flex-col gap-6">
//               <section className="rounded-2xl bg-white px-6 py-5 shadow-[0_15px_35px_rgba(79,114,205,0.12)]">
//                 <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">
//                   Previous Activity
//                 </h3>
//                 <div className="mt-4 space-y-4">
//                   {recentActivities.map((activity) => (
//                     <div key={activity.title} className="rounded-xl bg-[#f6f7fb] px-4 py-3">
//                       <p className="text-sm font-semibold text-[#1f2a5a]">{activity.title}</p>
//                       <p className="text-xs text-[#64748b]">{activity.timestamp}</p>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               <section className="rounded-2xl bg-white px-6 py-5 shadow-[0_15px_35px_rgba(79,114,205,0.12)]">
//                 <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">
//                   Recommendations
//                 </h3>
//                 <div className="mt-4 space-y-4">
//                   {recommendationItems.map((item) => (
//                     <div key={item.title} className="rounded-xl border border-[#e2e8f0] px-4 py-3">
//                       <p className="text-sm font-semibold text-[#1f2a5a]">{item.title}</p>
//                       <p className="mt-1 text-xs text-[#64748b]">{item.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StoriesPage





import StoryCard from '@/components/ui/StoryCard'
import { storyCardData } from '@/mock/storyCards'
import React from 'react'


const page = () => {
  return (
    <div className='mt-24
                    w-full overflow-x-hidden
                    pl-10 pr-5
                    grid grid-rows-[9rem_30rem_1fr] grid-cols-[auto_22rem] gap-2
    '>
      <section className='row-start-1 row-end-2 col-start-1 col-end-2
                          bg-blue-300 h-full w-full
      '>
        stats
      </section>
      <section className='row-start-1 row-end-3 col-start-2 col-end-3
                          bg-amber-200 h-full w-full
      '>
        recommendations
      </section>
      <section className='row-start-2 row-end-3 col-start-1 col-end-2
                          h-full w-full
                          flex flex-wrap justify-center py-10 pr-10 pl-0 gap-4
      '>
        {storyCardData.map((card, index) => (
            <StoryCard key={index} {...card} />
        ))}
      </section>
    </div>
  )
}

export default page
