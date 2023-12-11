import { Input } from "../components/Input.tsx";
import { FormEvent, useRef } from "react";
import { Button } from "../components/Button.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const Signup = () => {
  const {signup} = useAuth()
  const userNameRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(signup.isPending) return;
    const userName = userNameRef.current?.value
    const name = nameRef.current?.value
    const imageUrl = imageUrlRef.current?.value
    if(userName == null || userName === "" || name == null || name === "") {
      return
    }
    signup.mutate({id: userName, name, imageUrl: imageUrl})
  }
  return <>
    <h1 className='text-3xl font-semibold text-center mb-4'>Signup</h1>
    <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
      <div className='flex justify-start flex-col gap-2'>
        <label htmlFor='userName' className='text-gray-500'>User name</label>
        <Input type='text' placeholder='jhonsmith0005' id='userName' pattern='\S*' required ref={userNameRef} />
      </div>
      <div className='flex justify-start flex-col gap-2'>
        <label htmlFor='name' className='text-gray-500'>Name</label>
        <Input type='text' placeholder='Jhon Smith' id='name' required ref={nameRef} />
      </div>
      <div className='flex justify-start flex-col gap-2'>
        <label htmlFor='imageUrl' className='text-gray-500'>Image Url</label>
        <Input type='text' id='imageUrl' ref={imageUrlRef} />
      </div>
      <Button disabled={signup.isPending} type='submit'>
        {signup.isPending ? 'Loading...' : 'Sign Up'}
      </Button>
    </form>
  </>
}
export default Signup