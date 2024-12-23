"use client";

import React, { useState } from "react";
import { Check, Copy, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PaletteDisplayProps {
  colors: string[];
  onDelete: () => void;
}

const PaletteDisplay = ({ colors, onDelete }: PaletteDisplayProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    toast.success("Color copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="animate-fade-in space-y-4">
      <div className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white">
        <div className="flex h-24 md:h-32">
          {colors.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="relative flex-1 transition-all duration-200 group-hover:flex-[1.2] cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color, index)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/10 backdrop-blur-sm transition-all duration-200">
                    {copiedIndex === index ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to copy {color}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 -mt-2">
        <Button
          size="icon"
          variant="ghost"
          className="bg-white/80 hover:bg-white shadow-sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="bg-white/80 hover:bg-white text-red-500 hover:text-red-600 shadow-sm"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {showPreview && (
        <div className="p-6 rounded-lg border border-zinc-200 bg-white space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold" style={{ color: colors[0] }}>Preview Example</h3>
            <p className="text-base" style={{ color: colors[1] }}>
              This is how your text might look with these colors. The preview helps you visualize the palette in a real-world context.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.slice(2, 5).map((color, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded transition-transform hover:scale-105"
                style={{ backgroundColor: color, color: '#fff' }}
              >
                Button {index + 1}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {colors.slice(5).map((color, index) => (
              <div
                key={index}
                className="h-12 rounded transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaletteDisplay;