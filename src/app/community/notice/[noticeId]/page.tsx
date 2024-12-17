'use client';

import { useParams, useRouter } from 'next/navigation';
import { Box, Paper, Typography, Divider, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const noticeId = params.noticeId as string;

  // 실제로는 API를 통해 데이터를 가져옴
  const notice: Notice = {
    id: noticeId,
    title: '커뮤니티 이용 규칙 안내',
    content: '커뮤니티 이용 규칙 내용...',
    date: '2024.03.20',
    important: true,
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        목록으로
      </Button>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {notice.important && <Chip label="중요" color="error" size="small" />}
          <Typography variant="h5">{notice.title}</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {notice.date}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">{notice.content}</Typography>
    </Paper>
  );
}
