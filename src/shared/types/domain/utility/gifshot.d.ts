declare module 'gifshot' {
  export interface GifOptions {
    images: string[];
    gifWidth?: number;
    gifHeight?: number;
    interval?: number;
    numFrames?: number;
    frameDuration?: number;
    quality?: number;
    progressCallback?: (progress: number) => void;
    repeat?: number;
  }

  export interface GifResult {
    error: boolean;
    errorCode?: string;
    errorMsg?: string;
    image?: string;
  }

  export function createGIF(
    options: GifOptions,
    callback: (result: GifResult) => void,
  ): void;
}
