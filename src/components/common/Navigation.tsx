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
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NAVIGATION_ITEMS } from '@/shared/constants/navigation';
import { NavigationItem } from '@/shared/types/navigation';

interface NavigationProps {
  isMobile: boolean;
  onClose?: () => void;
}

export default function Navigation({ isMobile, onClose }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState<string>('home');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

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
    const selectedItem = NAVIGATION_ITEMS.find((item) => item.id === newValue);
    if (selectedItem) {
      if (!selectedItem.children?.length) {
        router.push(selectedItem.path);
        onClose?.();
      }
    }
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    item: NavigationItem,
  ) => {
    if (!isMobile && item.children && item.children?.length > 0) {
      setAnchorEl(event.currentTarget);
      setOpenDropdown(item.id);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setAnchorEl(null);
      setOpenDropdown(null);
    }
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    handleMouseLeave();
    onClose?.();
  };

  const handleMobileMenuClick = (itemId: string) => {
    setOpenMobileMenu(openMobileMenu === itemId ? null : itemId);
  };

  if (isMobile) {
    return (
      <Box sx={{ width: '100%' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <List sx={{ pt: 6 }}>
          {NAVIGATION_ITEMS.map((item) => (
            <Box key={item.id}>
              <ListItem
                sx={{
                  cursor: 'pointer',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={() =>
                  item.children?.length
                    ? handleMobileMenuClick(item.id)
                    : handleMenuItemClick(item.path)
                }
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: pathname.includes(item.path) ? 600 : 400,
                  }}
                />
                {item.children?.length > 0 &&
                  (openMobileMenu === item.id ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItem>
              {item.children?.length > 0 && (
                <Collapse in={openMobileMenu === item.id}>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItem
                        key={child.id}
                        sx={{
                          pl: 4,
                          py: 1,
                          cursor: 'pointer',
                          bgcolor:
                            pathname === `${item.path}${child.path}`
                              ? 'action.selected'
                              : 'transparent',
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                        onClick={() =>
                          handleMenuItemClick(`${item.path}${child.path}`)
                        }
                      >
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          '& .MuiTab-root': {
            minHeight: 64,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 500,
            textTransform: 'none',
            '&.Mui-selected': {
              fontWeight: 600,
            },
          },
        }}
      >
        {NAVIGATION_ITEMS.map((item) => (
          <Tab
            key={item.id}
            value={item.id}
            label={item.label}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onClick={() =>
              !item.children?.length && handleMenuItemClick(item.path)
            }
          />
        ))}
      </Tabs>

      {openDropdown &&
        NAVIGATION_ITEMS.find(
          (item) => item.id === openDropdown && item.children?.length > 0,
        ) && (
          <Popper
            open={Boolean(openDropdown)}
            anchorEl={anchorEl}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <Paper
                  onMouseLeave={handleMouseLeave}
                  sx={{ mt: 1, boxShadow: 3 }}
                >
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
                                handleMenuItemClick(
                                  `${parentPath}${child.path}`,
                                )
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
        )}
    </Box>
  );
}
