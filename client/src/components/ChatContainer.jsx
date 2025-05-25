import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "@/redux/chatSlice";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);
  const { messages, isMessagesLoading, selectedUser } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (messageEndRef.current && messages?.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // if (isMessagesLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`${
                message.senderId === authUser._id ? "self-end " : "self-start"
              }`}
              ref={messageEndRef}
            >
              <div
                className={`flex ${
                  message.senderId === authUser._id ? "flex-row-reverse" : ""
                } gap-2`}
              >
                <Avatar className="w-6 h-6 rounded-full ring-2 mt-0.5">
                  <AvatarImage
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic
                        : selectedUser.profilePic
                    }
                    alt="Profile Picture"
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div
                  className={`${
                    message.senderId === authUser._id
                      ? "bg-blue-100"
                      : "bg-gray-200"
                  } relative p-2 rounded-sm min-w-20 max-w-sm pb-5`}
                >
                  {message?.image && (
                    <img src={message.image} alt="" className="pb-2" />
                  )}
                  <p className="text-sm leading-4">{message.text}</p>
                  <span className={`absolute bottom-0.5 text-[10px] text-gray-500 ${message.senderId === authUser._id ? "right-2" : "left-2"}`}>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                  {/* <span
                    className={`absolute ${
                      message.senderId._id === authUser._id
                        ? "right-0"
                        : "left-0"
                    } -bottom-3 text-[10px] leading-3 text-gray-500 w-[50px]`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
