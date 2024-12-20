'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  IconButton,
  Fade,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CropIcon from '@mui/icons-material/Crop';
import GifIcon from '@mui/icons-material/Gif';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import { UtilityListType } from '@/shared/types/domain/utility/utilityList';

export default function UtilityList() {
  const theme = useTheme();
  const router = useRouter();

  const utilities: UtilityListType[] = [
    {
      id: 'webpConverter',
      title: 'Webp Converter',
      description:
        '이미지를 WebP 형식으로 변환하여 웹 성능을 최적화할 수 있습니다. 다양한 이미지 포맷을 지원합니다.',
      icon: <ImageIcon sx={{ fontSize: '2rem' }} />,
      path: '/utility/webpConverter',
    },
    {
      id: 'cropper',
      title: 'Cropper',
      description:
        '이미지를 원하는 크기와 비율로 자르고 편집할 수 있습니다. 썸네일 제작에 최적화되어 있습니다.',
      icon: <CropIcon sx={{ fontSize: '2rem' }} />,
      path: '/utility/cropper',
    },
    {
      id: 'gifMaker',
      title: 'GIF Maker',
      description:
        '여러 이미지를 조합하여 GIF 애니메이션을 만들 수 있습니다. FPS, 품질 등 다양한 옵션을 제공합니다.',
      icon: <GifIcon sx={{ fontSize: '2rem' }} />,
      path: '/utility/gifMaker',
    },
    {
      id: 'imageFilter',
      title: 'Image Filter',
      description:
        '이미지에 다양한 필터를 적용하여 효과를 줄 수 있습니다. 밝기, 대비, 채도, 흑백 등 다양한 옵션을 제공합니다.',
      icon: <PhotoFilterIcon sx={{ fontSize: '2rem' }} />,
      path: '/utility/imageFilter',
    },
    {
      id: 'thumbnailMaker',
      title: 'Thumbnail Maker',
      description:
        '이미지를 이용하여 간단하게 썸네일 제작을 할 수 있습니다. 크기, 비율, 텍스트, 배경색 등 다양한 옵션을 제공합니다.',
      icon: <PhotoSizeSelectActualIcon sx={{ fontSize: '2rem' }} />,
      path: '/utility/thumbnailMaker',
    },
    {
      id: 'collageMaker',
      title: 'Collage Maker',
      description:
        '이미지를 이용하여 간단하게 콜라주를 제작할 수 있습니다. 크기, 배경색, 여백 등 다양한 옵션을 제공합니다.',
      icon: <AutoAwesomeMosaicIcon sx={{ fontSize: '2rem' }} />,
      path: '/utility/collageMaker',
    },
    {
      id: 'watermarkMaker',
      title: 'Watermark Maker',
      description:
        '이미지에 워터마크를 삽입하여 이미지를 보호할 수 있습니다. 텍스트, 로고, 크기, 위치 등 다양한 옵션을 제공합니다.',
      icon: <BrandingWatermarkIcon sx={{ fontSize: '2rem' }} />,
      path: '/utility/watermarkMaker',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 5,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          textAlign: { xs: 'center', md: 'left' },
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
        }}
      >
        유틸리티
      </Typography>

      <Grid container spacing={4}>
        {utilities.map((util) => (
          <Grid item xs={12} sm={6} key={util.id}>
            <Fade in={true}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: 3,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
                onClick={() => router.push(util.path)}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      {util.icon}
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {util.title}
                      </Typography>
                    </Box>
                    <IconButton
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      minHeight: { xs: 'auto', sm: '80px' },
                    }}
                  >
                    {util.description}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
