import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const ColorPicker = ({ color, onChange, className }: ColorPickerProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn("relative group", className)}>
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            aria-label="Choose color"
          />
          <div
            className="w-10 h-10 rounded-lg border-2 border-white shadow-lg transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: color }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to choose a color</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ColorPicker;

