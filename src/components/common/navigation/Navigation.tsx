'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [value, setValue] = useState<string>('home');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const activeTab = NAVIGATION_ITEMS.find((item) => {
      if (pathname === item.path) return true;
      if (item.children?.length > 0) {
        return item.children.some(
          (child) => pathname === `${item.path}${child.path}`,
        );
      }
      return false;
    });

    if (activeTab) {
      setValue(activeTab.id);
    }
  }, [pathname]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const items = NAVIGATION_ITEMS.find((item) => item.id === newValue);
    if (items) {
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
                    )?.children?.map((child) => {
                      const parentPath =
                        NAVIGATION_ITEMS.find(
                          (item) => item.id === openDropdown,
                        )?.path || '';

                      return (
                        <MenuItem
                          key={child.id}
                          onClick={() =>
                            handleMenuItemClick(`${parentPath}${child.path}`)
                          }
                        >
                          {child.label}
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
