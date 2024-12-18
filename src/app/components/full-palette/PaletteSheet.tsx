'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast'

interface PaletteSheetProps {
  colors: string[]
  isOpen: boolean
  onClose: () => void
}

export function PaletteSheet({ colors, isOpen, onClose }: PaletteSheetProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = async (color: string) => {
    await navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Generated Color Palette</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {colors.map((color, index) => (
              <motion.button
                key={`${color}-${index}`} 
                onClick={() => copyToClipboard(color)}
                className="group relative aspect-square rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0" style={{ backgroundColor: color }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-white/90 shadow-sm">
                    {color}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/90 shadow-sm flex items-center justify-center">
                    {copiedColor === color ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )}
    <ToastProvider>
      {copiedColor && (
        <Toast>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: copiedColor }}
            />
            <span>Copied {copiedColor} to clipboard!</span>
          </div>
        </Toast>
      )}
      <ToastViewport />
    </ToastProvider>
  </AnimatePresence>
  
  )
}

