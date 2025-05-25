import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React from "react";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content:
      "Hey! How's it going?",
    isSent: false,
  },
  {
    id: 2,
    content:
      "Just finished a meeting with the team. Excited about the progress we're making!",
    isSent: true,
  },
];

const SettingsPage = () => {
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-gxl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Theme</h1>
          <p className="text-sm text-gray-500">
            Choose a theme for your interface.
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-3">Preview</h3> 
        <div className="rounded-xl border border-gray-300 overflow-hidden bg-gray-100 shadow-lg">
          <div className=" bg-gray-200"> 
            <div className="mx-auto">
              <div className="bg-gray-100 shadow-sm overflow-hidden"> 
                <div className="px-4 py-3 border-b border-gray-300 bg-gray-100"> 
                  <div className="flex items-center gap-3"> 
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium"> 
                      J 
                    </div>
                  </div> 
                  <h3 className="font-medium text-sm">John Doe</h3>
                  <p className="text-xs text-gray-content/70">Online</p> 
                </div> 
              </div> 
            </div>
            <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-gray-100"> 
              {PREVIEW_MESSAGES.map((message) => ( 
                <div 
                  key={message.id} 
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[80%] rounded-xl p-3 shadow-sm 
                      ${message.isSent? "bg-primary text-white": "bg-gray-200"}`}
                  >
                    <p className="text-sm">{message.content}</p> 
                    <p 
                      className={`text-[10px] mt-1.5 ${message.isSent ? "text-gray-400": "text-gray-500"}`} >
                      12:00 PM 
                    </p> 
                  </div> 
                </div> 
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-300 bg-gray-100"> 
            <div className="flex gap-2"> 
              <input 
                type="text" 
                className="input input-bordered flex-1 text-sm h-10 rounded-lg px-4" 
                placeholder="Type a message..." 
                value="This is a preview" 
                readOnly 
                /> 
              <Button className="h-10 min-h-0"> 
                <Send size={18} /> 
              </Button> 
            </div> 
          </div> 
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
