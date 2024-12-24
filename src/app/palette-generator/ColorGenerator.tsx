"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Wand2 } from 'lucide-react'
import { useState } from "react"
import ColorPicker from "./ColorPicker"
import PaletteDisplay from "./PaletteDisplay"

const ColorGenerator = () => {
  const [hexInput, setHexInput] = useState("")
  const [colors, setColors] = useState(["#9b87f5"])
  const [palettes, setPalettes] = useState<string[][]>([])
  const [error, setError] = useState("")

  const isValidHex = (hex: string) => {
    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
  }

  const addColorFromHex = () => {
    const formattedHex = hexInput.startsWith('#') ? hexInput : `#${hexInput}`
    if (isValidHex(formattedHex)) {
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
    const baseColors = [...colors]
    const newPalette = [
      ...baseColors,
      ...baseColors.map((color, i) => shiftHue(color, 30 + (i * 15))),
      ...baseColors.map((color) => adjustLightness(color, 20)),
      ...baseColors.map((color) => adjustLightness(color, -20)),
    ].slice(0, 8)

    setPalettes((prev) => [newPalette, ...prev])
  }

  const deletePalette = (index: number) => {
    setPalettes((prev) => prev.filter((_, i) => i !== index))
  }

  const shiftHue = (hex: string, degrees: number): string => {
    const hue = parseInt(hex.slice(1), 16)
    const shifted = (hue + degrees) % 360
    return `#${Math.floor(shifted).toString(16).padStart(6, "0")}`
  }

  const adjustLightness = (hex: string, amount: number): string => {
    const color = parseInt(hex.slice(1), 16)
    const adjusted = Math.max(0, Math.min(0xffffff, color + amount * 0x1000))
    return `#${Math.floor(adjusted).toString(16).padStart(6, "0")}`
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 md:px-6 py-8">
      <div className="w-full space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">Color Palette Generator</h1>
          <p className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto">
            Enter hex codes or choose colors to create your perfect palette
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          <div className="space-y-4 pb-7 pt-5">
            <div className="flex justify-between items-center xs:flex-col xs:items-center">
              <h2 className="text-lg font-semibold text-zinc-900">Choose Your Colors</h2>
              <Button
                onClick={generatePalette}
                className="gap-2"
                size="sm"
              >
                <Wand2 className="w-4 h-4" />
                Generate Palette
              </Button>
            </div>
            
            {/* Hex Input */}
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

              <div className="flex justify-center gap-3">
                {colors.map((color, index) => (
                  <div key={index} className="relative group">
                    <ColorPicker
                      color={color}
                      onChange={(newColor) => {
                        const newColors = [...colors]
                        newColors[index] = newColor
                        setColors(newColors)
                      }}
                    />
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-5 w-5 rounded-full"
                        onClick={() => removeColorPicker(index)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                {colors.length < 3 && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-12 w-12 rounded-lg border-dashed"
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
                <PaletteDisplay 
                  key={index} 
                  colors={palette} 
                  onDelete={() => deletePalette(index)} 
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 rounded-lg bg-zinc-50/50">
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
                      then click &quot;Generate Palette&quot; to create your color combinations.
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
