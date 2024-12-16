'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PopularPost {
  id: number;
  title: string;
  category: string;
  views: number;
  date: string;
}

export default function CommunityTrendingList() {
  const theme = useTheme();
  const [popularPosts] = useState<PopularPost[]>([
    {
      id: 1,
      title: '2024년 유튜브 트렌드 분석',
      category: '트렌드',
      views: 1234,
      date: '2024.03.20',
    },
    {
      id: 2,
      title: '성공적인 유튜브 채널 운영 전략',
      category: '채널성장',
      views: 982,
      date: '2024.03.19',
    },
    {
      id: 3,
      title: '유튜브 쇼츠 최적화 가이드',
      category: '쇼츠',
      views: 856,
      date: '2024.03.18',
    },
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TrendingUpIcon color="primary" />
          인기 게시글
        </Typography>
        <IconButton>
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {popularPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
                cursor: 'pointer',
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    color="primary"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 500,
                    height: '3em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.title}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                  }}
                >
                  <Typography variant="caption">
                    조회수 {post.views.toLocaleString()}
                  </Typography>
                  <Typography variant="caption">{post.date}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
