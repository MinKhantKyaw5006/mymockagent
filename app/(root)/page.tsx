import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
//import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import { getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action'


const Homepage = async () => {
  const user = await getCurrentUser();  

    // Early return if there's no user or user id
    if (!user?.id) {
      return <p>User not found or not signed in</p>;
    }

  //parallel request
  const [userInterviews,latestInterviews] = await Promise.all([
    //await getInterviewByUserId(user?.id!),  //original version  with ! included
    await getInterviewByUserId(user?.id),
    await getLatestInterviews({userId: user?.id}),
  ]);
  //const userInterviews = await getInterviewByUserId(user?.id!);
  //const latestInterviews = await getLatestInterviews({userId: user?.id}); 

  

  //orignal versions
  // const hasPastInterviews = userInterviews?.length > 0;
  // const hasUpcomingInterviews = latestInterviews?.length > 0;

   // Safely check for interviews arrays length
   const hasPastInterviews = (userInterviews?.length || 0) > 0;
   const hasUpcomingInterviews = (latestInterviews?.length || 0) > 0;
   


  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Get Interview-Ready with AI-powered Practice & feedback </h2>
        <p className='text-lg'>Practice on real interview questions & get instant feedback </p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">Start an Interview</Link>
        </Button>
      </div>
      <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden"/>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>
      <div className='interviews-section'>
        {
          hasPastInterviews?(
            userInterviews?.map((interview) =>(
              <InterviewCard {...interview} key ={interview.id}/>
            ))): (
              <p>There are no new interviews available</p>
            )
          // dummyInterviews.map((interview)=>())  we dnt need to use dummy data anymore
        }
      </div>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
      <div className='interviews-section'>
      {
          hasUpcomingInterviews?(
            latestInterviews?.map((interview) =>(
              <InterviewCard {...interview} key ={interview.id}/>
            ))): (
              <p>You haven&apos;t taken interviews yet</p>
            )
          // dummyInterviews.map((interview)=>())  we dnt need to use dummy data anymore
        }
      </div>
      {/* <p>There haven&apos;t taken interviews yet</p> */}
    </section>
    </>
  )
}

export default Homepage
