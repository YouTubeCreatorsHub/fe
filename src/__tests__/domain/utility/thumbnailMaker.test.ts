import { ThumbnailOptions } from '@/shared/types/domain/utility/thumbnailMaker';

describe('ThumbnailOptions', () => {
  test('should create a valid ThumbnailOptions object', () => {
    const validThumbnail: ThumbnailOptions = {
      width: 800,
      height: 600,
      quality: 90,
      format: 'jpeg',
      filter: {
        brightness: 1,
        contrast: 1,
        saturation: 1,
        blur: 0,
        grayscale: 0,
      },
      overlay: {
        enabled: true,
        color: '#ffffff',
        opacity: 0.5,
      },
      text: {
        content: 'Sample Text',
        size: 24,
        color: '#000000',
        position: 'center',
        outline: false,
        outlineColor: '#ff0000',
        shadow: true,
      },
      border: {
        enabled: true,
        width: 2,
        color: '#000000',
        radius: 5,
      },
    };
    expect(validThumbnail).toBeDefined();
    expect(validThumbnail.width).toBe(800);
    expect(validThumbnail.overlay.enabled).toBe(true);
  });

  test('should allow disabling overlay and border', () => {
    const noOverlayBorder: ThumbnailOptions = {
      width: 1920,
      height: 1080,
      quality: 85,
      format: 'png',
      filter: {
        brightness: 1,
        contrast: 1,
        saturation: 1,
        blur: 0,
        grayscale: 0,
      },
      overlay: {
        enabled: false,
        color: '#000000',
        opacity: 0,
      },
      text: {
        content: '',
        size: 16,
        color: '#ffffff',
        position: 'bottom',
        outline: false,
        outlineColor: '#000000',
        shadow: false,
      },
      border: {
        enabled: false,
        width: 0,
        color: '#000000',
        radius: 0,
      },
    };
    expect(noOverlayBorder.overlay.enabled).toBe(false);
    expect(noOverlayBorder.border.enabled).toBe(false);
  });

  test('should handle different formats', () => {
    const formats: ThumbnailOptions['format'][] = ['jpeg', 'png', 'webp'];
    formats.forEach((format) => {
      const thumbnail: ThumbnailOptions = {
        width: 400,
        height: 300,
        quality: 80,
        format,
        filter: {
          brightness: 1,
          contrast: 1,
          saturation: 1,
          blur: 1,
          grayscale: 1,
        },
        overlay: {
          enabled: false,
          color: '#000000',
          opacity: 0,
        },
        text: {
          content: 'Test',
          size: 14,
          color: '#fff',
          position: 'top',
          outline: false,
          outlineColor: '#000',
          shadow: false,
        },
        border: {
          enabled: false,
          width: 0,
          color: '#000000',
          radius: 0,
        },
      };
      expect(thumbnail.format).toBe(format);
    });
  });

  test('should allow text with outline and shadow', () => {
    const textWithStyles: ThumbnailOptions = {
      width: 640,
      height: 480,
      quality: 75,
      format: 'jpeg',
      filter: {
        brightness: 0.8,
        contrast: 1.2,
        saturation: 1.1,
        blur: 0,
        grayscale: 0,
      },
      overlay: {
        enabled: true,
        color: '#ff0000',
        opacity: 0.3,
      },
      text: {
        content: 'Test Outline',
        size: 20,
        color: '#ffffff',
        position: 'top',
        outline: true,
        outlineColor: '#000000',
        shadow: true,
      },
      border: {
        enabled: true,
        width: 3,
        color: '#ff0000',
        radius: 10,
      },
    };
    expect(textWithStyles.text.outline).toBe(true);
    expect(textWithStyles.text.shadow).toBe(true);
  });
});
