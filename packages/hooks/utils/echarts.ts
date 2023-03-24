import * as echarts from 'echarts/core';

import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart,
} from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
} from 'echarts/components';

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  PictorialBarChart,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  ScatterChart,
  // map3D,
  // geo3D,
]);

export default echarts;

export enum RenderType {
  SVGRenderer = 'SVGRenderer',
  CanvasRenderer = 'CanvasRenderer',
}
export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
  Default = 'default',
}
export interface AnimationType {
  enable?: boolean;
  styles?: {
    [attr: string]: string;
  };
}
export interface UseChartsOptionType {
  autoChartSize?: boolean;
  animation?: AnimationType;
  render?: RenderType;
  theme?: ThemeType;
}
