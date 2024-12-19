export const converterAPI = {
  webpConverter: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/utility/webpConverter', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('변환 실패');
      }

      return await response.blob();
    } catch (error) {
      throw new Error('이미지 변환에 실패했습니다.');
    }
  },
};
