'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  useTheme,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import GifIcon from '@mui/icons-material/Gif';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Image from 'next/image';
import { createGIF } from 'gifshot';

interface GifOptions {
  fps: number;
  quality: number;
  width: number;
  loop: boolean;
}

export default function GifMaker() {
  const theme = useTheme();
  const [images, setImages] = useState<string[]>([]);
  const [options, setOptions] = useState<GifOptions>({
    fps: 10,
    quality: 80,
    width: 500,
    loop: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateGif = async () => {
    if (images.length < 2) return;

    try {
      setIsGenerating(true);
      setError('');

      await new Promise<void>((resolve, reject) => {
        createGIF(
          {
            images: images,
            gifWidth: options.width,
            gifHeight: options.width,
            interval: 1 / options.fps,
            quality: options.quality / 100,
            repeat: options.loop ? 0 : -1,
            progressCallback: (progress: number) => {
              console.log('Progress:', Math.round(progress * 100) + '%');
            },
          },
          (result) => {
            if (!result.error && result.image) {
              const link = document.createElement('a');
              link.href = result.image;
              link.download = 'animated.gif';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              resolve();
            } else {
              reject(result.errorMsg || '알 수 없는 오류가 발생했습니다.');
            }
          },
        );
      });
    } catch (error) {
      console.error('GIF 생성 실패:', error);
      setError(typeof error === 'string' ? error : 'GIF 생성에 실패했습니다.');
    } finally {
      setIsGenerating(false);
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
        GIF 메이커
      </Typography>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Box
                component="label"
                sx={{
                  display: 'block',
                  border: '2px dashed',
                  borderColor: images.length ? 'primary.main' : 'grey.300',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  mb: 3,
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
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <CloudUploadIcon
                  sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
                />
                <Typography variant="h6">
                  이미지를 드래그하거나 클릭하여 업로드
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  여러 이미지를 한 번에 선택할 수 있습니다
                </Typography>
              </Box>

              {images.length > 0 && (
                <Grid container spacing={2}>
                  {images.map((image, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Paper
                        sx={{
                          position: 'relative',
                          p: 1,
                          '&:hover': { boxShadow: theme.shadows[4] },
                        }}
                      >
                        <Image
                          src={image}
                          alt={`Frame ${index + 1}`}
                          width={200}
                          height={200}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 4,
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ bgcolor: 'background.paper' }}
                          >
                            <DragIndicatorIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveImage(index)}
                            sx={{ bgcolor: 'background.paper' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                GIF 옵션
              </Typography>

              {error && (
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'error.light',
                    color: 'error.dark',
                    border: '1px solid',
                    borderColor: 'error.main',
                  }}
                >
                  <Typography variant="body2">{error}</Typography>
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>FPS (프레임 속도)</Typography>
                <Slider
                  value={options.fps}
                  onChange={(_, value) =>
                    setOptions((prev) => ({ ...prev, fps: value as number }))
                  }
                  disabled={isGenerating}
                  min={1}
                  max={30}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>품질</Typography>
                <Slider
                  value={options.quality}
                  onChange={(_, value) =>
                    setOptions((prev) => ({
                      ...prev,
                      quality: value as number,
                    }))
                  }
                  disabled={isGenerating}
                  min={10}
                  max={100}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>너비</InputLabel>
                <Select
                  value={options.width}
                  label="너비"
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      width: Number(e.target.value),
                    }))
                  }
                  disabled={isGenerating}
                >
                  <MenuItem value={300}>300px</MenuItem>
                  <MenuItem value={500}>500px</MenuItem>
                  <MenuItem value={800}>800px</MenuItem>
                  <MenuItem value={1000}>1000px</MenuItem>
                </Select>
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                onClick={handleCreateGif}
                disabled={images.length < 2 || isGenerating}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                  position: 'relative',
                }}
              >
                {isGenerating ? (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                      }}
                    >
                      <CircularProgress size={24} color="inherit" />
                      <Typography>생성 중...</Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <GifIcon sx={{ mr: 1 }} />
                    GIF 생성하기
                  </>
                )}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
