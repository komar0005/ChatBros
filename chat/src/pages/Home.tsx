import { useLoggedInAuth } from "../context/AuthContext.tsx";
import { Channel, ChannelHeader, ChannelList, ChannelListMessengerProps, Chat, LoadingIndicator, MessageInput, MessageList, useChatContext, Window } from "stream-chat-react";
import { Button } from "../components/Button.tsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {user, streamChat} = useLoggedInAuth()
  if(streamChat == null) return <LoadingIndicator />
  return <Chat client={streamChat}>
    <ChannelList List={Channels} sendChannelsToList filters={{members: {$in: [ user.id ]}}} />
    <Channel>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>

}
export default Home

const Channels = ({loadedChannels}: ChannelListMessengerProps) => {
  const {setActiveChannel, channel: activeChannel} = useChatContext()
  const navigate = useNavigate()
  const {logout} =useLoggedInAuth()

  return <div className='w-60 flex-col flex gap-4 m-3 h-full'>
    <Button onClick={() => navigate('/channel/new')}>
      New Conversation
    </Button>
    <hr className='border-gray-400' />
    {loadedChannels != null && loadedChannels?.length > 0 ? loadedChannels.map(channel => {
      const isActive = channel === activeChannel
      const extraClasses = isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 bg-gray-100'
      return <button onClick={() => setActiveChannel(channel)}
        disabled={isActive}
        className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
        key={channel.id}>
        {channel.data?.image && <img src={channel.data.image}
            alt={channel.data.name}
            className='w-10 h-10 rounded-full object-center object-cover' />}
        <p className='text-ellipsis overflow-hidden whitespace-nowrap'>
          {channel.data?.name || channel.id}
        </p>
      </button>
    }) : 'No conversation'}
    <Button onClick={() => logout.mutate()} disabled={logout.isPending} className='border-gray-500 mt-auto'>
      Logout
    </Button>
  </div>
}