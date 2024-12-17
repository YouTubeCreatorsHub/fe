'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
}

export default function PostPage() {
  const params = useParams();
  const { category, channelId, postId } = params;
  const theme = useTheme();
  const router = useRouter();

  // 실제로는 API를 통해 게시글 데이터를 가져옴
  const post: Post = {
    id: postId as string,
    title: '게시글 제목',
    content: '게시글 내용...',
    author: '작성자',
    createdAt: '2024-03-20',
    views: 100,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ mb: 3 }}
          >
            목록으로
          </Button>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              mb: 3,
            }}
          >
            {post.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2,
            }}
          >
            <Chip icon={<PersonIcon />} label={post.author} size="small" />
            <Chip
              icon={<CalendarTodayIcon />}
              label={post.createdAt}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<VisibilityIcon />}
              label={`조회수 ${post.views}`}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            lineHeight: 1.8,
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          {post.content}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ borderRadius: 2 }}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ borderRadius: 2 }}
          >
            삭제
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
