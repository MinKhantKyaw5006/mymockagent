// import { getCurrentUser } from '@/lib/actions/auth.actions';
// import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
// import { redirect } from 'next/navigation';
// import React from 'react'

// const page = async ({params}: RouteParams) => {
//   const {id} = await params;
//   const user = await getCurrentUser();

//   const interview = await getInterviewById(id);
//   if(!interview) redirect('/');

//   const feedback = await getFeedbackByInterviewId({
//     interviewId: id,
//     userId: user?.id!,
//   })

//   console.log(feedback);
//   return (
//     <div>
//       feedback
//     </div>
//   )
// }

// export default page


// //http://localhost:3000/interview/PSDRvY4Pt5wEA602tRKh/feedback

import { getCurrentUser } from '@/lib/actions/auth.actions';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import { RouteParams } from '@/types/index'; // make sure you have this or adjust accordingly

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button'; // adjust path if needed

const page = async ({ params }: { params: RouteParams }) => {
  const { id } = params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect('/');

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <section className="section-feedback px-6 py-10 max-w-4xl mx-auto">
      <div className="flex flex-row justify-center mb-6">
        <h1 className="text-4xl font-semibold text-center">
          Feedback on the Interview –{' '}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center mb-6">
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{' '}
              <span className="text-primary-200 font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format('MMM D, YYYY h:mm A')
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <hr className="mb-6" />

      <p className="mb-8">{feedback?.finalAssessment}</p>

      <div className="flex flex-col gap-4 mb-10">
        <h2 className="text-xl font-semibold">Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mb-10">
        <h3 className="text-lg font-semibold">Strengths</h3>
        {feedback?.strengths?.length ? (
          <ul className="list-disc list-inside">
            {feedback.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        ) : (
          <p>No strengths were highlighted.</p>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-10">
        <h3 className="text-lg font-semibold">Areas for Improvement</h3>
        <ul className="list-disc list-inside">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link href={`/interview/${id}`} className="flex w-full justify-center">
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default page;
