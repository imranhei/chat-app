import ChatContainer from '@/components/ChatContainer'
import NoChatSelected from '@/components/NoChatSelected'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { selectedUser } = useSelector((state) => state.chat)
  return (
    <div className='h-screen bg-gray-200 w-full'>
      <div className="flex w-full items-center justify-center pt-20 px-4">
        <div className="bg-gray-100 rounded-lg shadow-lg w-full max-w-5xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
