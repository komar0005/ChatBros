import { Input } from "../components/Input.tsx";
import { FormEvent, useRef } from "react";
import { Button } from "../components/Button.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {login, user} = useAuth()
  const userNameRef = useRef<HTMLInputElement>(null)
  if(user != null) return <Navigate to='/' />

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(login.isPending) return;
    const userName = userNameRef.current?.value

    if(userName == null || userName === "") {
      return
    }
    login.mutate(userName)
  }
  return <>
    <h1 className='text-3xl font-semibold text-center mb-4'>Login</h1>
    <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
      <div className='flex justify-start flex-col gap-2'>
        <label htmlFor='userName' className='text-gray-500'>User name</label>
        <Input type='text' placeholder='jhonsmith0005' id='userName' required ref={userNameRef} />
      </div>
      <Button disabled={login.isPending} type='submit'>
        {login.isPending ? 'Loading...' : 'Sign Up'}
      </Button>
    </form>
  </>
}
export default Login