const webpConverter = async (input: string): Promise<string> => {
  if (!input) {
    throw new Error('Input cannot be empty');
  }

  const supportedFormats = ['jpg', 'png'];
  const inputFormat = input.split('.').pop();

  if (!inputFormat || !supportedFormats.includes(inputFormat)) {
    throw new Error('Unsupported format');
  }

  return input.replace(/\.[^/.]+$/, '.webp');
};

describe('webpConverter', () => {
  it('should convert jpg to webp', async () => {
    const input = 'image.jpg';
    const output = 'image.webp';
    const result = await webpConverter(input);
    expect(result).toBe(output);
  });

  it('should convert png to webp', async () => {
    const input = 'image.png';
    const output = 'image.webp';
    const result = await webpConverter(input);
    expect(result).toBe(output);
  });

  it('should throw an error for unsupported formats', async () => {
    const input = 'image.bmp';
    await expect(webpConverter(input)).rejects.toThrow('Unsupported format');
  });

  it('should handle empty input', async () => {
    const input = '';
    await expect(webpConverter(input)).rejects.toThrow('Input cannot be empty');
  });
});
