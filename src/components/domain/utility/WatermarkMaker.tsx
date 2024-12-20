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
  TextField,
  IconButton,
  useTheme,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Image from 'next/image';
import { WatermarkOptions } from '@/shared/types/domain/utility/watermarkMaker';

export default function WatermarkMaker() {
  const theme = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [options, setOptions] = useState<WatermarkOptions>({
    text: {
      content: '',
      size: 24,
      color: '#ffffff',
      position: 'bottomRight',
      opacity: 50,
      rotation: 0,
    },
    repeat: false,
    gap: 100,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateWatermark = async () => {
    if (!image || !options.text.content) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image();

    await new Promise<void>((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if (ctx) {
          // 원본 이미지 그리기
          ctx.drawImage(img, 0, 0);

          // 워터마크 설정
          ctx.globalAlpha = options.text.opacity / 100;
          ctx.font = `${options.text.size}px Arial`;
          ctx.fillStyle = options.text.color;
          ctx.rotate((options.text.rotation * Math.PI) / 180);

          if (options.repeat) {
            // 반복 워터마크
            for (let x = 0; x < canvas.width; x += options.gap) {
              for (let y = 0; y < canvas.height; y += options.gap) {
                ctx.fillText(options.text.content, x, y);
              }
            }
          } else {
            // 단일 워터마크
            const metrics = ctx.measureText(options.text.content);
            const textWidth = metrics.width;
            let x, y;

            switch (options.text.position) {
              case 'topLeft':
                x = 20;
                y = options.text.size + 20;
                break;
              case 'topRight':
                x = canvas.width - textWidth - 20;
                y = options.text.size + 20;
                break;
              case 'bottomLeft':
                x = 20;
                y = canvas.height - 20;
                break;
              case 'bottomRight':
                x = canvas.width - textWidth - 20;
                y = canvas.height - 20;
                break;
              default:
                x = (canvas.width - textWidth) / 2;
                y = canvas.height / 2;
            }

            ctx.fillText(options.text.content, x, y);
          }
        }
        resolve();
      };
      img.src = image;
    });

    // 다운로드
    const link = document.createElement('a');
    link.download = 'watermarked-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
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
        워터마크 메이커
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
                    height={600}
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
                워터마크 옵션
              </Typography>

              <TextField
                fullWidth
                label="워터마크 텍스트"
                value={options.text.content}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    text: { ...prev.text, content: e.target.value },
                  }))
                }
                sx={{ mb: 3 }}
              />

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>텍스트 크기</Typography>
                <Slider
                  value={options.text.size}
                  onChange={(_, value) =>
                    setOptions((prev) => ({
                      ...prev,
                      text: { ...prev.text, size: value as number },
                    }))
                  }
                  min={12}
                  max={72}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>투명도</Typography>
                <Slider
                  value={options.text.opacity}
                  onChange={(_, value) =>
                    setOptions((prev) => ({
                      ...prev,
                      text: { ...prev.text, opacity: value as number },
                    }))
                  }
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>위치</InputLabel>
                <Select
                  value={options.text.position}
                  label="위치"
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      text: {
                        ...prev.text,
                        position: e.target
                          .value as WatermarkOptions['text']['position'],
                      },
                    }))
                  }
                >
                  <MenuItem value="topLeft">좌측 상단</MenuItem>
                  <MenuItem value="topRight">우측 상단</MenuItem>
                  <MenuItem value="center">중앙</MenuItem>
                  <MenuItem value="bottomLeft">좌측 하단</MenuItem>
                  <MenuItem value="bottomRight">우측 하단</MenuItem>
                </Select>
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                onClick={handleCreateWatermark}
                disabled={!image || !options.text.content}
                startIcon={<TextFieldsIcon />}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                워터마크 적용하기
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
