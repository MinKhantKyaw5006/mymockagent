
import { isAuthenticated } from '@/lib/actions/auth.actions';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'


const AuthLayout =async ({children}: {children: ReactNode}) => {
   //if user already logged in, going back to signin route will come back to home automatically
    const isUserAuthenticated = await isAuthenticated();
    if(isUserAuthenticated) redirect('/');

  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default AuthLayout 

