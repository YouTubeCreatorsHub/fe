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
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import { FilterOptions } from '@/shared/types/domain/utility/imageFilter';

export default function ImageFilter() {
  const [image, setImage] = useState<string | null>(null);
  const [options, setOptions] = useState<FilterOptions>({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${options.brightness}%)
        contrast(${options.contrast}%)
        saturate(${options.saturate}%)
        blur(${options.blur}px)
        grayscale(${options.grayscale}%)
        sepia(${options.sepia}%)
        hue-rotate(${options.hueRotate}deg)
      `,
    };
  };

  const handleDownload = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const img = document.createElement('img');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.filter = getFilterStyle().filter;
        ctx.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.download = 'filtered-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };

    img.src = image;
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
        이미지 필터
      </Typography>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              {image ? (
                <Box
                  sx={{ position: 'relative', width: '100%', height: 'auto' }}
                >
                  <Image
                    src={image}
                    alt="Original"
                    width={800}
                    height={600}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 4,
                      ...getFilterStyle(),
                    }}
                  />
                </Box>
              ) : (
                <Box
                  component="label"
                  sx={{
                    display: 'block',
                    border: '2px dashed',
                    borderColor: 'grey.300',
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
                  <CloudUploadIcon
                    sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
                  />
                  <Typography variant="h6">
                    이미지를 드래그하거나 클릭하여 업로드
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                필터 옵션
              </Typography>

              {Object.entries(options).map(([key, value]) => (
                <Box key={key} sx={{ mb: 3 }}>
                  <Typography gutterBottom>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Slider
                    value={value}
                    onChange={(_, newValue) =>
                      setOptions((prev) => ({ ...prev, [key]: newValue }))
                    }
                    min={key === 'hueRotate' ? 0 : key === 'blur' ? 0 : 0}
                    max={key === 'hueRotate' ? 360 : key === 'blur' ? 20 : 200}
                    valueLabelDisplay="auto"
                  />
                </Box>
              ))}

              <Button
                fullWidth
                variant="contained"
                onClick={handleDownload}
                disabled={!image}
                sx={{ mt: 2 }}
              >
                필터 적용하여 다운로드
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
