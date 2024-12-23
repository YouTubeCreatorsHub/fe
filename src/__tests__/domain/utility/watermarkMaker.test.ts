import { WatermarkOptions } from '@/shared/types/domain/utility/watermarkMaker';

describe('WatermarkOptions', () => {
  it('should have correct properties', () => {
    const options: WatermarkOptions = {
      text: {
        content: 'Sample Watermark',
        size: 12,
        color: '#000000',
        position: 'center',
        opacity: 0.5,
        rotation: 45,
      },
      repeat: true,
      gap: 10,
    };

    expect(options.text.content).toBe('Sample Watermark');
    expect(options.text.size).toBe(12);
    expect(options.text.color).toBe('#000000');
    expect(options.text.position).toBe('center');
    expect(options.text.opacity).toBe(0.5);
    expect(options.text.rotation).toBe(45);
    expect(options.repeat).toBe(true);
    expect(options.gap).toBe(10);
  });

  it('should allow different positions', () => {
    const positions: WatermarkOptions['text']['position'][] = [
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'center',
    ];

    positions.forEach((position) => {
      const options: WatermarkOptions = {
        text: {
          content: 'Sample Watermark',
          size: 12,
          color: '#000000',
          position,
          opacity: 0.5,
          rotation: 45,
        },
        repeat: true,
        gap: 10,
      };

      expect(options.text.position).toBe(position);
    });
  });

  it('should handle different opacity values', () => {
    const options: WatermarkOptions = {
      text: {
        content: 'Sample Watermark',
        size: 12,
        color: '#000000',
        position: 'center',
        opacity: 0.75,
        rotation: 45,
      },
      repeat: true,
      gap: 10,
    };

    expect(options.text.opacity).toBe(0.75);
  });

  it('should handle different rotation values', () => {
    const options: WatermarkOptions = {
      text: {
        content: 'Sample Watermark',
        size: 12,
        color: '#000000',
        position: 'center',
        opacity: 0.5,
        rotation: 90,
      },
      repeat: true,
      gap: 10,
    };

    expect(options.text.rotation).toBe(90);
  });

  it('should handle different gap values', () => {
    const options: WatermarkOptions = {
      text: {
        content: 'Sample Watermark',
        size: 12,
        color: '#000000',
        position: 'center',
        opacity: 0.5,
        rotation: 45,
      },
      repeat: true,
      gap: 20,
    };

    expect(options.gap).toBe(20);
  });
});
