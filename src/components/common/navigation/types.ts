export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: Omit<NavigationItem, 'children'>[];
}
