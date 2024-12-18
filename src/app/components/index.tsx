'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { generatePalette } from './color-config.service'
import { ColorSelectorBar } from './selector-bar/ColorSelectorBar'
import { PreviewSection } from './preview/PreviewSection'
import { PaletteSheet } from './full-palette/PaletteSheet'


export default function ColorPaletteGenerator() {
  const [colors, setColors] = useState(['#3B82F6', '#10B981', '#F59E0B'])
  const [palette, setPalette] = useState<string[]>([])
  const [view, setView] = useState<'web' | 'mobile'>('web')
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  useEffect(() => {
    setPalette(generatePalette(colors[0], colors[1], colors[2]))
  }, [colors])

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-[#37352F]">Lluxui colors</h1>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Create beautiful and harmonious color palettes for your projects. Select three primary colors to generate a complete palette.
          </p>
        </motion.div>

        <ColorSelectorBar
          colors={colors}
          onColorChange={updateColor}
          onGeneratePalette={() => setIsPaletteOpen(true)}
          view={view}
          onViewChange={setView}
        />

        <motion.div layout className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <PreviewSection colors={palette} view={view} />
        </motion.div>
      </div>
      <PaletteSheet colors={palette} isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </div>
  )
}

