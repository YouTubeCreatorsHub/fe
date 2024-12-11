'use client';

import { useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ReactCrop, { Crop } from 'react-image-crop';
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

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cropped-image.png';
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        이미지 크롭
      </Typography>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: 20 }}
      />

      {image && (
        <Card sx={{ mt: 2, p: 2 }}>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={ASPECT_RATIOS[selectedRatio].value}
          >
            <Image
              ref={imageRef}
              src={image}
              alt="Upload"
              style={{ maxWidth: '100%', height: 'auto' }}
              width={500}
              height={300}
              priority
            />
          </ReactCrop>

          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
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
          </Box>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <TextField
              label="X"
              type="number"
              value={Math.round(crop.x)}
              onChange={(e) => setCrop({ ...crop, x: Number(e.target.value) })}
            />
            <TextField
              label="Y"
              type="number"
              value={Math.round(crop.y)}
              onChange={(e) => setCrop({ ...crop, y: Number(e.target.value) })}
            />
            <TextField
              label="Width"
              type="number"
              value={Math.round(crop.width)}
              onChange={(e) =>
                setCrop({ ...crop, width: Number(e.target.value) })
              }
            />
            <TextField
              label="Height"
              type="number"
              value={Math.round(crop.height)}
              onChange={(e) =>
                setCrop({ ...crop, height: Number(e.target.value) })
              }
            />
          </Box>

          <Button variant="contained" onClick={handleCrop} sx={{ mt: 2 }}>
            크롭하기
          </Button>
        </Card>
      )}
    </Box>
  );
}
