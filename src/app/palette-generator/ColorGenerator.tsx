"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import PaletteDisplay from "./PaletteDisplay";

const ColorGenerator = () => {
  const [hexColor, setHexColor] = useState("#9b87f5");
  const [colors, setColors] = useState(["#9b87f5", "#E5DEFF", "#F97316"]);
  const [palettes, setPalettes] = useState<string[][]>([]);

  const generatePalette = () => {
    const baseColors = [...colors];
    const newPalette = [
      baseColors[0],
      baseColors[1],
      baseColors[2],
      shiftHue(baseColors[0], 30),
      shiftHue(baseColors[1], 45),
      shiftHue(baseColors[2], 60),
      adjustLightness(baseColors[0], 20),
      adjustLightness(baseColors[1], -20),
    ];
    setPalettes((prev) => [newPalette, ...prev]);
  };

  const deletePalette = (index: number) => {
    setPalettes((prev) => prev.filter((_, i) => i !== index));
  };

  const shiftHue = (hex: string, degrees: number): string => {
    const hue = parseInt(hex.slice(1), 16);
    const shifted = (hue + degrees) % 360;
    return `#${Math.floor(shifted).toString(16).padStart(6, '0')}`;
  };

  const adjustLightness = (hex: string, amount: number): string => {
    const color = parseInt(hex.slice(1), 16);
    const adjusted = Math.max(0, Math.min(0xFFFFFF, color + amount * 0x1000));
    return `#${Math.floor(adjusted).toString(16).padStart(6, '0')}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 md:px-6">
      <div className="w-full space-y-8 md:space-y-12">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
            Color Palette Generator
          </h1>
          <p className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto">
            Choose your base colors or enter hex codes to generate beautiful color combinations
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative">
          <div className="relative flex-1 w-full">
            <Input
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value)}
              placeholder="#000000"
              className="pr-12 text-sm bg-white border-zinc-200 h-12"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900"
              onClick={generatePalette}
            >
              <Wand2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-3">
            {colors.map((color, index) => (
              <ColorPicker
                key={index}
                color={color}
                onChange={(newColor) => {
                  const newColors = [...colors];
                  newColors[index] = newColor;
                  setColors(newColors);
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
        {palettes.length > 0 ? (
            palettes.map((palette, index) => (
                <PaletteDisplay 
                key={index} 
                colors={palette} 
                onDelete={() => deletePalette(index)} 
                />
            ))
            ) : (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-200 rounded-lg bg-zinc-50/50">
                <div className="flex flex-col items-center max-w-md text-center space-y-4">
                  <div className="p-3 rounded-full bg-zinc-100">
                    <Wand2 className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      Genera tu Primera Paleta
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Comienza de cualquiera de estas formas:
                    </p>
                    <ul className="text-sm text-zinc-500 space-y-1">
                      <li>• Ingresa un código de color hex en el campo de arriba</li>
                      <li>• Haz clic en los cuadrados de color para elegir tus colores base</li>
                      <li>• Haz clic en el icono de la varita para generar una paleta</li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    <div className="w-8 h-8 rounded bg-[#9b87f5] animate-pulse" />
                    <div className="w-8 h-8 rounded bg-[#E5DEFF] animate-pulse delay-100" />
                    <div className="w-8 h-8 rounded bg-[#F97316] animate-pulse delay-200" />
                    <div className="w-8 h-8 rounded bg-[#A78BFA] animate-pulse delay-300" />
                    <div className="w-8 h-8 rounded bg-[#6D28D9] animate-pulse delay-400" />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ColorGenerator;
