export interface WatermarkOptions {
  text: {
    content: string;
    size: number;
    color: string;
    position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center';
    opacity: number;
    rotation: number;
  };
  repeat: boolean;
  gap: number;
}
