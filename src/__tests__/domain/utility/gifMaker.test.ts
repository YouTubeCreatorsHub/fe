import { GifOptions } from '@/shared/types/domain/utility/gifMaker';

describe('gifMaker tests', () => {
  it('should accept valid GifOptions', () => {
    const validOptions: GifOptions = {
      fps: 30,
      quality: 10,
      width: 500,
      loop: true,
    };
    expect(validOptions).toBeDefined();
    expect(validOptions.loop).toBe(true);
  });

  it('should handle different fps values', () => {
    const options: GifOptions = {
      fps: 60,
      quality: 5,
      width: 300,
      loop: false,
    };
    expect(options.fps).toBe(60);
  });

  it('should handle minimal width value', () => {
    const options: GifOptions = {
      fps: 24,
      quality: 8,
      width: 1,
      loop: true,
    };
    expect(options.width).toBeGreaterThanOrEqual(1);
  });
});
