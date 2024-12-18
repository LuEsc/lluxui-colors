'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HexColorPicker } from 'react-colorful'
import { useOnClickOutside } from '@/app/shared/hooks/useClickOutside'

interface ColorCardProps {
  title: string
  color: string
  onChange: (color: string) => void
}

export function ColorCard({ title, color, onChange }: ColorCardProps) {
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(pickerRef as React.RefObject<HTMLElement>, () => setShowPicker(false))

  return (
    <motion.div
      layout
      className="flex items-center space-x-4"
    >
      <div className="flex-grow">
        <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
        <div className="font-mono text-xs text-gray-500">{color.toUpperCase()}</div>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPicker(true)}
        className="w-10 h-10 rounded-full cursor-pointer shadow-sm relative z-10"
        style={{ backgroundColor: color }}
      >
        <AnimatePresence>
          {showPicker && (
            <motion.div
              ref={pickerRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-10 top-full right-0 mt-2 hover:z-10"
            >
              <div className="bg-white rounded-lg shadow-xl p-3 border border-gray-200">
                <HexColorPicker color={color} onChange={onChange} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

