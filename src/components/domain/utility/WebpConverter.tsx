'use client';

import { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { converterAPI } from '@/infrastructure/api/endpoints/utility/converter';

export default function WebpConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isError, setIsError] = useState<string>('');

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setIsError('');

    try {
      const blob = await converterAPI.webpConverter(file);
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.split('.')[0]}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      setIsError('이미지 변환에 실패했습니다.');
      console.error('변환 실패:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        이미지를 WebP로 변환
      </Typography>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ marginBottom: 20 }}
      />

      {isError && (
        <Typography color="error" sx={{ mb: 2 }}>
          {isError}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={handleConvert}
        disabled={!file || isConverting}
        sx={{ mt: 2 }}
      >
        {isConverting ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            변환 중...
          </>
        ) : (
          'WebP로 변환'
        )}
      </Button>
    </Box>
  );
}
