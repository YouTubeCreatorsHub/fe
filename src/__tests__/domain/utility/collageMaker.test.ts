import { CollageOptions } from '@/shared/types/domain/utility/collageMaker';

describe('CollageOptions', () => {
  it('should have a valid layout', () => {
    const options: CollageOptions = {
      layout: 'grid',
      columns: 3,
      gap: 10,
      backgroundColor: '#ffffff',
      width: 800,
      height: 600,
      borderRadius: 5,
      filter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
      },
    };
    expect(['grid', 'pinterest', 'masonry']).toContain(options.layout);
  });

  it('should have a valid number of columns', () => {
    const options: CollageOptions = {
      layout: 'grid',
      columns: 3,
      gap: 10,
      backgroundColor: '#ffffff',
      width: 800,
      height: 600,
      borderRadius: 5,
      filter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
      },
    };
    expect(options.columns).toBeGreaterThan(0);
  });

  it('should have a valid gap', () => {
    const options: CollageOptions = {
      layout: 'grid',
      columns: 3,
      gap: 10,
      backgroundColor: '#ffffff',
      width: 800,
      height: 600,
      borderRadius: 5,
      filter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
      },
    };
    expect(options.gap).toBeGreaterThanOrEqual(0);
  });

  it('should have a valid background color', () => {
    const options: CollageOptions = {
      layout: 'grid',
      columns: 3,
      gap: 10,
      backgroundColor: '#ffffff',
      width: 800,
      height: 600,
      borderRadius: 5,
      filter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
      },
    };
    expect(options.backgroundColor).toMatch(/^#[0-9A-F]{6}$/i);
  });

  it('should have valid dimensions', () => {
    const options: CollageOptions = {
      layout: 'grid',
      columns: 3,
      gap: 10,
      backgroundColor: '#ffffff',
      width: 800,
      height: 600,
      borderRadius: 5,
      filter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
      },
    };
    expect(options.width).toBeGreaterThan(0);
    expect(options.height).toBeGreaterThan(0);
  });

  it('should have a valid border radius', () => {
    const options: CollageOptions = {
      layout: 'grid',
      columns: 3,
      gap: 10,
      backgroundColor: '#ffffff',
      width: 800,
      height: 600,
      borderRadius: 5,
      filter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
      },
    };
    expect(options.borderRadius).toBeGreaterThanOrEqual(0);
  });

  it('should have valid filter values', () => {
    const options: CollageOptions = {
      layout: 'grid',
      columns: 3,
      gap: 10,
      backgroundColor: '#ffffff',
      width: 800,
      height: 600,
      borderRadius: 5,
      filter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
      },
    };
    expect(options.filter.brightness).toBeGreaterThanOrEqual(0);
    expect(options.filter.contrast).toBeGreaterThanOrEqual(0);
    expect(options.filter.saturation).toBeGreaterThanOrEqual(0);
  });
});
