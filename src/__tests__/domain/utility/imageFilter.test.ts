import { FilterOptions } from '@/shared/types/domain/utility/imageFilter';

describe('FilterOptions', () => {
  let filterOptions: FilterOptions;

  beforeEach(() => {
    filterOptions = {
      brightness: 100,
      contrast: 100,
      saturate: 100,
      blur: 0,
      grayscale: 0,
      sepia: 0,
      hueRotate: 0,
    };
  });

  test('should have default values', () => {
    expect(filterOptions.brightness).toBe(100);
    expect(filterOptions.contrast).toBe(100);
    expect(filterOptions.saturate).toBe(100);
    expect(filterOptions.blur).toBe(0);
    expect(filterOptions.grayscale).toBe(0);
    expect(filterOptions.sepia).toBe(0);
    expect(filterOptions.hueRotate).toBe(0);
  });

  test('should update brightness', () => {
    filterOptions.brightness = 150;
    expect(filterOptions.brightness).toBe(150);
  });

  test('should update contrast', () => {
    filterOptions.contrast = 120;
    expect(filterOptions.contrast).toBe(120);
  });

  test('should update saturate', () => {
    filterOptions.saturate = 130;
    expect(filterOptions.saturate).toBe(130);
  });

  test('should update blur', () => {
    filterOptions.blur = 5;
    expect(filterOptions.blur).toBe(5);
  });

  test('should update grayscale', () => {
    filterOptions.grayscale = 50;
    expect(filterOptions.grayscale).toBe(50);
  });

  test('should update sepia', () => {
    filterOptions.sepia = 40;
    expect(filterOptions.sepia).toBe(40);
  });

  test('should update hueRotate', () => {
    filterOptions.hueRotate = 90;
    expect(filterOptions.hueRotate).toBe(90);
  });
});
