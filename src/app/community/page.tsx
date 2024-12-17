'use client';

import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  useTheme,
  Fade,
  Chip,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  channels: {
    id: string;
    name: string;
  }[];
}

export default function CommunityPage() {
  const theme = useTheme();
  const router = useRouter();
  const [categories] = useState<Category[]>([
    {
      id: 'game',
      name: '게임',
      description: '게임 관련 커뮤니티',
      imageUrl: '/images/game.jpg',
      channels: [
        { id: 'lol', name: '리그오브레전드' },
        { id: 'pubg', name: '배틀그라운드' },
      ],
    },
    {
      id: 'music',
      name: '음악',
      description: '음악 관련 커뮤니티',
      imageUrl: '/images/music.jpg',
      channels: [
        { id: 'kpop', name: 'K-POP' },
        { id: 'indie', name: '인디음악' },
      ],
    },
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          커뮤니티
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Fade in={true}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: 3,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[10],
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
                onClick={() => router.push(`/community/${category.id}`)}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    // image={category.imageUrl}
                    alt={category.name}
                    className="category-image"
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      p: 2,
                    }}
                  >
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { bgcolor: 'white' },
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      height: '40px',
                      overflow: 'hidden',
                    }}
                  >
                    {category.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    {category.channels.map((channel) => (
                      <Chip
                        key={channel.id}
                        icon={<PeopleIcon />}
                        label={channel.name}
                        size="small"
                        sx={{
                          bgcolor: 'action.hover',
                          '&:hover': {
                            bgcolor: 'action.selected',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
