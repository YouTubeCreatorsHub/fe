export interface NavigationProps {
  isMobile: boolean;
  onClose?: () => void;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: readonly Omit<NavigationItem, 'children'>[];
}
