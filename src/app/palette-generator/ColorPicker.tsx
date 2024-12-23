import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const ColorPicker = ({ color, onChange, className }: ColorPickerProps) => {
  return (
    <div className={cn("relative group", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label="Choose color"
            />
            <div
              className="w-10 h-10 rounded-lg border-2 border-white shadow-lg transition-all duration-200 group-hover:scale-105"
              style={{ backgroundColor: color }}
            />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4 text-zinc-500" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to choose a color</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ColorPicker;