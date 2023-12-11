import { FullScreenCard } from "../../components/FullScreenCard.tsx";
import { Input } from "../../components/Input.tsx";
import { Button } from "../../components/Button.tsx";
import { Link } from "../../components/Link.tsx";
import { FormEvent, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { SelectInstance } from "react-select";
import { useLoggedInAuth } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import 'crypto'

const NewChannel = () => {
  const navigate = useNavigate()
  const {streamChat, user} = useLoggedInAuth()
  const createChannel = useMutation({
    mutationFn: ({ name, membersIds, imageUrl }: { name: string, membersIds: string[], imageUrl?: string }) => {
      if (streamChat == null) {
        throw Error('No Connected');
      }
      return streamChat.channel('messaging',crypto.randomUUID(), {
        name,
        image: imageUrl,
        members: [user.id, ...membersIds],
      }).create();
    },
    onSuccess() {
      navigate('/');
    },
    onError: (error) => {
      console.error('Error creating channel:', error);
    },
  });

  const nameRef = useRef<HTMLInputElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)
  const membersIdRef = useRef<SelectInstance<{label: string, value: string}> | null>(null)
  const users = useQuery({
    queryKey: [ 'stream', 'users' ],
    queryFn: () => streamChat!.queryUsers({id: {$ne: user.id}}, {name: 1}),
    enabled: streamChat != null
  })
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    const name = nameRef.current?.value
    const imageUrl = imageUrlRef.current?.value
    const memberIds = membersIdRef.current?.getValue()
    if(name == null || name === '' || memberIds == null || memberIds.length === 0) {
      return
    }
    createChannel.mutate({name, membersIds: memberIds.map(option => option.value), imageUrl: imageUrl})
  }
  return <FullScreenCard>
    <FullScreenCard.Body>
      <h1 className='text-3xl font-semibold text-center mb-4'>New Conversation</h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
        <div className='flex justify-start flex-col gap-2'>
          <label htmlFor='name' className='text-gray-500'>name</label>
          <Input type='text' placeholder='Jhon Smith' id='name' pattern='\S*' required ref={nameRef} />
        </div>
        <div className='flex justify-start flex-col gap-2'>
          <label htmlFor='imageUrl' className='text-gray-500'>Image Url</label>
          <Input type='text' id='imageUrl' ref={imageUrlRef} />
        </div>
        <div className='flex justify-start flex-col gap-2'>
          <label htmlFor='members' className='text-gray-500'>Members</label>
          <Select ref={membersIdRef}
            id='members'
            required
            classNames={{container: () => 'w-full'}}
            isLoading={users.isLoading}
            options={users.data?.users?.map(user => ({
              value: user.id,
              label: user.name || user.id
            })) || []} isMulti />
        </div>
        <Button disabled={createChannel.isPending} type='submit'>
          {createChannel.isPending ? 'Loading...' : 'Sign Up'}
        </Button>
      </form>
    </FullScreenCard.Body>
    <FullScreenCard.BelowCard>
      <Link to='/'>Back</Link>
    </FullScreenCard.BelowCard>
  </FullScreenCard>
}
export default NewChannel