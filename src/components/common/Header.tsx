'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Navigation from './Navigation';
import HeaderLogin from './HeaderLogin';

export default function Header() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        {!isMobile && <HeaderLogin />}
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 56, sm: 64 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            YoutubeCreatorsHub
          </Typography>

          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Navigation isMobile={false} onClose={handleDrawerToggle} />
            </Box>
          ) : (
            <>
              <IconButton
                sx={{
                  ml: 1,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                  sx: {
                    width: { xs: '100%', sm: 320 },
                    bgcolor: 'background.default',
                  },
                }}
              >
                <Navigation
                  isMobile={true}
                  onClose={() => setMobileOpen(false)}
                />
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
