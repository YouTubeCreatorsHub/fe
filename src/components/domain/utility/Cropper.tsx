'use client';

import { useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CropIcon from '@mui/icons-material/Crop';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from 'next/image';

const ASPECT_RATIOS = {
  free: { value: undefined, label: '자유' },
  square: { value: 1, label: '1:1 (정사각형)' },
  '4:3': { value: 4 / 3, label: '4:3' },
  '16:9': { value: 16 / 9, label: '16:9' },
  '3:2': { value: 3 / 2, label: '3:2' },
  '2:1': { value: 2, label: '2:1' },
  '1:2': { value: 1 / 2, label: '1:2' },
  golden: { value: 1.618, label: '1:1.618 (황금비율)' },
} as const;

export default function Cropper() {
  const theme = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [selectedRatio, setSelectedRatio] =
    useState<keyof typeof ASPECT_RATIOS>('free');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file || null);

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRatioChange = (ratio: keyof typeof ASPECT_RATIOS) => {
    setSelectedRatio(ratio);

    const imageWidth = imageRef.current?.width || 100;
    const imageHeight = imageRef.current?.height || 100;
    const aspectRatio = ASPECT_RATIOS[ratio].value;

    if (aspectRatio) {
      let newWidth = imageWidth * 0.8;
      let newHeight = newWidth / aspectRatio;

      if (newHeight > imageHeight) {
        newHeight = imageHeight * 0.8;
        newWidth = newHeight * aspectRatio;
      }

      const x = (imageWidth - newWidth) / 2;
      const y = (imageHeight - newHeight) / 2;

      setCrop({
        unit: '%',
        x: (x / imageWidth) * 100,
        y: (y / imageHeight) * 100,
        width: (newWidth / imageWidth) * 100,
        height: (newHeight / imageHeight) * 100,
      });
    } else {
      setCrop({
        unit: '%',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      });
    }
  };

  const handleCrop = async () => {
    if (!imageRef.current || !crop) return;

    if (crop.width === 0 || crop.height === 0) {
      console.error('Invalid crop area');
      return;
    }

    const canvas = document.createElement('canvas');
    const image = imageRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = (crop.x * image.width * scaleX) / 100;
    const cropY = (crop.y * image.height * scaleY) / 100;
    const cropWidth = (crop.width * image.width * scaleX) / 100;
    const cropHeight = (crop.height * image.height * scaleY) / 100;

    canvas.width = Math.floor(cropWidth);
    canvas.height = Math.floor(cropHeight);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'cropped-image.png';
        link.click();
        URL.revokeObjectURL(url);
      },
      'image/png',
      1.0,
    );
  };

  const handleInputChange = (key: keyof Crop, value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setCrop((prev) => ({
        ...prev,
        [key]: numValue,
      }));
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
        이미지 크롭
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

        {image && (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <ReactCrop
                    crop={crop}
                    onChange={(c: Crop) => setCrop(c)}
                    aspect={ASPECT_RATIOS[selectedRatio].value}
                  >
                    <Image
                      ref={imageRef}
                      src={image}
                      alt="Upload"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                      }}
                      width={500}
                      height={300}
                      priority
                    />
                  </ReactCrop>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>종횡비</InputLabel>
                    <Select
                      value={selectedRatio}
                      onChange={(e) =>
                        handleRatioChange(
                          e.target.value as keyof typeof ASPECT_RATIOS,
                        )
                      }
                      label="종횡비"
                    >
                      {Object.entries(ASPECT_RATIOS).map(([key, { label }]) => (
                        <MenuItem key={key} value={key}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {['x', 'y', 'width', 'height'].map((key) => (
                      <Grid item xs={6} key={key}>
                        <TextField
                          fullWidth
                          label={key.toUpperCase()}
                          type="number"
                          size="small"
                          value={crop[key as keyof Crop]}
                          onChange={(e) =>
                            handleInputChange(key as keyof Crop, e.target.value)
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCrop}
                    startIcon={<CropIcon />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    크롭하기
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
