import Color from 'color'


export function generatePalette(primary: string, secondary: string, tertiary: string) {
  const palette = new Set<string>([primary, secondary, tertiary])
  
  // Generate variations of each color
  ;[primary, secondary, tertiary].forEach(baseColor => {
    const color = Color(baseColor)
    
    // Add lighter shades
    palette.add(color.lighten(0.2).hex())
    palette.add(color.lighten(0.4).hex())
    
    // Add darker shades
    palette.add(color.darken(0.2).hex())
    palette.add(color.darken(0.4).hex())
    
    // Add desaturated versions
    palette.add(color.desaturate(0.2).hex())
    palette.add(color.desaturate(0.4).hex())
  })

  return Array.from(palette).slice(0, 13) // Return max 13 colors (3 base + 10 generated)
}

export function getContrastColor(backgroundColor: string): string {
  const color = Color(backgroundColor)
  return color.isLight() ? '#000000' : '#FFFFFF'
}

export function getTextColor(backgroundColor: string, darkColor = '#1a1a1a', lightColor = '#ffffff'): string {
  const color = Color(backgroundColor)
  return color.isLight() ? darkColor : lightColor
}

