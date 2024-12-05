'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { trendingAPI } from '@/infrastructure/api/endpoints/main/youtube/trending';
import { TrendingVideo } from '@/shared/types/domain/main/youtube/youtubeTrends';

export default function YoutubeTrendingList() {
  const [trendingVideos, setTrendingVideos] = useState<TrendingVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await trendingAPI.getTrendingVideos();
        setTrendingVideos(data);
      } catch (error) {
        console.error('Error fetching trending videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto', padding: '20px' }}>
      <Slider {...settings}>
        {trendingVideos?.map((video, index) => (
          <Box key={video.id} sx={{ padding: '10px' }}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={video.thumbnailUrl}
                alt={video.title}
              />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {index + 1}. {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.channelTitle}
                </Typography>
                <Typography variant="caption">
                  조회수: {video.viewCount}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
