export interface YouTubeVideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: YouTubeVideoThumbnail;
    medium: YouTubeVideoThumbnail;
    high: YouTubeVideoThumbnail;
    standard: YouTubeVideoThumbnail;
    maxres: YouTubeVideoThumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
}

export interface YouTubeVideoStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface YouTubeVideo {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubeVideoSnippet;
  statistics: YouTubeVideoStatistics;
}

export interface YouTubeAPIResponse {
  kind: string;
  etag: string;
  items: YouTubeVideo[];
}

export interface TrendingVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount: string;
  publishedAt: string;
}
