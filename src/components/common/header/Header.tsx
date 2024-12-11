import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Navigation from '../navigation/navigation';

export default function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
          }}
        >
          YoutubeCreatorsHub
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Navigation />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
