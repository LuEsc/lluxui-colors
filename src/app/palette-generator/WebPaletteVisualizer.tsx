
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { WebColorPalette } from "./service/ColorService"

interface WebPaletteVisualizerProps {
  palette: WebColorPalette
  onDelete: () => void
}

const WebPaletteVisualizer: React.FC<WebPaletteVisualizerProps> = ({ palette, onDelete }) => {
  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Web Palette Preview</h3>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Primary</span>
              <span className="text-sm text-zinc-500">{palette.primary}</span>
            </div>
            <div className="h-10 rounded" style={{ backgroundColor: palette.primary }}></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Secondary</span>
              <span className="text-sm text-zinc-500">{palette.secondary}</span>
            </div>
            <div className="h-10 rounded" style={{ backgroundColor: palette.secondary }}></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Accent</span>
              <span className="text-sm text-zinc-500">{palette.accent}</span>
            </div>
            <div className="h-10 rounded" style={{ backgroundColor: palette.accent }}></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Background</span>
              <span className="text-sm text-zinc-500">{palette.background}</span>
            </div>
            <div className="h-10 rounded" style={{ backgroundColor: palette.background }}></div>
          </div>
        </div>
      </div>
      <div className="p-4" style={{ backgroundColor: palette.background, color: palette.text }}>
        <h4 className="text-lg font-semibold mb-2">Sample Text</h4>
        <p className="mb-2">This is how your text would look on the background.</p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded" style={{ backgroundColor: palette.primary, color: palette.background }}>
            Primary Button
          </button>
          <button className="px-4 py-2 rounded" style={{ backgroundColor: palette.secondary, color: palette.background }}>
            Secondary Button
          </button>
          <button className="px-4 py-2 rounded" style={{ backgroundColor: palette.accent, color: palette.background }}>
            Accent Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default WebPaletteVisualizer

