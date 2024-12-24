'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, Wand2 } from 'lucide-react'
import { useState } from "react"
import ColorPicker from "./ColorPicker"
import PaletteDisplay from "./PaletteDisplay"
import { ColorService, HarmonyType, WebColorPalette } from "./service/ColorService"
import WebPaletteVisualizer from "./WebPaletteVisualizer"

const ColorGenerator = () => {
  const [hexInput, setHexInput] = useState("")
  const [colors, setColors] = useState(["#9b87f5"])
  const [palettes, setPalettes] = useState<(string[] | WebColorPalette)[]>([])
  const [error, setError] = useState("")
  const [harmonyType, setHarmonyType] = useState<HarmonyType>('analogous')

  const addColorFromHex = () => {
    const formattedHex = ColorService.formatHex(hexInput)
    if (ColorService.isValidHex(formattedHex)) {
      if (colors.length < 3) {
        setColors([...colors, formattedHex])
        setHexInput("")
        setError("")
      } else {
        setError("Maximum 3 colors allowed")
      }
    } else {
      setError("Invalid hex color")
    }
  }

  const addColorPicker = () => {
    if (colors.length < 3) {
      setColors([...colors, "#E5DEFF"])
    }
  }

  const removeColorPicker = (index: number) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index)
      setColors(newColors)
    }
  }

  const generatePalette = () => {
    const newPalette = ColorService.generateHarmony(colors, harmonyType)
    setPalettes((prev) => [newPalette, ...prev])
  }

  const deletePalette = (index: number) => {
    setPalettes((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 sm:px-4 py-8">
    <div className="w-full space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900">Color Palette Generator</h1>
        <p className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto">
          Enter hex codes or choose colors to create your perfect palette
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        <div className="space-y-4 pb-7 pt-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-zinc-900">Choose Your Colors</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <Select value={harmonyType} onValueChange={(value: HarmonyType) => setHarmonyType(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select harmony" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                  <SelectItem value="tetradic">Tetradic</SelectItem>
                  <SelectItem value="monochromatic">Monochromatic</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={generatePalette}
                className="gap-2 w-full sm:w-auto"
                size="sm"
              >
                <Wand2 className="w-4 h-4" />
                Generate Palette
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 items-center">
            <div className="flex-1 relative w-full">
              <Input
                value={hexInput}
                onChange={(e) => {
                  setHexInput(e.target.value)
                  setError("")
                }}
                placeholder="(e.g., #FF0000)"
                className="w-full text-xs"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={addColorFromHex}
                disabled={colors.length >= 3}
              >
                Add Color
              </Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex flex-wrap justify-center gap-3">
              {colors.map((color, index) => (
                <div key={index} className="relative">
                  <ColorPicker
                    color={color}
                    onChange={(newColor: string) => {
                      const newColors = [...colors];
                      newColors[index] = newColor;
                      setColors(newColors);
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg"
                  />
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-6 w-6 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-all duration-200"
                      onClick={() => removeColorPicker(index)}
                      aria-label="Remove color"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              {colors.length < 3 && (
                <Button
                  size="icon"
                  variant="outline"
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg border-dashed"
                  onClick={addColorPicker}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {palettes.length > 0 ? (
            palettes.map((palette, index) => (
              Array.isArray(palette) ? (
                <PaletteDisplay 
                  key={index} 
                  colors={palette} 
                  onDelete={() => deletePalette(index)} 
                />
              ) : (
                <WebPaletteVisualizer
                  key={index}
                  palette={palette}
                  onDelete={() => deletePalette(index)}
                />
              )
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-dashed border-zinc-200 rounded-lg bg-zinc-50/50">
              <div className="flex flex-col items-center max-w-md text-center space-y-4">
                <div className="p-3 rounded-full bg-zinc-100">
                  <Wand2 className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Start Creating
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Choose up to three colors using the color pickers or enter hex codes, 
                    then select a harmony type and click &quot;Generate Palette&quot; to create your color combinations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default ColorGenerator
