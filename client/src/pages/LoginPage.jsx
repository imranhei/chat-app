import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import { Eye, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(login(formData));
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mt-2">Login</h1>
            <p className="text-base-content/60">Welcome back! Please login.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5" />
                </div>
                <Input
                  type="email"
                  className="pl-10"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5" />
                </div>
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-30 cursor-pointer"
                >
                  <Eye className="size-5" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="px-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10"
              >
                {showPassword ? <Eye /> : <Eye />}
              </button>
            </div>
            <Button type="submit" disabled={isLoggingIn} className="w-full">
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
