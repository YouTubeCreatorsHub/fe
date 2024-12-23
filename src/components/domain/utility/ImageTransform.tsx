'use client';

import { Box, Button, Typography, Container, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageTransform() {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleFlipHorizontal = () => {
    setFlip((prevFlip) => ({ ...prevFlip, horizontal: !prevFlip.horizontal }));
  };

  const handleFlipVertical = () => {
    setFlip((prevFlip) => ({ ...prevFlip, vertical: !prevFlip.vertical }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          이미지 회전 및 반전
        </Typography>
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
              alt="Uploaded"
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 4,
                transform: `
                  rotate(${rotation}deg)
                  scaleX(${flip.horizontal ? -1 : 1})
                  scaleY(${flip.vertical ? -1 : 1})
                `,
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
        {image && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" onClick={handleRotate}>
              회전
            </Button>
            <Button variant="contained" onClick={handleFlipHorizontal}>
              가로 반전
            </Button>
            <Button variant="contained" onClick={handleFlipVertical}>
              세로 반전
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
