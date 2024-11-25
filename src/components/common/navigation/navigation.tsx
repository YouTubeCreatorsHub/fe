'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Tabs,
  Tab,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Grow,
  ClickAwayListener,
} from '@mui/material';
import { NAVIGATION_ITEMS } from '@/shared/constants/navigation';
import { NavigationItem } from '@/shared/types/navigation';

export default function Navigation() {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const items = NAVIGATION_ITEMS.find((item) => item.id === newValue);
    if (items && !items.children) {
      router.push(items.path);
    }
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    item: NavigationItem,
  ) => {
    if (item.children) {
      setAnchorEl(event.currentTarget);
      setOpenDropdown(item.id);
    }
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpenDropdown(null);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    handleMouseLeave();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
      >
        {NAVIGATION_ITEMS.map((item) => {
          return (
            <Tab
              key={item.id}
              value={item.id}
              label={item.label}
              onMouseEnter={(e) => handleMouseEnter(e, item)}
              sx={{ minHeight: 64 }}
            />
          );
        })}
      </Tabs>

      <Popper
        open={Boolean(openDropdown)}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper onMouseLeave={handleMouseLeave} sx={{ mt: 1, boxShadow: 3 }}>
              <ClickAwayListener onClickAway={handleMouseLeave}>
                <MenuList>
                  {openDropdown &&
                    NAVIGATION_ITEMS.find(
                      (item) => item.id === openDropdown,
                    )?.children?.map((child) => (
                      <MenuItem
                        key={child.id}
                        onClick={() => handleMenuItemClick(child.path)}
                      >
                        {child.label}
                      </MenuItem>
                    ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
