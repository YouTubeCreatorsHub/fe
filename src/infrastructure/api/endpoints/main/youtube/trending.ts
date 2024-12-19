import { YOUTUBE_API_ENDPOINTS } from '@/shared/constants/common/api';
import { YouTubeAPIResponse } from '@/shared/types/domain/main/youtubeTrends';
import { api } from '@/infrastructure/api/axios/instance';

export const trendingAPI = {
  getTrendingVideos: async () => {
    const { data } = await api.get<YouTubeAPIResponse>(
      YOUTUBE_API_ENDPOINTS.TRENDING,
      {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          regionCode: 'KR',
          maxResults: 10,
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        },
      },
    );

    return data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      viewCount: Number(item.statistics.viewCount).toLocaleString(),
      publishedAt: item.snippet.publishedAt,
    }));
  },
};
