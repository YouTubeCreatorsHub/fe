export interface NoticeListType {
  id: number;
  title: string;
  date: string;
  important: boolean;
}

export interface NoticeType {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}
