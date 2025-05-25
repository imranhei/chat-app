import { io } from "socket.io-client";
import { setOnlineUsers } from "@/redux/authSlice";
import { addMessage } from "@/redux/chatSlice";

let socket = null;

export const connectSocket = (userId, dispatch) => {
  if (!socket || !socket.connected) {
    socket = io(
      import.meta.env.MODE === "development"
        ? `${import.meta.env.VITE_API_URL}`
        : "/",
      {
        query: { userId },
      }
    );

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    socket.on("getOnlineUsers", (userIds) => {
      // You can dispatch to Redux if needed
      console.log("Online users:", userIds);
      dispatch(setOnlineUsers(userIds));
    });
  }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected");
    socket = null;
  }
};
