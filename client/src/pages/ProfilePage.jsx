import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Camera, User } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      dispatch(updateProfile({ profilePic: base64Image })).then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
          alert("✅ Profile updated successfully");
        } else if (
          res.meta.requestStatus === "rejected" &&
          res.payload?.message === "Forbidden"
        ) {
          alert("🚫 Forbidden: You are not authorized to update the profile");
        } else if (
          res.meta.requestStatus === "rejected" &&
          res.payload?.message
        ) {
          alert(`❌ Failed: ${res.payload.message}`);
        } else {
          alert("❌ Failed to update profile");
        }
      });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-gray-200 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 rounded-full ring-2">
                <AvatarImage
                  src={selectedImage || authUser?.profilePic}
                  alt="Profile Picture"
                  className="rounded-full object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <label
                htmlFor="file-upload"
                className={`absolute bottom-0 right-0 cursor-pointer bg-gray-300 rounded-full transition-all duration-200 p-2 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-4 h-4 text-gray-700" />
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile
                ? "Updating..."
                : "Click to change profile picture"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="size-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-200 rounded-lg border border-gray-400">
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="size-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-200 rounded-lg border border-gray-400">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
