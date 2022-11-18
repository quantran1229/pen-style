type PenTrueColor =
  | 'black'
  | 'white'
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'cyan'
  | 'orange';

type PenColor = PenTrueColor | string | PenColorRPG;

type PenColorRPG = {
  r: number;
  b: number;
  g: number;
};

type PenOption = {
  c?: PenColor;
  b?: PenColor;
  o?: string;
};

const DEFAULT_COLOR_VALUE: {
  [k in PenTrueColor]: PenColorRPG;
} = {
  black: {r: 0, b: 0, g: 0},
  white: {r: 255, b: 255, g: 255},
  red: {r: 255, b: 0, g: 0},
  blue: {r: 0, b: 255, g: 0},
  yellow: {r: 255, b: 0, g: 255},
  cyan: {r: 0, b: 255, g: 255},
  green: {r: 0, b: 0, g: 255},
  orange: {r: 255, b: 0, g: 165},
};

function hexToRgb(hex: string): PenColorRPG | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToANSI(rbg: PenColorRPG, isBg?: boolean): string {
  return `${isBg ? 48 : 38};2;${rbg.r};${rbg.g};${rbg.b}`;
}

function colorValue(color: PenColor, isBg: boolean): string {
  if (typeof color === 'string') {
    if (color.includes('#')) {
      const rgb = hexToRgb(color);
      if (rgb) {
        return rgbToANSI(rgb, isBg);
      }
    } else {
      return rgbToANSI(DEFAULT_COLOR_VALUE[color as PenTrueColor], isBg);
    }
  } else {
    // color is rbg style
    return rgbToANSI(color, isBg);
  }
  return '';
}

export function Pen(txt: string, options: PenOption | PenColor): string {
  const value = [];
  // Check if options is color only
  if (typeof options === 'string' || (options as PenColorRPG).r) {
    const color = colorValue(options as PenColor, false);
    if (color !== '') {
      value.push(color);
    }
  } else {
    // cast options to PenOptions
    options = options as PenOption;
    // Working with color
    if (options.c) {
      const color = colorValue(options.c, false);
      if (color !== '') {
        value.push(color);
      }
    }

    // Working with background color
    if (options.b) {
      const color = colorValue(options.b, true);
      if (color !== '') {
        value.push(color);
      }
    }

    // Working with additional options: underline u; italic i; bold b; strike s
    if (options.o) {
      if (options.o.toLowerCase().includes('u')) value.push(4);
      if (options.o.toLowerCase().includes('i')) value.push(3);
      if (options.o.toLowerCase().includes('b')) value.push(1);
      if (options.o.toLowerCase().includes('s')) value.push(9);
    }
  }

  if (value.length > 0) {
    txt = `\x1b[${value.join(';')}m${txt}\x1b[0m`;
  }

  return txt;
}
