const transformImage = (image: number[][], degrees: number): number[][] => {
  const n = image.length;
  const rotatedImage = Array.from({ length: n }, () => Array(n).fill(0));

  if (degrees === 90) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotatedImage[j][n - 1 - i] = image[i][j];
      }
    }
  } else if (degrees === 180) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotatedImage[n - 1 - i][n - 1 - j] = image[i][j];
      }
    }
  } else if (degrees === 270) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotatedImage[n - 1 - j][i] = image[i][j];
      }
    }
  } else if (degrees === 0) {
    return image;
  } else {
    throw new Error('Invalid rotation degree');
  }

  return rotatedImage;
};

describe('transformImage', () => {
  it('should rotate the image by 90 degrees', () => {
    const inputImage = [
      [1, 2],
      [3, 4],
    ];
    const expectedOutput = [
      [3, 1],
      [4, 2],
    ];
    expect(transformImage(inputImage, 90)).toEqual(expectedOutput);
  });

  it('should rotate the image by 180 degrees', () => {
    const inputImage = [
      [1, 2],
      [3, 4],
    ];
    const expectedOutput = [
      [4, 3],
      [2, 1],
    ];
    expect(transformImage(inputImage, 180)).toEqual(expectedOutput);
  });

  it('should rotate the image by 270 degrees', () => {
    const inputImage = [
      [1, 2],
      [3, 4],
    ];
    const expectedOutput = [
      [2, 4],
      [1, 3],
    ];
    expect(transformImage(inputImage, 270)).toEqual(expectedOutput);
  });

  it('should return the same image for 0 degrees rotation', () => {
    const inputImage = [
      [1, 2],
      [3, 4],
    ];
    const expectedOutput = [
      [1, 2],
      [3, 4],
    ];
    expect(transformImage(inputImage, 0)).toEqual(expectedOutput);
  });

  it('should throw an error for invalid rotation degrees', () => {
    const inputImage = [
      [1, 2],
      [3, 4],
    ];
    expect(() => transformImage(inputImage, 45)).toThrow(
      'Invalid rotation degree',
    );
  });
});
