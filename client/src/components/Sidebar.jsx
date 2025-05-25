import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, getUsers } from "@/redux/chatSlice";
import { Users } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { users, selecedUser, isUserLoading } = useSelector(
    (state) => state.chat
  );
  const { onlineUsers } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return (
    <aside className="h-full w-20 lg:w-72 bg-white border-r border-gray-300 flex flex-col transition-all duration-200">
      <div className="border-b border-gray-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            className={`flex items-center px-3 py-1 gap-2 w-full hover:bg-gray-100 transition-colors duration-200 ${
              selecedUser?._id === user._id
                ? "bg-gray-300 ring-1 ring-gray-300"
                : ""
            }`}
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user?.profilePic || null}
                alt={user?.fullName}
                className="size-12 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-1 right-1 size-2.5 bg-green-500 rounded-full ring-1 ring-zinc-600"></span>
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-rose-500">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-500">Online</span>
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
