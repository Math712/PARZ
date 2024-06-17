import { ChartArea } from "chart.js";

export const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
  const colorStart = "#4338ca";
  const colorMid = "#818cf8"
  const colorEnd = "#e0e7ff"

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(1, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(0, colorEnd);

  return gradient;
}