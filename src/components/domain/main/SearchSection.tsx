'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          minHeight: '10vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: { xs: 0, md: 2 },
          py: 8,
          px: { xs: 2, md: 4 },
          mt: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3.5rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: 2,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          YouTube Trends Explorer
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.secondary',
            maxWidth: '600px',
          }}
        >
          전 세계의 YouTube 트렌드를 분석하고 인사이트를 발견하세요
        </Typography>

        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: '800px',
            borderRadius: '16px',
            p: 1,
          }}
        >
          <TextField
            fullWidth
            placeholder="YouTube 채널 또는 동영상 URL을 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTubeIcon color="error" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              },
            }}
          />
        </Paper>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['인기 트렌드', '게임', '음악', '영화', '교육'].map((tag) => (
            <Paper
              key={tag}
              sx={{
                px: 2,
                py: 1,
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {tag}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
