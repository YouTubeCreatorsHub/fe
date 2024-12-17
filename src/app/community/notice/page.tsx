'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface Notice {
  id: number;
  title: string;
  date: string;
  important: boolean;
}

export default function NoticePage() {
  const router = useRouter();
  const [notices] = useState<Notice[]>([
    {
      id: 1,
      title: '커뮤니티 이용 규칙 안내',
      date: '2024.03.20',
      important: true,
    },
    {
      id: 2,
      title: '3월 업데이트 안내',
      date: '2024.03.15',
      important: false,
    },
  ]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        공지사항
      </Typography>
      <List>
        {notices.map((notice, index) => (
          <Box key={notice.id}>
            <ListItem
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push(`/community/notice/${notice.id}`)}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {notice.important && (
                      <Chip label="중요" color="error" size="small" />
                    )}
                    <Typography>{notice.title}</Typography>
                  </Box>
                }
                secondary={notice.date}
              />
            </ListItem>
            {index < notices.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
}
