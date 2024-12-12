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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from './Navigation';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            color: 'primary.main',
          }}
        >
          YoutubeCreatorsHub
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              sx={{
                ml: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
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
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Navigation isMobile={false} onClose={handleDrawerToggle} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
