export interface CollageOptions {
  layout: 'grid' | 'pinterest' | 'masonry';
  columns: number;
  gap: number;
  backgroundColor: string;
  width: number;
  height: number;
  borderRadius: number;
  filter: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
}
