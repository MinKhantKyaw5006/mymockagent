  "use client"
  import React from 'react'
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"
  import { z } from "zod"

  import { Button } from "@/components/ui/button"
  import {Form} from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import Image from 'next/image'
  import Link from 'next/link'
  import { toast } from 'sonner'
  import FormField from './FormField'
  import { useRouter } from 'next/navigation'





  const authFormSchema = (type: FormType) =>{
    return z.object({
      name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
      email: z.string().email(),
      password: z.string().min(3),
    })
  }

  const AuthForm = ({type}:{type: FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
      // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })
  
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      try{
        if(type === 'sign-up'){
          toast.success('Account created Successfully, please Sign in!')
          router.push('/sign-in')
          // console.log('SIGN UP', values);
        } else{
          toast.success('Sign in Successful!')
          router.push('/')
          //console.log('SIGN IN', values);
        }
      }catch(error){
        console.log(error);
        toast.error(`ther was an error: ${error}`);
      }
    }

    const isSignIn = type ==='sign-in';

    return (

  <div className="w-full h-screen flex justify-center items-center">
    <div className="w-full max-w-md p-6 rounded-lg border bg-white shadow-sm dark:bg-zinc-900">
          <div className='flex flex-row gap-2 justify-center'>
              <Image src="/logo.svg" alt="logo" height={32} width={38}/>
              <h2 className='text-pretty-100'>My Mock Agent</h2>
          </div>
          <h3 className="text-center mt-4">Practice Job Interview with AI</h3>

          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
          {!isSignIn && 
          <FormField control={form.control} name="name" label="name" placeholder='Your Name'/>}
          <FormField control={form.control} name="email" label="Email" placeholder='Your Email Address' type="email"/>
          <FormField control={form.control} name="password" label="Password" placeholder='Enter your Password' type="password"/>
      
        <Button type="submit" className="btn">
          {isSignIn ? 'Sign In' : 'Create an account'}
        </Button>
      </form>
      <p className='text-center mt-6'>
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link href={!isSignIn ? '/sign-in': '/sign-up'} className='font-bold text-primary-color ml-1'>
          {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
          
      </p>
    </Form>
      </div>

  </div>

    
    )
  }

  export default AuthForm

  {/* <div className="card-border lg:min-w-[566px]">
      <div className='flex flex-col gap-6 card py-14 px-10'> */}