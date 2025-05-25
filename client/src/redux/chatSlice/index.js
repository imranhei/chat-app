import { axiosInstance } from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
};

export const getUsers = createAsyncThunk("chat/getUsers", async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axiosInstance.get("/messages/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`/messages/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const state = getState();
      const userId = state.chat.selectedUser?._id;
      if (!userId) {
        return rejectWithValue("No user selected");
      }

      const response = await axiosInstance.post(
        `/messages/send/${userId}`,
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = []; // Reset messages on new selection
    },
    addMessage: (state, action) => {
      if (state.selectedUser._id === action.payload.senderId) {
        state.messages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUserLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUserLoading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isMessagesLoading = false;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.isMessagesLoading = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isMessagesLoading = false;
      });
  },
});

export const { setSelectedUser, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
