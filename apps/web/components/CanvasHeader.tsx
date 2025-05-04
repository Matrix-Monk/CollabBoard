import { useState } from "react";
import {
  Square,
  Circle,
  Triangle,
  Minus,
  Type,
  Image as ImageIcon,
  Hand,
  Undo2,
  Redo2,
  Download,
  Share2,
  Palette,
} from "lucide-react";

export default function CanvasHeader() {
  const [activeTool, setActiveTool] = useState("select");

  const tools = [
    { id: "select", icon: Hand, label: "Select" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "triangle", icon: Triangle, label: "Triangle" },
    { id: "line", icon: Minus, label: "Line" },
    { id: "text", icon: Type, label: "Text" },
    { id: "image", icon: ImageIcon, label: "Image" },
  ];

  const actions = [
    { id: "undo", icon: Undo2, label: "Undo" },
    { id: "redo", icon: Redo2, label: "Redo" },
    { id: "download", icon: Download, label: "Download" },
    { id: "share", icon: Share2, label: "Share" },
  ];

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors relative group ${
                activeTool === tool.id ? "bg-gray-100" : ""
              }`}
              title={tool.label}
            >
              <tool.icon className="h-5 w-5 text-gray-700" />
              <span className="sr-only">{tool.label}</span>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {tool.label}
              </div>
            </button>
          ))}

          <div className="h-6 w-px bg-gray-200 mx-2" />

          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group"
            title="Color Picker"
          >
            <Palette className="h-5 w-5 text-gray-700" />
            <span className="sr-only">Color Picker</span>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Color Picker
            </div>
          </button>
        </div>

        <div className="flex items-center space-x-1">
          {actions.map((action) => (
            <button
              key={action.id}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group"
              title={action.label}
            >
              <action.icon className="h-5 w-5 text-gray-700" />
              <span className="sr-only">{action.label}</span>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {action.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
