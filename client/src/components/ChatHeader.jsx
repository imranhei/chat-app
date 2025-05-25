import React from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/chatSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);

  return (
    <div className="p-2.5 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 rounded-full overflow-hidden">
            <AvatarImage
              src={selectedUser?.profilePic || null}
              alt={selectedUser?.fullName}
            />
            <AvatarFallback className="bg-gray-300 text-gray-700">
              {selectedUser?.fullName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="fent-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-rose-500">
              {onlineUsers.includes(selectedUser._id) ? (
                <span className="text-green-500">Online</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        <button onClick={() => dispatch(setSelectedUser(null))}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
