import { axiosInstance } from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { disconnectSocket } from "@/lib/socket";

const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axiosInstance.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    }
  } catch (error) {
    console.error("Error checking auth:", error);
    throw error;
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    return rejectWithValue(error.response.data);
  }
});

// export const logout = createAsyncThunk("auth/logout", async () => {
//   try {
//     await axiosInstance.post("/auth/logout");
//     disconnectSocket(); // Disconnect the socket when logging out
//   } catch (error) {
//     console.error("Error logging out:", error);
//     throw error;
//   }
// });

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return rejectWithValue(error.response.data);
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profilePic, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axiosInstance.put(
          "/auth/update-profile",
          profilePic,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    resetAuthState: (state) => {
      state.authUser = null;
      state.onlineUsers = [];
      localStorage.removeItem("token");
      disconnectSocket(); // Disconnect the socket when resetting auth state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload; // Assuming backend returns user data
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })
      .addCase(signUp.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload; // Assuming backend returns user data
        localStorage.setItem("token", action.payload.token); // Store token in local storage
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSigningUp = false;
        console.error("Sign up error:", action.payload);
      })
      // .addCase(logout.pending, (state) => {
      //   state.isLoggingIn = true;
      // })
      // .addCase(logout.fulfilled, (state) => {
      //   state.isLoggingIn = false;
      //   state.authUser = null;
      // })
      // .addCase(logout.rejected, (state, action) => {
      //   state.isLoggingIn = false;
      //   state.onlineUsers = [];
      // })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
        localStorage.setItem("token", action.payload.token); // Store token in local storage
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        console.error("Login error:", action.payload);
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload; // Assuming backend returns updated user data
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false;
        console.error("Update profile error:", action.payload);
      });
  },
});

export const { setOnlineUsers, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
