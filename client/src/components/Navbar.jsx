import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthState } from "@/redux/authSlice";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  return (
    <header className="border-b fixed w-full top-0 z-40 shadow bg-gray-200">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="text-sm flex gap-2 font-semibold text-gray-700 hover:text-gray-900"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="text-sm flex gap-2 font-semibold text-gray-700 hover:text-gray-900"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  onClick={() => {
                    dispatch(resetAuthState());
                  }}
                  className="text-sm flex gap-2 font-semibold text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
