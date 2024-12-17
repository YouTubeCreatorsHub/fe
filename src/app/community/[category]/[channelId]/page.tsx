'use client';

import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  Box,
  Paper,
  useTheme,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Post {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  views: number;
}

export default function ChannelPage() {
  const theme = useTheme();
  const params = useParams();
  const { channelId } = params;

  const posts: Post[] = [
    {
      id: '1',
      title: '첫 번째 게시글',
      author: '작성자1',
      createdAt: '2024-03-20',
      views: 100,
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
          {channelId} 게시판
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: theme.shadows[3],
          }}
        >
          글쓰기
        </Button>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <List sx={{ p: 0 }}>
          {posts.map((post, index) => (
            <Box key={post.id}>
              <ListItem
                sx={{
                  p: { xs: 2, md: 3 },
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Chip
                      icon={<PersonIcon sx={{ fontSize: '0.9rem' }} />}
                      label={post.author}
                      size="small"
                      sx={{ bgcolor: 'action.hover' }}
                    />
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <CalendarTodayIcon
                        sx={{ fontSize: '0.9rem', color: 'text.secondary' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {post.createdAt}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <VisibilityIcon
                        sx={{ fontSize: '0.9rem', color: 'text.secondary' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {post.views.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
              {index < posts.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
