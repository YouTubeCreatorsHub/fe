// ThumbnailMaker.tsx
'use client';

import { useState, useRef } from 'react';
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
  TextField,
  useTheme,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import Image from 'next/image';
import { ThumbnailOptions } from '@/shared/types/domain/utility/thumbnailMaker';

export default function ThumbnailMaker() {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');
  const [options, setOptions] = useState<ThumbnailOptions>({
    width: 1280,
    height: 720,
    quality: 90,
    format: 'webp',
    filter: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      grayscale: 0,
    },
    overlay: {
      enabled: false,
      color: '#000000',
      opacity: 30,
    },
    text: {
      content: '',
      size: 48,
      color: '#ffffff',
      position: 'center',
      outline: true,
      outlineColor: '#000000',
      shadow: true,
    },
    border: {
      enabled: false,
      width: 4,
      color: '#ffffff',
      radius: 8,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateThumbnail = async () => {
    if (!image || !canvasRef.current) return;

    try {
      setIsGenerating(true);
      setError('');

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = document.createElement('img');
      await new Promise<void>((resolve) => {
        img.onload = () => {
          // 캔버스 크기 설정
          canvas.width = options.width;
          canvas.height = options.height;

          // 기본 이미지 그리기
          ctx.drawImage(img, 0, 0, options.width, options.height);

          // 필터 적용
          ctx.filter = `
            brightness(${options.filter.brightness}%)
            contrast(${options.filter.contrast}%)
            saturate(${options.filter.saturation}%)
            blur(${options.filter.blur}px)
            grayscale(${options.filter.grayscale}%)
          `;
          ctx.drawImage(canvas, 0, 0);
          ctx.filter = 'none';

          // 오버레이 적용
          if (options.overlay.enabled) {
            ctx.fillStyle = options.overlay.color;
            ctx.globalAlpha = options.overlay.opacity / 100;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
          }

          // 테두리 적용
          if (options.border.enabled) {
            ctx.strokeStyle = options.border.color;
            ctx.lineWidth = options.border.width;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
          }

          // 텍스트 추가
          if (options.text.content) {
            ctx.textAlign = 'center';
            ctx.font = `bold ${options.text.size}px Arial`;

            const textY =
              options.text.position === 'top'
                ? options.text.size + 20
                : options.text.position === 'center'
                  ? canvas.height / 2
                  : canvas.height - options.text.size - 20;

            if (options.text.outline) {
              ctx.strokeStyle = options.text.outlineColor;
              ctx.lineWidth = options.text.size / 8;
              ctx.strokeText(options.text.content, canvas.width / 2, textY);
            }

            if (options.text.shadow) {
              ctx.shadowColor = 'rgba(0,0,0,0.5)';
              ctx.shadowBlur = options.text.size / 4;
              ctx.shadowOffsetX = options.text.size / 16;
              ctx.shadowOffsetY = options.text.size / 16;
            }

            ctx.fillStyle = options.text.color;
            ctx.fillText(options.text.content, canvas.width / 2, textY);
            ctx.shadowColor = 'transparent';
          }

          resolve();
        };
        img.src = image;
      });

      // 썸네일 다운로드
      const link = document.createElement('a');
      link.download = `thumbnail.${options.format}`;
      link.href = canvas.toDataURL(
        `image/${options.format}`,
        options.quality / 100,
      );
      link.click();
    } catch (error) {
      console.error('썸네일 생성 실패:', error);
      setError(
        typeof error === 'string' ? error : '썸네일 생성에 실패했습니다.',
      );
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
        썸네일 메이커
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
                  borderColor: image ? 'primary.main' : 'grey.300',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
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
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                {image ? (
                  <Image
                    src={image}
                    alt="Original"
                    width={800}
                    height={450}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 4,
                    }}
                  />
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
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                썸네일 옵션
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

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="너비"
                    type="number"
                    value={options.width}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        width: Number(e.target.value),
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="높이"
                    type="number"
                    value={options.height}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        height: Number(e.target.value),
                      }))
                    }
                  />
                </Grid>
              </Grid>

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
                  min={10}
                  max={100}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>포맷</InputLabel>
                <Select
                  value={options.format}
                  label="포맷"
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      format: e.target.value as 'jpeg' | 'png' | 'webp',
                    }))
                  }
                >
                  <MenuItem value="jpeg">JPEG</MenuItem>
                  <MenuItem value="png">PNG</MenuItem>
                  <MenuItem value="webp">WebP</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>필터</Typography>
                <FormControl fullWidth>
                  <Select
                    value={options.filter}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        filter: {
                          ...prev.filter,
                          [e.target.name]: e.target.value,
                        },
                      }))
                    }
                  >
                    <MenuItem value="none">없음</MenuItem>
                    <MenuItem value="grayscale">흑백</MenuItem>
                    <MenuItem value="sepia">세피아</MenuItem>
                    <MenuItem value="blur">블러</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>밝기</Typography>
                <Slider
                  value={options.filter.brightness}
                  onChange={(_, value) =>
                    setOptions((prev) => ({
                      ...prev,
                      filter: { ...prev.filter, brightness: value as number },
                    }))
                  }
                  min={0}
                  max={200}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>워터마크</Typography>
                <TextField
                  fullWidth
                  placeholder="텍스트 입력"
                  value={options.text.content}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      text: { ...prev.text, content: e.target.value },
                    }))
                  }
                  sx={{ mb: 1 }}
                />
                <FormControl fullWidth size="small">
                  <InputLabel>위치</InputLabel>
                  <Select
                    value={options.text.position}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        text: {
                          ...prev.text,
                          position: e.target.value as
                            | 'top'
                            | 'center'
                            | 'bottom',
                        },
                      }))
                    }
                  >
                    <MenuItem value="top">상단</MenuItem>
                    <MenuItem value="center">중앙</MenuItem>
                    <MenuItem value="bottom">하단</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handleCreateThumbnail}
                disabled={!image || isGenerating}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                }}
              >
                {isGenerating ? (
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
                ) : (
                  <>
                    <ImageIcon sx={{ mr: 1 }} />
                    썸네일 생성하기
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
