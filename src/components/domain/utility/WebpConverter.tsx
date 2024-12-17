'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Container,
  Paper,
  useTheme,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import { converterAPI } from '@/infrastructure/api/endpoints/utility/converter';

export default function WebpConverter() {
  const theme = useTheme();
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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 4,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        WebP 변환기
      </Typography>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Box
          component="label"
          sx={{
            display: 'block',
            border: '2px dashed',
            borderColor: file ? 'primary.main' : 'grey.300',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            mb: 4,
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
            },
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ display: 'none' }}
          />
          {file ? (
            <Box sx={{ color: 'primary.main' }}>
              <ImageIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6">{file.name}</Typography>
            </Box>
          ) : (
            <>
              <CloudUploadIcon
                sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
              />
              <Typography variant="h6">
                이미지를 드래그하거나 클릭하여 업로드
              </Typography>
            </>
          )}
        </Box>

        {isError && (
          <Typography
            color="error"
            sx={{
              mb: 3,
              textAlign: 'center',
              bgcolor: 'error.light',
              color: 'error.main',
              p: 2,
              borderRadius: 1,
            }}
          >
            {isError}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleConvert}
          disabled={!file || isConverting}
          sx={{
            py: 1.5,
            borderRadius: 2,
            boxShadow: theme.shadows[4],
            fontSize: '1.1rem',
          }}
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
      </Paper>
    </Container>
  );
}
