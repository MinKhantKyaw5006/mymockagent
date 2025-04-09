import { isAuthenticated } from '@/lib/actions/auth.actions'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const Rootlayout = async ({children} : {children: ReactNode}) => {
  //if authenticated already go to home or else go back sign in
  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className='flex items-cennter gap-2'>
        <Image src="/logo.svg" alt="logo" width={38} height={32}/>
        <h2 className='text-primary-100'>My Mock Agent</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default Rootlayout
