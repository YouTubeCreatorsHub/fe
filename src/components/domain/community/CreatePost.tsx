'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function CreatePost() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty(),
  );

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  const onEditorStateChange = useCallback((state: EditorState) => {
    if (state) {
      setEditorState(state);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    console.log({ title, content, category });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          새 게시글 작성
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="제목"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={category}
              label="카테고리"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="general">일반</MenuItem>
              <MenuItem value="tips">팁과 노하우</MenuItem>
              <MenuItem value="question">질문</MenuItem>
              <MenuItem value="showcase">작품 소개</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mb: 3, border: '1px solid #ccc', borderRadius: 1 }}>
            {editorState && (
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                editorStyle={{
                  height: isMobile ? '300px' : '400px',
                  padding: '0 10px',
                }}
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'list',
                    'link',
                    'image',
                    'history',
                  ],
                  inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough'],
                  },
                  blockType: { options: ['Normal', 'H1', 'H2', 'Blockquote'] },
                  list: { options: ['unordered', 'ordered'] },
                }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="secondary">
              취소
            </Button>
            <Button variant="contained" color="primary" type="submit">
              게시하기
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
