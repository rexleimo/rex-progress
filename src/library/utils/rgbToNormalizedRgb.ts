export function rgbToNormalizedRgb(rgb: { r: number; g: number; b: number }): {
    r: number;
    g: number;
    b: number;
} {
    return {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255,
    };
}
