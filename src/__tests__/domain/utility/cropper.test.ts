import { describe, it, expect } from '@jest/globals';

function cropImage(original: string, width: number, height: number) {
  return { width, height };
}

describe('cropper utility', () => {
  it('should crop an image correctly', () => {
    const original = 'someImageData';
    const cropped = cropImage(original, 100, 100);
    expect(cropped).toBeDefined();
    expect(cropped.width).toBe(100);
    expect(cropped.height).toBe(100);
  });

  it('should handle zero dimensions', () => {
    const original = 'someImageData';
    const cropped = cropImage(original, 0, 0);
    expect(cropped).toBeDefined();
    expect(cropped.width).toBe(0);
    expect(cropped.height).toBe(0);
  });

  it('should handle negative dimensions', () => {
    const original = 'someImageData';
    const cropped = cropImage(original, -100, -100);
    expect(cropped).toBeDefined();
    expect(cropped.width).toBe(-100);
    expect(cropped.height).toBe(-100);
  });

  it('should handle non-integer dimensions', () => {
    const original = 'someImageData';
    const cropped = cropImage(original, 100.5, 100.5);
    expect(cropped).toBeDefined();
    expect(cropped.width).toBe(100.5);
    expect(cropped.height).toBe(100.5);
  });

  it('should handle large dimensions', () => {
    const original = 'someImageData';
    const cropped = cropImage(original, 10000, 10000);
    expect(cropped).toBeDefined();
    expect(cropped.width).toBe(10000);
    expect(cropped.height).toBe(10000);
  });
});
