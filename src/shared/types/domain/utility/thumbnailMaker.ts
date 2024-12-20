export interface ThumbnailOptions {
  width: number;
  height: number;
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
  filter: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
    grayscale: number;
  };
  overlay: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
  text: {
    content: string;
    size: number;
    color: string;
    position: 'top' | 'center' | 'bottom';
    outline: boolean;
    outlineColor: string;
    shadow: boolean;
  };
  border: {
    enabled: boolean;
    width: number;
    color: string;
    radius: number;
  };
}
