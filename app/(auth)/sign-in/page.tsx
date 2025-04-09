import AuthForm from '@/components/AuthForm'
import { isAuthenticated } from '@/lib/actions/auth.actions';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async  () => {

  //it kind of worked
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect('/'); // ← this will work consistently

  return <AuthForm type="sign-in"/>
}
export default page
