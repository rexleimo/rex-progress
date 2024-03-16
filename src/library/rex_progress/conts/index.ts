import { Color } from "paper/dist/paper-core";
import { rgbToNormalizedRgb } from "../../utils";

export const fillColor = rgbToNormalizedRgb({ r: 223, g: 224, b: 229 });
export const primaryColor = rgbToNormalizedRgb({ r: 1, g: 79, b: 214 });
export const primaryColor2 = rgbToNormalizedRgb({ r: 224, g: 242, b: 255 });

export const primaryColor2Rgb = new Color(
    primaryColor2.r,
    primaryColor2.g,
    primaryColor2.b
);

export const primaryColorRgb = new Color(
    primaryColor.r,
    primaryColor.g,
    primaryColor.b
);
