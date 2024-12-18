'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info} from 'lucide-react'
import { getTextColor } from '../color-config.service'

interface PreviewSectionProps {
  colors: string[]
  view: 'web' | 'mobile'
}

export function PreviewSection({ colors, view }: PreviewSectionProps) {
  const [primary, secondary, tertiary, ...palette] = colors
  const [showUxTip, setShowUxTip] = useState(false)

  const uxTips = {
    header: "Consider using a contrasting color for the navigation to make it stand out.",
    hero: "The hero section sets the tone. Ensure the text is legible against the background.",
    content: "Use color to guide the user's eye to important information or calls-to-action.",
    projects: "Consistent use of color in project cards helps create a cohesive look.",
  }

  const WebPreview = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Browser Chrome */}
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <div className="w-3 h-3 rounded-full bg-gray-300" />
        </div>
        <div className="flex-1 px-2">
          <div className="bg-white rounded-md text-sm text-gray-400 py-1 px-3 text-center">
            web.color.palette
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div>
        {/* Header */}
        <div 
          className="p-4 flex justify-between items-center relative"
          style={{ backgroundColor: secondary }}
        >
          <h2 className="text-lg font-semibold" style={{ color: getTextColor(secondary) }}>Design Studio</h2>
          <nav>
            <ul className="flex space-x-4">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline" style={{ color: getTextColor(secondary) }}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Hero Section */}
        <div 
          className="h-64 relative bg-cover bg-center flex items-center justify-center"
          style={{ 
            backgroundColor: primary,
            backgroundImage: `url('/placeholder.svg?height=400&width=800')`
          }}
        >
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: `${primary}99` }}
          />
          <div className="relative z-10 text-center">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: getTextColor(primary, tertiary, '#ffffff') }}
            >
              Welcome to Our Design Studio
            </h1>
            <p 
              className="text-xl"
              style={{ color: getTextColor(primary, '#ffffff', tertiary) }}
            >
              Creating beautiful and functional designs
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 
            className="text-3xl font-bold mb-6"
            style={{ color: getTextColor('white', primary, tertiary) }}
          >
            Our Approach
          </h2>
          <p 
            className="text-lg mb-6"
            style={{ color: getTextColor('white', secondary, '#666666') }}
          >
            We combine aesthetics with functionality to deliver exceptional results.
            Our color-driven design process ensures harmony and impact in every project.
          </p>
          <button
            className="px-6 py-2 rounded-md text-white transition-colors"
            style={{ backgroundColor: tertiary, color: getTextColor(tertiary) }}
          >
            Learn More
          </button>
        </div>

        {/* Project Grid */}
        <div className="bg-gray-100 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 
              className="text-3xl font-bold mb-8"
              style={{ color: getTextColor('white', primary, tertiary) }}
            >
              Our Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {palette.slice(0, 6).map((color, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ 
                      backgroundColor: color,
                      backgroundImage: `url('/placeholder.svg?height=200&width=300')`
                    }}
                  />
                  <div className="p-4" style={{ backgroundColor: secondary }}>
                    <h3 
                      className="font-medium mb-2"
                      style={{ color: getTextColor(secondary) }}
                    >
                      Project {i + 1}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: getTextColor(secondary, '#666666', '#ffffff99') }}
                    >
                      A showcase of our color-driven design process.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const MobilePreview = () => (
    <div className="max-w-[320px] mx-auto">
      <div className="rounded-[2rem] overflow-hidden border-[14px] border-gray-900 shadow-xl">
        <div className="bg-gray-900 p-2 flex justify-center">
          <div className="w-16 h-[5px] bg-gray-700 rounded-full" />
        </div>
        <div style={{ backgroundColor: primary }} className="h-[600px] relative overflow-y-auto">
          <div className="sticky top-0 inset-x-0 h-12 flex items-center px-4 shadow-sm z-10" style={{ backgroundColor: secondary }}>
            <h4 className="font-medium text-sm" style={{ color: getTextColor(secondary) }}>Design Studio App</h4>
          </div>
          <div className="p-4 space-y-4">
            <div className="rounded-lg p-4 shadow-sm" style={{ backgroundColor: 'white' }}>
              <h5 className="font-medium mb-2 text-lg" style={{ color: tertiary }}>Welcome</h5>
              <p className="text-sm" style={{ color: '#666666' }}>Explore our color-driven design projects and approach.</p>
            </div>
            {palette.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="rounded-lg p-4 shadow-sm"
                style={{ backgroundColor: color }}
              >
                <h6 className="font-medium mb-1 text-sm" style={{ color: getTextColor(color) }}>Project {i + 1}</h6>
                <p className="text-xs" style={{ color: getTextColor(color, '#666666', '#ffffff99') }}>
                  A showcase of our design expertise.
                </p>
              </div>
            ))}
            <button
              className="w-full py-2 rounded-md text-white text-sm transition-colors"
              style={{ backgroundColor: tertiary, color: getTextColor(tertiary) }}
            >
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'web' ? <WebPreview /> : <MobilePreview />}
        </motion.div>
      </AnimatePresence>
      <button
        onClick={() => setShowUxTip(true)}
        className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition-colors"
      >
        <Info className="w-5 h-5" />
      </button>
      <AnimatePresence>
        {showUxTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">UX Tips</h3>
              <ul className="space-y-2">
                {Object.values(uxTips).map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <Info className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-sm">{tip}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowUxTip(false)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Close Tips
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

