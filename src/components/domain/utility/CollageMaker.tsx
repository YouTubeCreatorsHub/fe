'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  useTheme,
  Slider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { CollageOptions } from '@/shared/types/domain/utility/collageMaker';

export default function CollageMaker() {
  const theme = useTheme();
  const [images, setImages] = useState<string[]>([]);
  const [options, setOptions] = useState<CollageOptions>({
    layout: 'grid',
    columns: 2,
    gap: 8,
    backgroundColor: '#ffffff',
    width: 1200,
    height: 800,
    borderRadius: 8,
    filter: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
    },
  });

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

  const handleCreateCollage = async () => {
    if (images.length < 2) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = options.width;
    canvas.height = options.height;

    if (ctx) {
      // 배경 그리기
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 이미지 로드 및 그리기
      await Promise.all(
        images.map(async (src, index) => {
          const img = new window.Image();
          await new Promise((resolve) => {
            img.onload = resolve;
            img.src = src;
          });

          const { x, y, width, height } = calculateImagePosition(
            index,
            images.length,
          );
          ctx.drawImage(img, x, y, width, height);
        }),
      );

      // 필터 적용
      ctx.filter = `
        brightness(${options.filter.brightness}%)
        contrast(${options.filter.contrast}%)
        saturate(${options.filter.saturation}%)
      `;

      // 다운로드
      const link = document.createElement('a');
      link.download = 'collage.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const calculateImagePosition = (index: number, total: number) => {
    const { columns, gap, width, height } = options;
    const rows = Math.ceil(total / columns);

    const cellWidth = (width - gap * (columns + 1)) / columns;
    const cellHeight = (height - gap * (rows + 1)) / rows;

    const col = index % columns;
    const row = Math.floor(index / columns);

    return {
      x: gap + col * (cellWidth + gap),
      y: gap + row * (cellHeight + gap),
      width: cellWidth,
      height: cellHeight,
    };
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
        콜라주 메이커
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
                {images.length === 0 ? (
                  <>
                    <CloudUploadIcon
                      sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
                    />
                    <Typography variant="h6">
                      이미지를 드래그하거나 클릭하여 업로드
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      여러 이미지를 한 번에 선택할 수 있습니다
                    </Typography>
                  </>
                ) : (
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <Grid container spacing={2}>
                      {images.map((image, index) => (
                        <Grid item xs={6} sm={4} key={index}>
                          <Paper sx={{ position: 'relative', p: 1 }}>
                            <Image
                              src={image}
                              alt={`Image ${index + 1}`}
                              width={200}
                              height={200}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 4,
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveImage(index)}
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                bgcolor: 'background.paper',
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                콜라주 옵션
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>레이아웃</Typography>
                <FormControl fullWidth>
                  <Select
                    value={options.layout}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        layout: e.target.value as
                          | 'grid'
                          | 'pinterest'
                          | 'masonry',
                      }))
                    }
                  >
                    <MenuItem value="grid">그리드</MenuItem>
                    <MenuItem value="pinterest">핀터레스트</MenuItem>
                    <MenuItem value="masonry">매이슨리</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>열 개수</Typography>
                <Slider
                  value={options.columns}
                  onChange={(_, value) =>
                    setOptions((prev) => ({
                      ...prev,
                      columns: value as number,
                    }))
                  }
                  min={1}
                  max={4}
                  marks
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>간격 (px)</Typography>
                <Slider
                  value={options.gap}
                  onChange={(_, value) =>
                    setOptions((prev) => ({ ...prev, gap: value as number }))
                  }
                  min={0}
                  max={32}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>필터</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption">밝기</Typography>
                    <Slider
                      value={options.filter.brightness}
                      onChange={(_, value) =>
                        setOptions((prev) => ({
                          ...prev,
                          filter: {
                            ...prev.filter,
                            brightness: value as number,
                          },
                        }))
                      }
                      min={0}
                      max={200}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption">대비</Typography>
                    <Slider
                      value={options.filter.contrast}
                      onChange={(_, value) =>
                        setOptions((prev) => ({
                          ...prev,
                          filter: { ...prev.filter, contrast: value as number },
                        }))
                      }
                      min={0}
                      max={200}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption">채도</Typography>
                    <Slider
                      value={options.filter.saturation}
                      onChange={(_, value) =>
                        setOptions((prev) => ({
                          ...prev,
                          filter: {
                            ...prev.filter,
                            saturation: value as number,
                          },
                        }))
                      }
                      min={0}
                      max={200}
                    />
                  </Box>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handleCreateCollage}
                disabled={images.length < 2}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                }}
              >
                콜라주 생성하기
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
