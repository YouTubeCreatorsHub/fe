'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
  Chip,
  IconButton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ForumIcon from '@mui/icons-material/Forum';
import { ChannelListType } from '@/shared/types/domain/community/channel';

export default function ChannelList() {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams();
  const category = params.category as string;

  const channels: ChannelListType[] = [
    {
      id: 'lol',
      name: '리그오브레전드',
      description: 'LOL 관련 게시판',
      postCount: 150,
    },
    {
      id: 'pubg',
      name: '배틀그라운드',
      description: '배그 관련 게시판',
      postCount: 120,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
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
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          {category} 카테고리
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {channels.map((channel) => (
          <Grid item xs={12} sm={6} md={4} key={channel.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() =>
                router.push(`/community/${category}/${channel.id}`)
              }
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {channel.name}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    height: '2.4em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {channel.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Chip
                    icon={<ForumIcon />}
                    label={`게시글 ${channel.postCount}개`}
                    size="small"
                    sx={{
                      bgcolor: 'action.hover',
                      '& .MuiChip-icon': {
                        fontSize: '1rem',
                        color: 'text.secondary',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
