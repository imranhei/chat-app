import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "@/redux/authSlice";
import { Eye, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import AuthImagePattern from "@/components/AuthImagePattern";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const valodateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valodateForm()) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(signUp(formData));
    setFormData({
      fullName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <Label htmlFor="">
                <span className="label-text font-medium">Full Name</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5" />
                </div>
                <Input
                  type="text"
                  className="input w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <Label htmlFor="">
                <span className="label-text font-medium">Email</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5" />
                </div>
                <Input
                  type="email"
                  className="input w-full pl-10"
                  placeholder="you@examplae"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <Label htmlFor="">
                <span className="label-text font-medium">Password</span>
              </Label>
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
                  className="input w-full px-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-ping" />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome to our platform"
        subtitle="Join us and start your journey"
      />
    </div>
  );
};

export default SignUpPage;
