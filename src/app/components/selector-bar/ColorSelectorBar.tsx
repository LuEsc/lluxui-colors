'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ColorCard } from '../color-picker/ColorPicker'

interface ColorSelectorBarProps {
  colors: string[]
  onColorChange: (index: number, color: string) => void
  onGeneratePalette: () => void
  view: 'web' | 'mobile'
  onViewChange: (view: 'web' | 'mobile') => void
}

export function ColorSelectorBar({ colors, onColorChange, onGeneratePalette, view, onViewChange }: ColorSelectorBarProps) {
  const [isViewOpen, setIsViewOpen] = useState(false)

  return (
    <motion.div
      layout
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        {colors.map((color, index) => (
          <ColorCard
            key={index}
            title={`Color ${index + 1}`}
            color={color}
            onChange={(newColor) => onColorChange(index, newColor)}
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onGeneratePalette}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm"
        >
          Generate Full Palette
        </button>
        <div className="relative">
          <button
            onClick={() => setIsViewOpen(!isViewOpen)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center"
          >
            {view === 'web' ? 'Web View' : 'Mobile View'}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {isViewOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => { onViewChange('web'); setIsViewOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Web View
              </button>
              <button
                onClick={() => { onViewChange('mobile'); setIsViewOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Mobile View
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

