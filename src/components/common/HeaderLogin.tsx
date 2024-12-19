'use client';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/application/store/common/authStore';

export default function HeaderLogin() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        width: '100%',
        justifyContent: { xs: 'center', md: 'flex-end' },
        pt: { md: 2 },
        mb: 1,
      }}
    >
      {isAuthenticated ? (
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              p: 0.5,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                bgcolor: 'transparent',
              },
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              color="success"
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  bgcolor: 'primary.light',
                }}
                src={user?.avatar}
              >
                {user?.name?.[0]}
              </Avatar>
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                overflow: 'hidden',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                router.push('/profile');
                handleMenuClose();
              }}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
              회원정보
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'error.lighter' },
              }}
            >
              <LogoutIcon sx={{ mr: 2, color: 'error.main' }} />
              로그아웃
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push('/auth/login')}
            sx={{
              borderRadius: 2,
              px: { xs: 1.5, sm: 2 },
              py: 0.75,
              textTransform: 'none',
              fontWeight: 500,
              borderWidth: 1.5,
            }}
          >
            로그인
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => router.push('/auth/register')}
            sx={{
              borderRadius: 2,
              px: { xs: 1.5, sm: 2 },
              py: 0.75,
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: 2,
            }}
          >
            회원가입
          </Button>
        </Box>
      )}
    </Box>
  );
}
