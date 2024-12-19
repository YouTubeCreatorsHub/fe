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
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeaderLogin() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '사용자', avatar: '' });

  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
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
      {isLoggedIn ? (
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              p: 0.5,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
              src={user.avatar}
            >
              {user.name[0]}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 2,
              sx: { mt: 1, minWidth: 180 },
            }}
          >
            <MenuItem onClick={() => router.push('/profile')} sx={{ py: 1 }}>
              <PersonIcon sx={{ mr: 2, fontSize: '1.25rem' }} />
              회원정보
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
              <LogoutIcon sx={{ mr: 2, fontSize: '1.25rem' }} />
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
            }}
          >
            회원가입
          </Button>
        </Box>
      )}
    </Box>
  );
}
