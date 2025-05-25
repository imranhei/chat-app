import { Image, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { sendMessage } from "@/redux/chatSlice";
import { Textarea } from "./ui/textarea";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handelImageChanege = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!text.trim() && !imagePreview) {
      alert("Please enter a message or select an image.");
      return;
    }
    try {
      const messageData = {
        text: text.trim(),
        image: imagePreview,
      };

      dispatch(sendMessage(messageData));

      // Reset the input fields
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            className="w-full rounded-lg"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handelImageChanege}
            className="hidden"
          />
          <Button
            type="button"
            className={`hidden sm:flex ${
              imagePreview ? "text-emerald-500" : "text-zinc-500"
            }`}
            onClick={() => fileInputRef.current.click()}
          >
            <Image className="size-4" />
          </Button>
        </div>
        <Button type="submit" disabled={!text.trim() && !imagePreview}>
          <Send className="size-6" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
