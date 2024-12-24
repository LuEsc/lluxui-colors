import chroma from 'chroma-js';
import tailwindColors from 'tailwindcss/colors';

export type HarmonyType = 
  | 'analogous' 
  | 'complementary' 
  | 'triadic' 
  | 'tetradic' 
  | 'monochromatic' 
  | 'gradient' 
  | 'web';

type TailwindColorValue = string | Record<string, string>;
type TailwindColorObject = Record<string, TailwindColorValue>;

export interface WebColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success: string;
  warning: string;
  error: string;
}

/**
 * Flattens Tailwind color objects into a single-level dictionary for easy access.
 */
const flattenColors = (colors: TailwindColorObject, prefix = ''): Record<string, string> => {
  return Object.entries(colors).reduce<Record<string, string>>((acc, [key, value]) => {
    if (typeof value === 'string' && key !== 'DEFAULT') {
      acc[prefix ? `${prefix}-${key}` : key] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(acc, flattenColors(value as TailwindColorObject, key));
    }
    return acc;
  }, {});
};

const TAILWIND_COLORS = flattenColors(tailwindColors as unknown as TailwindColorObject);

export class ColorService {
  /**
   * Find the closest Tailwind color class for the given hexadecimal color.
   * @param hexColor The input color in hexadecimal format (e.g., "#ff5733").
   * @returns The Tailwind class for the closest color, e.g., 'bg-blue-500'.
   */
  static findNearestTailwindColor(hexColor: string): string {
    // Ensure the input color is valid
    if (!this.isValidHex(hexColor)) {
      throw new Error('Invalid hex color format');
    }

    let minDistance = Infinity;
    let nearestClass = '';
    const inputColor = chroma(hexColor); // Convert the input color to a chroma color object

    // Iterate over all Tailwind colors and calculate the distance
    Object.entries(TAILWIND_COLORS).forEach(([className, colorValue]) => {
      // Ensure the color is a valid hex string
      if (typeof colorValue === 'string' && this.isValidHex(colorValue)) {
        const tailwindColor = chroma(colorValue); // Convert Tailwind color to a chroma color object
        const distance = chroma.distance(inputColor, tailwindColor); // Calculate color distance

        // Update the nearest class if a closer color is found
        if (distance < minDistance) {
          minDistance = distance;
          nearestClass = className;
        }
      }
    });

    return nearestClass; // Return the closest Tailwind class (e.g., bg-blue-500)
  }
  /**
   * Generates a color palette based on a harmony type.
   */
  static generateHarmony(baseColors: string[], type: HarmonyType): string[] | WebColorPalette {
    if (type === 'web') {
      return this.generateWebColorPalette(baseColors[0]);
    }

    const palette: string[] = [...baseColors];
    
    baseColors.forEach(color => {
      const baseChroma = chroma(color);
      
      switch (type) {
        case 'analogous':
          palette.push(
            baseChroma.set('hsl.h', '+30').hex(),
            baseChroma.set('hsl.h', '-30').hex()
          );
          break;
        case 'complementary':
          palette.push(baseChroma.set('hsl.h', '+180').hex());
          break;
        case 'triadic':
          palette.push(
            baseChroma.set('hsl.h', '+120').hex(),
            baseChroma.set('hsl.h', '+240').hex()
          );
          break;
        case 'tetradic':
          palette.push(
            baseChroma.set('hsl.h', '+90').hex(),
            baseChroma.set('hsl.h', '+180').hex(),
            baseChroma.set('hsl.h', '+270').hex()
          );
          break;
        case 'monochromatic':
          palette.push(
            baseChroma.brighten(1).hex(),
            baseChroma.darken(1).hex()
          );
          break;
        case 'gradient':
          palette.push(
            baseChroma.brighten(2).hex(),
            baseChroma.brighten(1).hex(),
            baseChroma.darken(1).hex(),
            baseChroma.darken(2).hex()
          );
          break;
      }
    });

    return [...new Set(palette)].slice(0, 8);
  }

  /**
   * Validates if a string is a valid hex color.
   */
  static isValidHex(color: string): boolean {
    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  }

  /**
   * Ensures a color string is formatted as a hex color.
   */
  static formatHex(hex: string): string {
    return hex.startsWith('#') ? hex : `#${hex}`;
  }

  /**
   * Generates a coherent web color palette.
   */
  static generateWebColorPalette(baseColor: string): WebColorPalette {
    const base = chroma(baseColor);
    const primary = base.hex();
    const secondary = base.set('hsl.h', '+60').saturate(0.2).hex();
    const accent = base.set('hsl.h', '+180').saturate(0.3).hex();

    const isDark = chroma.contrast(base, 'white') > chroma.contrast(base, 'black');
    const background = isDark ? '#ffffff' : '#1a202c';
    const text = isDark ? '#1a202c' : '#ffffff';

    const success = chroma('#22c55e').hex();
    const warning = chroma('#eab308').hex();
    const error = chroma('#ef4444').hex();

    return { primary, secondary, accent, background, text, success, warning, error };
  }

  /**
   * Provides an accessible text color for a given background color.
   */
  static getAccessibleTextColor(backgroundColor: string): string {
    return chroma(backgroundColor).luminance() > 0.5 ? '#1a202c' : '#ffffff';
  }
}
