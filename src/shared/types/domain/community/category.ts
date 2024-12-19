export interface CategoryListType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  channels: {
    id: string;
    name: string;
  }[];
}
