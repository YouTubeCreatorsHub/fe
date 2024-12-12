'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Modal,
  IconButton,
  Fade,
  Skeleton,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { trendingAPI } from '@/infrastructure/api/endpoints/main/youtube/trending';
import { TrendingVideo } from '@/shared/types/domain/main/youtube/youtubeTrends';

export default function YoutubeTrendingList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [trendingVideos, setTrendingVideos] = useState<TrendingVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<TrendingVideo | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    cssEase: 'cubic-bezier(0.87, 0.03, 0.41, 0.9)',
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

  const handleVideoClick = (video: TrendingVideo) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Box key={index} sx={{ flex: 1 }}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ borderRadius: 1 }}
                />
                <Skeleton height={28} sx={{ mt: 2 }} />
                <Skeleton width="60%" height={24} />
              </Box>
            ))}
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        width: '100%',
        height: '100%',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: 600,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        인기 동영상
      </Typography>

      <Box
        sx={{
          width: '100%',
          position: 'relative',
          '& .slick-slider': {
            width: '100%',
          },
          '& .slick-list': {
            mx: '-8px',
          },
          '& .slick-slide': {
            px: '8px',
          },
          '& .slick-track': {
            display: 'flex',
            alignItems: 'stretch',
          },
          '& .slick-prev, & .slick-next': {
            width: '40px',
            height: '40px',
            top: 'calc(100% + 20px)',
            transform: 'none',
            zIndex: 2,
            '&:before': {
              fontSize: '36px',
              color: 'rgba(0, 0, 0, 0.8)',
              opacity: 0.8,
            },
            '&:hover:before': {
              opacity: 1,
            },
          },
          '& .slick-prev': {
            left: 'calc(50% - 50px)',
          },
          '& .slick-next': {
            right: 'calc(50% - 50px)',
          },
        }}
      >
        <Slider {...settings}>
          {trendingVideos?.map((video, index) => (
            <Box key={video.id} sx={{ p: 1 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
                onClick={() => handleVideoClick(video)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height={180}
                    image={video.thumbnailUrl}
                    alt={video.title}
                    sx={{
                      objectFit: 'cover',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                  <Fade in={true}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0,0,0,0.3)',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.9)',
                          '&:hover': {
                            bgcolor: 'white',
                            transform: 'scale(1.1)',
                          },
                          transition: 'transform 0.2s',
                        }}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                    </Box>
                  </Fade>
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: 1.5,
                    '&:last-child': { pb: 1.5 },
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      lineHeight: 1.4,
                      height: '2.8em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      fontWeight: 500,
                    }}
                  >
                    {index + 1}. {video.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 1,
                    }}
                  >
                    {video.channelTitle}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
                    <Typography variant="caption">{video.viewCount}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          closeAfterTransition
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={modalOpen}>
            <Box
              sx={{
                width: { xs: '95vw', sm: '90vw', md: '80vw' },
                height: { xs: '60vh', sm: '70vh', md: '80vh' },
                bgcolor: 'background.paper',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 24,
              }}
            >
              <IconButton
                onClick={() => setModalOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  zIndex: 1,
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.7)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              {selectedVideo && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Container>
  );
}
